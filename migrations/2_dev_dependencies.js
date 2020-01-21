const migrateDependencies = require("@gnosis.pm/dex-contracts/src/migration/dependencies");

module.exports = function(deployer, network, accounts) {
  return migrateDependencies({
    artifacts,
    deployer,
    network,
    accounts
  });
};
