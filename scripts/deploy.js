const { ethers, run } = require("hardhat")

async function main(){

  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract Deployed to : ${simpleStorage.address}`);
}

async function verify(contractAddress, args){
  console.log("Verifying contract on Etherscan...");
  await run("verify:verify");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })