const hre = require("hardhat")

async function main() {

    // Make sure everything is compiled
    await run('compile')

    let token = await hre.ethers.getContractAt(process.env.TOKEN_CONTRACT, process.env.TOKEN_ADDRESS)
    console.log(`Original token ownership (You): ${await token.owner()}`)

    console.log('Ownership transfer ...')
    const tx = await token.transferOwnership(process.env.TIMELOCK_ADDRESS);
    await tx.wait(1);

    token = await hre.ethers.getContractAt(process.env.TOKEN_CONTRACT, process.env.TOKEN_ADDRESS)
    console.log(`New token ownership (Timelock): ${await token.owner()}`)
    console.log(`Token ownership is transferred.`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })