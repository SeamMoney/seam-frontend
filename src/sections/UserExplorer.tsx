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
import AddrAssets from "components/user/AddrAssets";

const GET_NFTS = gql`
    query CurrentTokens($owner_address: String, $offset: Int) {
      
  current_token_ownerships(
    where: {owner_address: {_eq: $owner_address}}
  ) {
    amount
    collection_name
    creator_address
    name
    token_properties
    owner_address
    last_transaction_version
    current_collection_data {
      collection_name
      creator_address
      description
      metadata_uri
      supply
      uri_mutable
    }
    token_data_id_hash
    current_token_data {
      uri_mutable
      token_data_id_hash
    }
  }
}
`;



const UserNFTs = ({address}:{address:string}) => {
    const { loading, error, data } = useQuery(GET_NFTS,
        {variables: { owner_address: address||"0x1", offset: 0 },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if(!data) return <p>No data</p>;
    return (
        <div className="flex flex-wrap">
            {data.current_token_ownerships.map((nft:any) => {
                return <NFT {...nft}/>;
            })}
        </div>
    )
}



const NFT = (tk:any) => {
    return (
      <motion.div className="listing" whileHover={{ scale: 1.05, y: 8 }}>
        <div className="p-4 m-2 card-body outline-dashed ">
            {/* <p>{tk.name}</p> */}
            <p>{tk.name}</p>
            <p>{tk.collection_name}</p>
            {/* <p>{tk.amount}</p> */}
            
            {/* <p>{tk.supply}</p>
            <p>{tk.maximum}</p> */}
        </div>
      </motion.div>
    )
    }


const UserExplorer = () => {
  const { account, connected } = useWallet();
  const client = useClient();
  const [txs, setTxs] = useState<Types.Transaction[]>([]);



  useEffect(() => {
    if (connected && account != null) {
      loadAccount(account.address?.toString() || "", client);
      loadTxs(account.address?.toString() || "", client).then((res) => {
        setTxs(res);
        console.log("just loaded ", res);
      });
    }
  }, [account]);


  return (
    <div className="mx-2 w-full justify-center p-2">
      <div>
        <div>
        
            {AddrAssets(account?.address.toString()||'0x1')}
        </div>
      </div>
      <div className="flex flex-row m-3 items-start justify-start">
        {account?.address ? (
          <div className="flex flex-col ">
            <div className="flex flex-row ">
            <UserOverview {...account} />
            

            </div>
            <SwitchView tab_names={["Transactions","Nfts","Resources"]}>
            <TxnList txns={txs} address={account?.address.toString()} />
            <UserNFTs address={account?.address.toString()} />

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
