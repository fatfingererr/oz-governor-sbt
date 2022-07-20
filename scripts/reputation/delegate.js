const hre = require("hardhat")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  let token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )
  console.log(`Original delegatee: ${await token.delegates(process.env.ACCOUNT)}`)

  console.log("Delegate voting rights (to yourself) ...")
  const delegateTx = await token.delegate(process.env.ACCOUNT)
  await delegateTx.wait(1)

  token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )
  console.log(`New delegatee: ${await token.delegates(process.env.ACCOUNT)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
