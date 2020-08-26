const BatchExchange = artifacts.require("@gnosis.pm/dex-contracts/build/contracts/BatchExchange")
const ERC20Mintable = artifacts.require("ERC20Mintable")

const GnosisSafe = artifacts.require("GnosisSafe")
const ProxyFactory = artifacts.require("ProxyFactory")
const MultiSend = artifacts.require('MultiSend')

const safeUtils = require("../node_modules/@gnosis.pm/safe-contracts/test/utils/general.js")


// For exisiting networks see - https://github.com/gnosis/contract-proxy-kit/blob/c17906d4df64ba3ae8703fbaf2bd5d627dc3083c/src/index.js#L98-L120

// From Multisend unit tests
let encodeData = function(operation, to, value, data) {
  let dataBuffer = Buffer.from(util.stripHexPrefix(data), "hex")
  let encoded = abi.solidityPack(["uint8", "address", "uint256", "uint256", "bytes"], [operation, to, value, dataBuffer.length, dataBuffer])
  return encoded.toString("hex")
}


contract("BatchExchange", async accounts => {
  const solver = accounts[0]

  beforeEach(async function () {
    // Create Gnosis Safe and MultiSend library
    lw = await safeUtils.createLightwallet()
    proxyFactory = await ProxyFactory.new()
    gnosisSafeMasterCopy = await safeUtils.deployContract("deploying Gnosis Safe Mastercopy", GnosisSafe)
    
    // Create Gnosis Safe
    let gnosisSafeData = await gnosisSafeMasterCopy.contract.setup.getData([lw.accounts[0], lw.accounts[1]], 1, 0, 0, 0, 0, 0, 0)
    gnosisSafe = safeUtils.getParamFromTxEvent(
        await proxyFactory.createProxy(gnosisSafeMasterCopy.address, gnosisSafeData),
        'ProxyCreation', 'proxy', proxyFactory.address, GnosisSafe, 'create Gnosis Safe Proxy',
    )
    multiSend = await MultiSend.new()
})

  describe("Safe Multi-Send", async () => {
    it("does the stuff", async () => {
      const exchange = await BatchExchange.deployed()
      const gusd = await ERC20Mintable.new()
      const tusd = await ERC20Mintable.new()

      const amount = web3.toWei(10)

      await gusd.mint(gnosisSafe.address, web3.toWei(100))
      await tusd.mint(gnosisSafe.address, web3.toWei(100))
      // TODO - Assert Safe has balance 100 of both tokens.
      
      const transferData = [
        gusd.contract.methods.transferFrom(gnosisSafe.address, accounts[0], amount).encodeABI(),
        tusd.contract.methods.transferFrom(gnosisSafe.address, accounts[0], amount).encodeABI(),
        gusd.contract.methods.transferFrom(gnosisSafe.address, accounts[1], amount).encodeABI(),
        tusd.contract.methods.transferFrom(gnosisSafe.address, accounts[1], amount).encodeABI()
      ]
      console.log(transferData)

      // - ERC20.Transfer(A_i, T_j, amount, { from: F }) <---- This might make it harder to batch the transfer
      // - ERC20.Approve(X, T_j, amount, { from: A_i })
      // - Exchange.Deposit(T_j, amount, { from: A_i })
      let nestedTransactionData = '0x' +
        encodeData(0, gusd.address, 0, '0x' + transferData[0])
        encodeData(0, tusd.address, 0, '0x' + transferData[1])
        encodeData(0, tusd.address, 0, '0x' + transferData[2])
        encodeData(0, tusd.address, 0, '0x' + transferData[3])
      console.log(nestedTransactionData)
    

      let data = await multiSend.contract.multiSend.getData(nestedTransactionData)
      let transactionHash = await gnosisSafe.getTransactionHash(multiSend.address, 0, data, DELEGATECALL, 0, 0, 0, 0, 0, nonce)
      // let sigs = utils.signTransaction(lw, [lw.accounts[0]], transactionHash)
    })
  })
})





  

let data = await multiSend.contract.multiSend.getData(nestedTransactionData)
let transactionHash = await gnosisSafe.getTransactionHash(multiSend.address, 0, data, DELEGATECALL, 0, 0, 0, 0, 0, nonce)
// let sigs = utils.signTransaction(lw, [lw.accounts[0]], transactionHash)



