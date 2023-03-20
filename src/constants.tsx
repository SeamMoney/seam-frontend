export const devnetUrl =
  process.env.APTOS_DEVNET_URL || "https://fullnode.devnet.aptoslabs.com/";

export const networks = {
  local: "http://localhost:8080",
  devnet: devnetUrl,
  testnet: "https://testnet.aptoslabs.com",
  ait3: "https://ait3.aptosdev.com/",
};
export const mock_toml=`
[package]
name = "ferum"
version = "0.1.0"

[dependencies]
AptosFramework = { git = "https://github.com/aptos-labs/aptos-core.git", subdir = "aptos-move/framework/aptos-framework/", rev = "devnet" }

[addresses]
ferum="0x728891241aa0dc576e23fa368c168f657b1364eb909c8444f28bc7e4a4a2268d"

`;
export type NetworkName = keyof typeof networks;

// Remove trailing slashes
for (const key of Object.keys(networks)) {
  const networkName = key as NetworkName;
  if (networks[networkName].endsWith("/")) {
    networks[networkName] = networks[networkName].slice(0, -1);
  }
}

export const defaultNetworkName: NetworkName = "devnet" as const;

if (!(defaultNetworkName in networks)) {
  throw `defaultNetworkName '${defaultNetworkName}' not in Networks!`;
}

export const defaultNetwork = networks[defaultNetworkName];
