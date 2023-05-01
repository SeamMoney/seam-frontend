import { AptosClient, Types } from "aptos";
// import { loadCoinList } from "hooks/useAptos";
import { useLoaderData } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { coin_lists } from "../data/coin_data";
import axios from "axios";
import AssetPrice from "components/asset/AssetPrice";

const BACKEND_URL ="http://127.0.0.1:5000"
interface PoolProps {
  client: AptosClient;
}

const loadOracles = async () => { 
  const oracles = await axios.get(BACKEND_URL+"/spot_prices",
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
  console.log(oracles.data);
  return oracles.data.data;
}
// This page will load a list of coins and show the following info about the coins
const Coins = () => {
  // const coins = useLoaderData() as any;
  const [coinData, setCoinData] = useState<any[]>([]);


  useEffect(() => {
    loadOracles().then((data) => {
      setCoinData(data);
    });
  }, []);

  return (
    <div>
      <p>Coins</p>
      <div>
      {coinData.length > 0 ? (
        <div className="flex flex-grid">
      {coinData.map((coin:any, i:number) => {
        let pair0, pair1 = coin.oracleName.split("/");
        let provider = coin.oracleName.split("_")[1];
        return (
          <div key={i}>
            <AssetPrice 
              token={pair1}
              asset={pair1}
              price={coin.price}  
              key={i}
            />
            
          </div>
        );
      })}
      </div>) : (
        <p>Loading...</p>)}
    </div>
    </div>
  );
};

export default Coins;
