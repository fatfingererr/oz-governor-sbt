const hre = require("hardhat")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  let timelock = await hre.ethers.getContractAt(
    process.env.TIMELOCK_CONTRACT,
    process.env.TIMELOCK_ADDRESS
  )

  const proposerRole = await timelock.PROPOSER_ROLE()
  const executorRole = await timelock.EXECUTOR_ROLE()
  const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

  console.log(`Grant proposer (Governor): ${process.env.GOVERNOR_ADDRESS} ...`)
  const proposerTx = await timelock.grantRole(
    proposerRole,
    process.env.GOVERNOR_ADDRESS
  )
  await proposerTx.wait(1)

  console.log(`Grant executor (Everyone): ${process.env.ADDRESS_ZERO} ...`)
  const executorTx = await timelock.grantRole(
    executorRole,
    process.env.ADDRESS_ZERO
  )
  await executorTx.wait(1)

  console.log(`Revoke admin (You): ${process.env.ACCOUNT} ...`)
  const revokeTx = await timelock.revokeRole(adminRole, process.env.ACCOUNT)
  await revokeTx.wait(1)

  console.log('All timelock roles is granted/revoked.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
