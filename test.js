const { describe, before, it } = require('node:test')
const assert = require('node:assert/strict')
const honeypot_not = require('./index')

describe('Honeypot-not', () => {

    it('Find arbitrage pairs addresses between WBTC/WETH tokens at PancakeSwap and SushiSwap', () => {
        var db = honeypot_not()
        const pairs = db.find_pairs_with_tokens(
            '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'/*WBTC*/,
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'/*WETH*/
        )
        assert.equal(pairs[0], '0x4ab6702b3ed3877e9b1f203f90cbef13d663b0e8', 'WBTC/WETH (Pancake) https://etherscan.io/address/0x4ab6702b3ed3877e9b1f203f90cbef13d663b0e8')
        assert.equal(pairs[1], '0xceff51756c56ceffca006cd410b03ffc46dd3a58', 'WBTC/WETH (Sushi) https://etherscan.io/address/0xceff51756c56ceffca006cd410b03ffc46dd3a58')
    })

})



