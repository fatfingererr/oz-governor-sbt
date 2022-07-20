const hre = require("hardhat")
const bigInt = require("big-integer")

async function main() {
  // Make sure everything is compiled
  await run("compile")

  const governor = await hre.ethers.getContractAt(
    process.env.GOVERNOR_CONTRACT,
    process.env.GOVERNOR_ADDRESS
  )

  const proposalId = hre.ethers.BigNumber.from(bigInt("7d8874a82da8572ad5fde750b773822057d08b70e27c241c5bc2d794f7ac6ba1", 16).toString()) 
  const voteWay = 1
  const reason = "I vote yes"
  console.log('proposalId: ', proposalId.toString());

  const voteTx = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  )
  await voteTx.wait(1)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
