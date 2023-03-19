import { AptosClient, Types } from "aptos";
// import { loadCoinList } from "hooks/useAptos";
import { useLoaderData } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { coin_lists } from "../data/coin_data";
import axios from "axios";

const BACKEND_URL ="http://127.0.0.1:5000"
interface PoolProps {
  client: AptosClient;
}

const loadOracles = async () => { 
  const oracles = await axios.get(BACKEND_URL+"/spot_prices");
  return oracles.data;
}
// This page will load a list of coins and show the following info about the coins
const Coins = () => {
  const coins = useLoaderData() as any;
  const [coinData, setCoinData] = useState<Types.MoveResource[]>([]);

  useEffect(() => {
    loadOracles().then((data) => {
      setCoinData(data);
    });
  }, []);

  return (
    <div>
      <p>Coins</p>
      {coinData.map((coin:any, i:number) => {
        return (
          <div key={i}>
            <p>{coin.pair0}</p>
            <p>{coin.pair1}</p>
            <p>{coin.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Coins;
