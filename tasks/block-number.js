// With this task we can get the current block number of the blockchain that we are working on
const { task } = require("hardhat/config");


task("block-number", "Prints the current block number")
    .setAction( async ( taskArgs, hre ) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number is: ${blockNumber}`);
    })