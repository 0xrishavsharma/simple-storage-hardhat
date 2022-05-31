const { ethers, run, network } = require("hardhat")

const developementChains = ["hardhat", "localhost"]

async function main(){

  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract Deployed to : ${simpleStorage.address}`);
  // We'll call the verify function only if we are deploying on mainnet or testnet
  if(network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY){
    // So the moment we deploy our contract and our transaction goes through, it might take few seconds for etherscan to identify the 
    // transaction. So, usually it is a good idea to wait a few blocks before we call the function to verify our transaction
    await simpleStorage.deployTransaction.wait(3);
    await verify(simpleStorage.address, []);
  }

  // Retrieving the current stored value in the smart contract
  const currentStoredValue = await simpleStorage.retrieve();
  console.log(`Current stored value in the contract is: ${currentStoredValue}`);
  // Updating the current stored value
  const changingStoredValue = await simpleStorage.store(7);
  changingStoredValue.deployTransaction.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args){
  console.log("Verifying contract on Etherscan...");
  // We are adding this try-catch block because sometimes the console will through us some error if the contract is already verified
  try{
    await run("verify:verify", {
        address: contractAddress,
        constructorArgs: args,
    });
  }catch(e){
    if(e.message.toLowerCase().includes("already verifies")){
      console.log("Already verified!");
    }else{
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })