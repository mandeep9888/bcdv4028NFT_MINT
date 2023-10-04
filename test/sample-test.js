const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const AlphaApes = await ethers.getContractFactory("AlphaApes");
    const alphaApes = await AlphaApes.deploy();
    await alphaApes.deployed();

    // const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const recipient = "0x0ce1ADBD5d8782dc657A5D016b15eA9a72AFFf17";
    const metadataURI = "cid/test.png";

    let balance = await alphaApes.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await alphaApes.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await alphaApes.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await alphaApes.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await alphaApes.payToMint(recipient, "foo", {
      value: ethers.utils.parseEther("0.05"),
    });
  });
});
