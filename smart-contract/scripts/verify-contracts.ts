import { run } from "hardhat";

async function main() {
  console.log("🔍 Verifying vhibes contracts on BaseScan (Base Mainnet)...\n");

  // Contract addresses from latest deployment on Base Mainnet
  // TODO: Update with actual mainnet addresses after deployment
  // OLD BASE SEPOLIA ADDRESSES (COMMENTED):
  /*
  const contracts = [
    {
      name: "VhibesPoints",
      address: "0x74c0BBa16c56A33eDF5af21B50358D661AF2FE72",
      constructorArgs: ["0x0eE1F2b663547dAa487F57C517C7563AdCf86da0"] // deployer address
    },
    {
      name: "VhibesBadges",
      address: "0x409d41Eb5D25045a1b94BD8b3eE82a6D403F188b",
      constructorArgs: [
        "0x0eE1F2b663547dAa487F57C517C7563AdCf86da0", // owner
        "vhibes Badges", // name
        "VCB", // symbol
        "https://ipfs.io/ipfs/" // baseURI
      ]
    },
    {
      name: "RoastMeContract",
      address: "0x4AC02AAde749f2a9d9CFf65153638c88E6e2Da52",
      constructorArgs: [
        "0x0eE1F2b663547dAa487F57C517C7563AdCf86da0", // owner
        "0x74c0BBa16c56A33eDF5af21B50358D661AF2FE72", // points contract
        "0x409d41Eb5D25045a1b94BD8b3eE82a6D403F188b"  // badges contract
      ]
    },
    {
      name: "IcebreakerContract",
      address: "0xBf38C9D9920b1A64E0a38702228B1DED1fF84Af3",
      constructorArgs: [
        "0x0eE1F2b663547dAa487F57C517C7563AdCf86da0", // owner
        "0x74c0BBa16c56A33eDF5af21B50358D661AF2FE72", // points contract
        "0x409d41Eb5D25045a1b94BD8b3eE82a6D403F188b"  // badges contract
      ]
    },
    {
      name: "ChainReactionContract",
      address: "0x4D5E80344DBdB90C039fa3fd7b17740ce8d6FAED",
      constructorArgs: [
        "0x0eE1F2b663547dAa487F57C517C7563AdCf86da0", // owner
        "0x74c0BBa16c56A33eDF5af21B50358D661AF2FE72", // points contract
        "0x409d41Eb5D25045a1b94BD8b3eE82a6D403F188b"  // badges contract
      ]
    },
    {
      name: "VhibesAdmin",
      address: "0xa7c38A8aF5c6Caf74F9A181EA745a2dE4B43B865",
      constructorArgs: ["0x0eE1F2b663547dAa487F57C517C7563AdCf86da0"] // owner
    }
  ];
  */

  // Contract addresses from latest deployment on Base Mainnet
  const contracts = [
    {
      name: "VhibesPoints",
      address: "0x738be79661d225048F8C0881adBC47bAA9211b7b",
      constructorArgs: ["0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10"] // deployer address
    },
    {
      name: "VhibesBadges",
      address: "0xc0F8e7dA9d49A635f18d988f7a7C727eB0dA2C44",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "vhibes Badges", // name
        "VCB", // symbol
        "https://ipfs.io/ipfs/" // baseURI
      ]
    },
    {
      name: "RoastMeContract",
      address: "0x96A472f40fcab11CB17045c04122Dd6e311F8324",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x738be79661d225048F8C0881adBC47bAA9211b7b", // points contract
        "0xc0F8e7dA9d49A635f18d988f7a7C727eB0dA2C44"  // badges contract
      ]
    },
    {
      name: "IcebreakerContract",
      address: "0x72b92D55195c05E43A7E752839d6eCD23104ca8a",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x738be79661d225048F8C0881adBC47bAA9211b7b", // points contract
        "0xc0F8e7dA9d49A635f18d988f7a7C727eB0dA2C44"  // badges contract
      ]
    },
    {
      name: "ChainReactionContract",
      address: "0xE09596824F17c41eD18cCe7d7035908526f2BF14",
      constructorArgs: [
        "0x95f87C578aA1d3E72Ba7ee27d2d506c3CE8f8f10", // owner
        "0x738be79661d225048F8C0881adBC47bAA9211b7b", // points contract
        "0xc0F8e7dA9d49A635f18d988f7a7C727eB0dA2C44"  // badges contract
      ]
    },
    {
      name: "VhibesAdmin",
      address: "0x4548f1c691b254DB4532C05D2118f66D2A78ec1C",
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
      
      await run("verify:verify", {
        address: contract.address,
        constructorArguments: contract.constructorArgs,
      });
      
      console.log(`✅ ${contract.name} verified successfully!`);
      console.log(`🔗 View on BaseScan: https://basescan.org/address/${contract.address}\n`);
      
      // Add delay between verifications to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
      
    } catch (error: any) {
      if (error.message.includes("Already Verified")) {
        console.log(`✅ ${contract.name} is already verified!`);
      } else {
        console.log(`❌ Failed to verify ${contract.name}:`, error.message);
      }
      console.log();
    }
  }

  console.log("🎉 Verification process completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
