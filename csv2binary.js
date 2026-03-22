const fs = require('fs')

if (!fs.existsSync('honeypot.csv')) {
    console.log('No file "honeypot.csv" for convert to binary.')
    process.exit(0)
}

const count = {good: 0, bad: 0}
const lines = fs.readFileSync('honeypot.csv').toString().trim().split('\n')

console.log('Found "honeypot.csv" file with', lines.length, 'tokens.')
console.log('Converting to:')
console.log('\t - honeypot.bin (bad)')
console.log('\t - honeypot-not.bin (good)')
console.time('convert')
for (var i = 0; i < lines.length; i++) {
    const [address, honeypot_is] = lines[i].split(',')
    if (honeypot_is == 'true') {
        count.bad++
        fs.appendFileSync('honeypot.bin', Buffer.from(address.slice(2), 'hex'))
    } else {
        count.good++                
        fs.appendFileSync('honeypot-not.bin', Buffer.from(address.slice(2), 'hex'))
    }
}
console.timeEnd('convert')

console.log('good:', count.good, 'bad:', count.bad)




