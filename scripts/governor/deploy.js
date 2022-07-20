const hre = require("hardhat")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  console.log(
    `Deploying a new ${process.env.GOVERNOR_CONTRACT} to the network: ` +
      config.defaultNetwork
  )

  const Governor = await hre.ethers.getContractFactory(
    process.env.GOVERNOR_CONTRACT
  )

  console.log("Deploying proxy...")
  const governor = await hre.upgrades.deployProxy(Governor, [
    process.env.GOVERNOR_NAME,
    process.env.TOKEN_ADDRESS,
    process.env.TIMELOCK_ADDRESS,
    process.env.QUORUM_PERCENTAGE,
    process.env.VOTING_PERIOD,
    process.env.VOTING_DELAY,
    process.env.PROPOSAL_THRESHOLD
  ])

  console.log("Deploying ...")
  await governor.deployed()

  console.log(
    `${process.env.GOVERNOR_CONTRACT} deployed. Address: `,
    governor.address
  )
  console.log(`Please update GOVERNOR_ADDRESS in file ".env".`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
