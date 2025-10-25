import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Verifying VibeCaster contracts on BaseScan...\n");

  // Contract addresses from successful deployment on Base Mainnet
  const contracts = [
    {
      name: "VibeCasterPoints",
      address: "0x60Dc29BE10cf0721F62DEEA76FC98C0cE60cf199",
      constructorArgs: ["0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10"] // deployer address
    },
    {
      name: "VibeCasterBadges",
      address: "0xe2afB6D954A151361d0d222b9Ed7b3AF53Bcc6e4",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "VibeCaster Badges", // name
        "VCB", // symbol
        "https://ipfs.io/ipfs/" // baseURI
      ]
    },
    {
      name: "RoastMeContract",
      address: "0x91a89F6D69bbc83BE54b5A60677116D0283507Af",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x60Dc29BE10cf0721F62DEEA76FC98C0cE60cf199", // points contract
        "0xe2afB6D954A151361d0d222b9Ed7b3AF53Bcc6e4"  // badges contract
      ]
    },
    {
      name: "IcebreakerContract",
      address: "0xB004FEfe4B061586a7Bf5936CE8C34847b8c896f",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x60Dc29BE10cf0721F62DEEA76FC98C0cE60cf199", // points contract
        "0xe2afB6D954A151361d0d222b9Ed7b3AF53Bcc6e4"  // badges contract
      ]
    },
    {
      name: "ChainReactionContract",
      address: "0xF45368bf5A00b48E8571e4b85054583bF818014E",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x60Dc29BE10cf0721F62DEEA76FC98C0cE60cf199", // points contract
        "0xe2afB6D954A151361d0d222b9Ed7b3AF53Bcc6e4"  // badges contract
      ]
    },
    {
      name: "VibeCasterAdmin",
      address: "0xbA9ec8012Cef69784044255398aBe2C7A6A22702",
      constructorArgs: ["0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10"] // owner
    }
  ];

  console.log("📋 Contracts to verify:");
  contracts.forEach(contract => {
    console.log(`  - ${contract.name}: ${contract.address}`);
  });
  console.log();

  console.log("🚀 Starting verification process...\n");

  for (const contract of contracts) {
    try {
      console.log(`🔍 Verifying ${contract.name}...`);
      
      // Run hardhat verify command
      const { exec } = require('child_process');
      const verifyCommand = `npx hardhat verify --network base-mainnet ${contract.address} ${contract.constructorArgs.join(' ')}`;
      
      exec(verifyCommand, (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.log(`❌ Failed to verify ${contract.name}: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`⚠️  Warning for ${contract.name}: ${stderr}`);
        }
        console.log(`✅ ${contract.name} verification output:`);
        console.log(stdout);
        console.log(`🔗 View on BaseScan: https://basescan.org/address/${contract.address}\n`);
      });

      // Add delay between verifications to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error) {
      console.log(`❌ Error verifying ${contract.name}:`, error);
    }
  }

  console.log("🎉 Verification process completed!");
  console.log("\n📋 Manual verification commands:");
  console.log("If automatic verification fails, run these commands manually:");
  console.log();
  
  contracts.forEach(contract => {
    console.log(`# ${contract.name}`);
    console.log(`npx hardhat verify --network base-mainnet ${contract.address} ${contract.constructorArgs.join(' ')}`);
    console.log();
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
