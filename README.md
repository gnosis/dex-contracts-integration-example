# Minimal project for building on [dex-contracts](https://github.com/gnosis/dex-contracts)

*Disclaimer: This repository has been archived and is no longer supported*

This project should serve as a basis for every project intending to build on https://github.com/gnosis/dex-contracts. It provides a minimal framework to successfully deploy the BatchExchange for testing.

1. start ganache-cli with a higher gas valuation

```
ganache-cli -d --gasLimit=8000000
```

2. Install dependencies and do the migration

```bash
yarn install
npx truffle migrate --reset
```
