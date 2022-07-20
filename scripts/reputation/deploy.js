const hre = require("hardhat")

async function main() {

    await run('compile')
    console.log(`Deploying a new ${process.env.TOKEN_NAME} to the network: ` + config.defaultNetwork)

    const Token = await hre.ethers.getContractFactory(process.env.TOKEN_CONTRACT)

    console.log("Deploying proxy ...")
    const token = await hre.upgrades.deployProxy(Token,[process.env.TOKEN_NAME, process.env.TOKEN_SYMBOL]);

    console.log("Deploying ...")
    await token.deployed();

    console.log(`${process.env.TOKEN_CONTRACT} deployed. Address: `, token.address)
    console.log(`Please update TOKEN_ADDRESS in file ".env".`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })