const hre = require("hardhat")

async function main() {

    // Make sure everything is compiled
    await run('compile')

    console.log(`Deploying a new ${process.env.TIMELOCK_CONTRACT} to the network: ` + config.defaultNetwork)

    const TimeLock = await hre.ethers.getContractFactory(process.env.TIMELOCK_CONTRACT)

    console.log("Deploying proxy ...")    
    const timeLock = await hre.upgrades.deployProxy(TimeLock,[process.env.MIN_DELAY,[],[]])

    console.log("Deploying ...")
    await timeLock.deployed();

    console.log(`${process.env.TIMELOCK_CONTRACT} deployed. Address: `, timeLock.address)
    console.log(`Please update TIMELOCK_ADDRESS in file ".env".`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })