# <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/npm/uniswap-v2-loader@5.0.1/logo-dark.svg"><img alt="calp.pro icon" src="https://cdn.jsdelivr.net/npm/uniswap-v2-loader@5.0.1/logo-light.svg" height="32" align="absmiddle"></picture>&nbsp;&nbsp;honeypot-not

Filter pairs which don't have honeypot tokens.<br>
Honeypot validation by [https://honeypot.is/ethereum](https://honeypot.is/ethereum).<br>
All pairs processed from protocols:
- **Uniswap V2**
  * `0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f` fabric [contract](https://etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f)
- **SushiSwap**
  * `0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac` fabric [contract](https://etherscan.io/address/0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac)
- **PancakeSwap**
  * `0x1097053fd2ea711dad45caccc45eff7548fcb362` fabric [contract](https://etherscan.io/address/0x1097053fd2ea711dad45caccc45eff7548fcb362)
- **ShibaSwap**
  * `0x115934131916c8b277dd010ee02de363c09d037c` fabric [contract](https://etherscan.io/address/0x115934131916c8b277dd010ee02de363c09d037c)
- **DefiSwap**
  * `0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d` fabric [contract](https://etherscan.io/address/0x9deb29c9a4c7a88a3c0257393b7f3335338d9a9d)
- **EtherVista**
  * `0x9a27cb5ae0b2cee0bb71f9a85c0d60f3920757b4` fabric [contract](https://etherscan.io/address/0x9a27cb5ae0b2cee0bb71f9a85c0d60f3920757b4)
- **RadioShack**
  * `0x91fae1bc94a9793708fbc66adcb59087c46dee10` fabric [contract](https://etherscan.io/address/0x91fae1bc94a9793708fbc66adcb59087c46dee10)

Positive results stored at DEX DB dump files:
- `good_pairs.bin`
- `good_tokens.bin`
- `good_p2tt.bin`

File `honeypost.csv` store state of token address:
```
...
0x2612f8eafd8a5ba5c7799a265b922d80b73232cd,true
0xede6501ca4d2c579dfec249462b36cb1bbfebd28,true
0x607f0e18d684ebf62d6461b60639a00b92c35ccf,true
0xb6ea9d4c3a159221ba3aa969ca32c91fcd75a5f3,true
...
```

## Install and run:
git clone https://github.com/calp-pro/honeypot-not
cd honeypot-not
npm install
npm start
```

Output:
```
DEX DB dump "good" found with pairs: 152923
Found "honeypot.csv" file with tokens checked: 399915
	honeypots: 280279 (bad)
	normal: 119636
21.72% | good 32143 | bad 77873 | cache_hit 70996 | requests 11808
```
