const fs = require('fs')
const rl = require('readline')

const uniswap_v2_dump = require('uniswap-v2-dump')
const sushiswap_dump = require('sushiswap-dump')
const pancakeswap_dump = require('pancakeswap-dump')
const shibaswap_dump = require('shibaswap-dump')
const defiswap_dump = require('defiswap-dump')
const ethervista_dump = require('ethervista-dump')
const radioshack_dump = require('radioshack-dump')

const dex_db = require('@calp-pro/dex-db')

const db = dex_db()
if (fs.existsSync('good_pairs.bin')) {
    db.load('good')
    console.log('DEX DB dump "good" found with pairs:', db.get_all_pairs().length)
}

const honeypot = new Map() 

const token_checked_count = {
    good: 0,
    bad: 0
}
if (fs.existsSync('honeypot.bin')) {
    var buf = fs.readFileSync('honeypot.bin')
    for (var i = 0; i < buf.length; i += 20) {
        const address = '0x' + buf.slice(i, i + 20).toString('hex')
        honeypot.set(address, true)
        token_checked_count.bad++
    }
    console.log('Found "honeypot.bin" file with tokens checked:', token_checked_count.bad)
}
if (fs.existsSync('honeypot-not.bin')) {
    var buf = fs.readFileSync('honeypot-not.bin')
    for (var i = 0; i < buf.length; i += 20) {
        const address = '0x' + buf.slice(i, i + 20).toString('hex')
        honeypot.set(address, false)
        token_checked_count.good++
    }
    console.log('Found "honeypot-not.bin" file with tokens checked:', token_checked_count.good)
}

Promise.all(
    [
        uniswap_v2_dump,
        sushiswap_dump,
        pancakeswap_dump,
        shibaswap_dump,
        defiswap_dump,
        ethervista_dump,
        radioshack_dump,
    ].map(_ => _.load({workers: 0}))
)
.then(pairs => {
    pairs = pairs.flat()

    const count = {good: 0, bad: 0, cache_hit: 0, requests: 0}
    
    const check_request = address => {
        count.requests++
        return fetch('https://api.honeypot.is/v2/IsHoneypot?address=' + address)
            .then(_ => {
                if (_.ok) return _.json().then(_ => {
                    if (!_) {
                        throw 'Invalid JSON missed honeypotResult'
                    } else if (_.simulationSuccess == false) {
                        honeypot.set(address, true)
                        fs.appendFileSync('honeypot.bin', Buffer.from(address.slice(2), 'hex'))
                        throw 'Honeypot!'
                    } else if (!_.honeypotResult) {
                        throw 'Invalid JSON missed honeypotResult'
                    } else if (_.honeypotResult.isHoneypot == true) {
                        honeypot.set(address, true)
                        fs.appendFileSync('honeypot.bin', Buffer.from(address.slice(2), 'hex'))
                        throw 'Honeypot!'
                    } else if (_.honeypotResult.isHoneypot == false) {
                        honeypot.set(address, false)
                        fs.appendFileSync('honeypot-not.bin', Buffer.from(address.slice(2), 'hex'))
                    } else {
                        throw 'Invalid JSON honeypotResult.isHoneypot'
                    }
                })
                throw 'Request failed'
            })
    }


    return pairs.reduce(
        (p, pair, i) =>
            p
            .then(() => {
                if (i % 1000 == 0) {
                    db.sort()
                    db.save('good')
                }

                rl.clearLine(process.stdout, 0)
                rl.cursorTo(process.stdout, 0)
                process.stdout.write(`${Math.round(10000 * i / pairs.length) / 100}% | good ${count.good} | bad ${count.bad} | cache_hit ${Math.floor(count.cache_hit)} | requests ${count.requests}`)

                if (db.get_pair_tokens(pair.pair)[0]) {
                    count.good++
                    count.cache_hit++
                } else {
                    const is_honey_t0 = honeypot.get(pair.token0)
                    
                    if (is_honey_t0 == true) {
                        count.bad++
                        count.cache_hit += 0.5
                    } else {
                        const is_honey_t1 = honeypot.get(pair.token1)
                        
                        if (is_honey_t1 == true) {
                            count.bad++
                            count.cache_hit += 0.5
                        } else if (is_honey_t1 == false) {
                            count.cache_hit += 0.5
                            if (is_honey_t0 == false) {
                                count.good++
                                db.index([pair.pair, pair.token0, pair.token1])
                            } else {
                                return check_request(pair.token0)
                                .then(() => {
                                    count.good++
                                    db.index([pair.pair, pair.token0, pair.token1])
                                })
                                .catch(() => {
                                    count.bad++
                                })
                            }
                        } else {
                            if (is_honey_t0 == false) {
                                count.cache_hit += 0.5
                                return check_request(pair.token1)
                                .then(() => {
                                    count.good++
                                    db.index([pair.pair, pair.token0, pair.token1])
                                })
                                .catch(() => {
                                    count.bad++
                                })
                            } else {
                                return Promise.all([
                                    check_request(pair.token0),
                                    check_request(pair.token1)
                                ])
                                .then(() => {
                                    count.good++
                                    db.index([pair.pair, pair.token0, pair.token1])
                                })
                                .catch(() => {
                                    count.bad++
                                })                                
                            }
                        }
                    }
                }            
            }),
        Promise.resolve()
    )
    .then(() => {
        db.sort()
        db.save('good')
    })
})
