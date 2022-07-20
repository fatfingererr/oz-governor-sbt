const hre = require("hardhat")
const delay = require("../utils/delay")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  const token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )

  const descriptionHash = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("#5 propose this data"))
  const mintAccount = "0x5e6CcE07A609D7550Ffd39beEa0d8B2eeF28FCd2"
  const mintAmount = hre.ethers.BigNumber.from(100).mul(
    hre.ethers.BigNumber.from(10).pow(18)
  )

  const encodedFunctionCall = token.interface.encodeFunctionData("mint", [
    mintAccount,
    mintAmount
  ])

  const governor = await hre.ethers.getContractAt(
    process.env.GOVERNOR_CONTRACT,
    process.env.GOVERNOR_ADDRESS
  )

  const queueTx = await governor.queue(
    [process.env.TOKEN_ADDRESS],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  console.log(await queueTx.wait(1))

  console.log("Time delay ...")
  delay(5000)

  console.log("Executing ...")
  const executeTx = await governor.execute(
    [process.env.TOKEN_ADDRESS],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )

  console.log( await executeTx.wait(1))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
