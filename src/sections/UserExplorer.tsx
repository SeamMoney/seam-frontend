import Spline from "@splinetool/react-spline";
import TxnList from "./TxnList";
import { useWeb3 } from "@fewcha/web3-react";
import { useEffect, useState } from "react";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { loadAccount } from "hooks/loadAptos";
import { sendTransaction, useClient } from "hooks/useAptos";
import ResourceDetailView from "views/ResourceDetailView";
import UserOverview from "./UserOverview";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloConsumer,
  gql,
  useQuery,
} from "@apollo/client";
import tokensJson from "../defaultList.mainnet.json";
import { motion } from "framer-motion";
import SwitchView from "./SwitchView";
const GET_TOKENS = gql`
  query current_balances($owner_address: String!, $offset: Int!) {
    current_coin_balances(
      where: {
        owner_address: {
          _eq: $owner_address
        }
      }
      order_by: { last_transaction_version: desc }
      offset: $offset
    ) {
      coin_type
      amount
      last_transaction_timestamp
    }
  }
  # args:
`;

const GET_NFTS = gql`
    query CurrentTokens($owner_address: String, $offset: Int) {
  current_token_datas(
    order_by: {last_transaction_version: desc}
    offset: $offset
  ) {
    token_data_id_hash
    name
    collection_name
    metadata_uri
    supply
    maximum
    royalty_points_denominator
  }
}`;

const lookup_coin = (
  owner_address: string,
  coin_type: string,
  amount: number,
  last_transaction_timestamp: number
) => {
  const balance = (amount / 100000000).toFixed(3);
  
  const symbol = get_symbol(coin_type);
  const image = tokensJson.find(
    (token: any) => token.symbol === symbol
  )?.logo_url;
  return { n: balance, symbol, image };
};
const get_symbol = (coin_type: string):string => {
    const addr = coin_type.split("::")[0];
    const sym = tokensJson.find((token: any) => token.token_type.account_address === addr)?.symbol;
    if (sym === undefined) {
        return (coin_type.split("::")[1]).split("::")[0];
    }
    return sym;
}


const UserNFTs = ({address}:{address:string}) => {
    const { loading, error, data } = useQuery(GET_NFTS,
        {variables: { owner_address: address||"0x1", offset: 0 },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div className="flex flex-wrap">
            {data.current_token_datas.map((nft:any) => {
                return <NFT {...nft}/>;
            })}
        </div>
    )
}


const getMetadata = async (uri:string) => {
    const res = await fetch(uri);
    const data = await res.json();
    return data;
}

const NFT = (tk:any) => {
    return (
        <div className="p-4 m-2 card-body outline-dashed ">
            <p>{tk.name}</p>
            <p>{tk.collection_name}</p>
            
            <p>{tk.supply}</p>
            <p>{tk.maximum}</p>
        </div>
    )
    }


const UserExplorer = () => {
  const { account, connected } = useWallet();
  const client = useClient();
  const [txs, setTxs] = useState<Types.Transaction[]>([]);

  // const load_balances = () => {
  //     console.log("loading balances");

  const { loading, error, data } = useQuery(GET_TOKENS,
      {variables: { owner_address: account?.address.toString()||"0x1", offset: 0 },
  });
  

  useEffect(() => {
    if (connected && account != null) {
      loadAccount(account.address?.toString() || "", client);
      loadTxs(account.address?.toString() || "", client).then((res) => {
        setTxs(res);
        console.log("just loaded ", res);
      });
    }
  }, [account]);
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error : {error.message}</p>;

  const UserBalance =(balance:any) => {
    const {n, symbol, image} = lookup_coin(balance.owner_address, balance.coin_type, balance.amount, balance.last_transaction_timestamp);
    const sym = symbol.split("")[0];
    return (
        <motion.div className="listing" whileHover={{ scale: 1.05, y: 8 }}>
            <div className="p-4 m-2 card-body outline-dashed ou">
        <div className="bg-black m-2 p-2 text-white opacity-100 flex flex-col items-center w-20 justify-center">
            <img src={image} className="w-6 h-6" />
            <p>{symbol}</p>
            <p className="text-lg font-bold">{n}</p>
            </div>
            </div>
        </motion.div>
    )
  }

  const UserBalances = (bs:any[]) => {
    return (
        <div className="flex flex-wrap w-1/2">
            {bs.filter((b:any) => b.amount > 0).
                map((balance:any) => {
                return (
                    <UserBalance {...balance} />
                )
            })}
        </div>
    )
  }


  return (
    <div className="mx-2 w-full justify-center p-2">
      <div>
        <p>Balances</p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : UserBalances(data.current_coin_balances)}
            
            
        </div>

        {/* {error ? <p>{error.toString()}</p> : <p>Loaded</p>} */}
      </div>

      <div className="flex flex-row m-3 items-start justify-start">
        {account?.address ? (
          <div className="flex flex-col ">
            <div className="flex flex-row ">
            <UserOverview {...account} />
            <UserNFTs address={account?.address.toString()} />

            </div>
            <SwitchView tab_names={["Transactions","Nfts","Resources"]}>
            <TxnList txns={txs} address={account?.address.toString()} />
            <UserNFTs address={account?.address.toString()} />
            {/* <ModuleTypes module={selectedModule} /> */}

            <ResourceDetailView
              showDetails={true}
              showUnder={true}
              address={account?.address.toString()}
            />
            </SwitchView>

          </div>
        ) : (
          <p>please connect</p>
        )}
        {account?.address?.toString() ? (
          <div className="w-1/2 p-2">
            
          </div>
        ) : (
          <p>no resources</p>
        )}
      </div>
    </div>
  );
};

export default UserExplorer;
