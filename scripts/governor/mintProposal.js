const hre = require("hardhat")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  const token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )

  const proposalDescription = "#4 propose this data"
  const mintAccount = "0x5e6CcE07A609D7550Ffd39beEa0d8B2eeF28FCd2"
  const mintAmount = hre.ethers.BigNumber.from(100).mul(hre.ethers.BigNumber.from(10).pow(18))

  const encodedFunctionCall = token.interface.encodeFunctionData("mint", [
    mintAccount,
    mintAmount
  ])

  const governor = await hre.ethers.getContractAt(
    process.env.GOVERNOR_CONTRACT,
    process.env.GOVERNOR_ADDRESS
  )

  const proposeTx = await governor.propose(
    [process.env.TOKEN_ADDRESS],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )
  const result = await proposeTx.wait()

  console.log('result: ', JSON.stringify(result.logs[0].transactionHash))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
