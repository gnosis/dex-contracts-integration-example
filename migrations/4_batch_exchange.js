const migrateBatchExchange = require("@gnosis.pm/dex-contracts/src/migration/PoC_dfusion");

module.exports = async function(deployer, network, accounts, web3) {
  return migrateBatchExchange({
    artifacts,
    deployer,
    network,
    accounts,
    web3
  });
};
