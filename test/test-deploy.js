const { ethers } = require("hardhat");
const { expect, assert } = require("chai")


describe("SimpleStorage", () =>{
  let simpleStorageFactory, simpleStorage
  beforeEach( async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  })

  it("Should start with a favorite number of 0", async () => {
      const currentValue = await simpleStorage.retrieve();
      const expectedValue = "0";
      // Either assert or expect after importing them from Chai
      assert.equal(currentValue.toString(), expectedValue);
      // expect(currentValue.toString()).to.equal(expectedValue);
  });
  it("Should update when we call store", async () => {
    const updatedNumber = await simpleStorage.store(3);
    const expectedValue = "3";
    await updatedNumber.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  })
})