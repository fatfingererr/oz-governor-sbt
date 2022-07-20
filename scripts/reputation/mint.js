const hre = require("hardhat")

async function main() {
  await run("compile")

  let token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )

  const unit = hre.ethers.BigNumber.from(10).pow(18);

  console.log("Minting tokens ...")
  const mintTx = await token.mint(process.env.ACCOUNT, hre.ethers.BigNumber.from(100).mul(unit))
  await mintTx.wait(1)

  token = await hre.ethers.getContractAt(
    process.env.TOKEN_CONTRACT,
    process.env.TOKEN_ADDRESS
  )
  const balanceTx = await token.balanceOf(process.env.ACCOUNT)
  console.log(
    `You have ${balanceTx.div(unit)} $${process.env.TOKEN_SYMBOL} now.`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
