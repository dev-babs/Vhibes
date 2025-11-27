import { ethers } from "hardhat";

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Finalizing vhibes deployment with account:", deployer.address);

  // Contract addresses from the partial deployment on Base Mainnet
  const VhibesPoints = "0x738be79661d225048F8C0881adBC47bAA9211b7b";
  const VhibesBadges = "0xc0F8e7dA9d49A635f18d988f7a7C727eB0dA2C44";
  const RoastMeContract = "0x96A472f40fcab11CB17045c04122Dd6e311F8324";
  const IcebreakerContract = "0x72b92D55195c05E43A7E752839d6eCD23104ca8a";
  const ChainReactionContract = "0xE09596824F17c41eD18cCe7d7035908526f2BF14";
  const VhibesAdmin = "0x4548f1c691b254DB4532C05D2118f66D2A78ec1C";

  try {
    // Get contract instances
    const pointsContract = await ethers.getContractAt("VhibesPoints", VhibesPoints);
    const badgesContract = await ethers.getContractAt("VhibesBadges", VhibesBadges);
    const adminContract = await ethers.getContractAt("VhibesAdmin", VhibesAdmin);

    // Wait a bit for network to settle
    console.log("Waiting for network to settle...");
    await sleep(5000);

    // Set points contract in badges contract
    console.log("Setting points contract in VhibesBadges...");
    const setPointsTx = await badgesContract.setPointsContract(VhibesPoints);
    await setPointsTx.wait();
    console.log("Points contract set in badges contract");

    await sleep(2000);

    // Authorize contracts in VhibesPoints one by one with delays
    console.log("Authorizing contracts in VhibesPoints...");
    
    console.log("Authorizing RoastMeContract...");
    const authRoastTx = await pointsContract.authorizeContract(RoastMeContract);
    await authRoastTx.wait();
    await sleep(2000);

    console.log("Authorizing IcebreakerContract...");
    const authIcebreakerTx = await pointsContract.authorizeContract(IcebreakerContract);
    await authIcebreakerTx.wait();
    await sleep(2000);

    console.log("Authorizing ChainReactionContract...");
    const authChainTx = await pointsContract.authorizeContract(ChainReactionContract);
    await authChainTx.wait();
    await sleep(2000);

    console.log("Authorizing VhibesAdmin...");
    const authAdminTx = await pointsContract.authorizeContract(VhibesAdmin);
    await authAdminTx.wait();
    console.log("All contracts authorized in VhibesPoints");

    await sleep(2000);

    // Authorize minters in VhibesBadges one by one with delays
    console.log("Authorizing minters in VhibesBadges...");
    
    console.log("Authorizing RoastMeContract as minter...");
    const authRoastMinterTx = await badgesContract.authorizeMinter(RoastMeContract);
    await authRoastMinterTx.wait();
    await sleep(2000);

    console.log("Authorizing IcebreakerContract as minter...");
    const authIcebreakerMinterTx = await badgesContract.authorizeMinter(IcebreakerContract);
    await authIcebreakerMinterTx.wait();
    await sleep(2000);

    console.log("Authorizing ChainReactionContract as minter...");
    const authChainMinterTx = await badgesContract.authorizeMinter(ChainReactionContract);
    await authChainMinterTx.wait();
    await sleep(2000);

    console.log("Authorizing VhibesAdmin as minter...");
    const authAdminMinterTx = await badgesContract.authorizeMinter(VhibesAdmin);
    await authAdminMinterTx.wait();
    console.log("All minters authorized in VhibesBadges");

    console.log("\n=== VHIBES DEPLOYMENT FINALIZED ===");
    console.log("VhibesPoints:", VhibesPoints);
    console.log("VhibesBadges:", VhibesBadges);
    console.log("RoastMeContract:", RoastMeContract);
    console.log("IcebreakerContract:", IcebreakerContract);
    console.log("ChainReactionContract:", ChainReactionContract);
    console.log("VhibesAdmin:", VhibesAdmin);
    console.log("=====================================\n");

    // Save deployment addresses
    const deploymentInfo = {
      VhibesPoints: VhibesPoints,
      VhibesBadges: VhibesBadges,
      RoastMeContract: RoastMeContract,
      IcebreakerContract: IcebreakerContract,
      ChainReactionContract: ChainReactionContract,
      VhibesAdmin: VhibesAdmin,
      deployer: deployer.address,
      network: (await ethers.provider.getNetwork()).name,
      timestamp: new Date().toISOString()
    };

    console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("Deployment info saved to deployment.json");

  } catch (error) {
    console.error("Finalization failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
