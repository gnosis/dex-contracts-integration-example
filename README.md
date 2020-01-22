# Minimal project for building on https://github.com/gnosis/dex-contracts

In order to work with https://github.com/gnosis/dex-contracts and have these contracts deployed on a test enviroments, do the following steps

1. start ganache-cli with a higher gas valuation

```
ganache-cli -d --gasLimit=8000000
```

2. Install dependencies and do the migration

```bash
yarn install
npx truffle migrate --reset
```
