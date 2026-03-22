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

File `honeypost.bin` store of honeypot (bad) tokenes addresses.<br>
File `honeypost-not.bin` store NOT honeypot (good) tokenes addresses.<br>

## Install and run:
git clone https://github.com/calp-pro/honeypot-not
cd honeypot-not
npm install
npm start
```
