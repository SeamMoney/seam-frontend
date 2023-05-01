
// const formatLink = (base_url,address) => {


const APTOS_EXPLORER = (network: string)=> `https://explorer.devnet.aptos.dev/?network=${network}`;
const APTOS_BASE_EXPLORER = `https://aptos-explorer.netlify.app/`;

export const aptosTxnLink = (txVersion: string) => {
    return APTOS_BASE_EXPLORER + `txn/${txVersion}`;
}
