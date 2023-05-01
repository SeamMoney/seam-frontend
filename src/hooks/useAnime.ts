import { AptosClient } from "aptos"

import { SDK } from '@animeswap.org/v1-sdk';


const ANIME_V1="0xe73ee18380b91e37906a728540d2c8ac7848231a26b99ee5631351b3543d7cf2"


const FAUCET_MODULE = "FaucetV1"
const FAUCET_MINT = "request"
const ANIME_COINS_MODULE= "DemoTestCoinsV1"
const animeDeposit = () => {

}




export async function aSwap(from_token:string,to_token:string,from_quantity:number){

    const APTOS = '0x1::aptos_coin::AptosCoin'
    const BTC = '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC'
    const aptosAmount = 1e6
  

}

export const animeFaucet = (client: AptosClient) => {
    const payload = {
        type: "script_function_payload",
        function: `${ANIME_V1}::${FAUCET_MODULE}::${FAUCET_MINT}`,
        type_arguments: [
        `${ANIME_V1}::${ANIME_COINS_MODULE}::USDT`],
        // arguments: [toAddr, "500"]
    };

}


