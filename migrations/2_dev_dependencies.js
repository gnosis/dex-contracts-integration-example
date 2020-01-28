const migrateDependencies = require("@gnosis.pm/dex-contracts/src/migration/dependencies");
const migrateBatchExchange = require("@gnosis.pm/dex-contracts/src/migration/PoC_dfusion");

module.exports = async function(deployer, network, accounts) {
  if (network === "development") {
    await migrateDependencies({
      artifacts,
      deployer,
      network,
      account: accounts[0]
    });
    return migrateBatchExchange({
      artifacts,
      deployer,
      network,
      account: accounts[0],
      web3
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(
      "Not in development, so nothing to do. Current network is %s",
      network
    );
  }
};
