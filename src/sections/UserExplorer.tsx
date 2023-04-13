import TxnList from "./TxnList";
import { useEffect, useState } from "react";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { loadAccount } from "hooks/loadAptos";
import {useClient } from "hooks/useAptos";
import ResourceDetailView from "views/ResourceDetailView";
import UserOverview from "./UserOverview";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import {
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
    order_by: {last_transaction_version: desc}
    offset: $offset
    where: {owner_address: {_eq: $owner_address}}
  ) {
    amount
    collection_name
    creator_address
    name
    collection_name

    current_token_data {
      token_data_id_hash
      metadata_uri
    }

  }
}`;


const UserNFTs = ({address}:{address:string}) => {
    const { loading, error, data } = useQuery(GET_NFTS,
        {variables: { owner_address: address, offset: 0 },
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

  
  const [image_src, setImageSrc] = useState(tk.current_token_data.metadata_uri);
  

  useEffect(() => {
    getMetadata(tk.current_token_data.metadata_uri).then((metadata) => {
    let image_src = tk.current_token_data.metadata_uri;
  if (metadata && metadata.image||"") {
    image_src = metadata.image;
  }
  setImageSrc(image_src);
    });
  }, [tk.current_token_data.metadata_uri]);


    return (
      
        <div className="p-4 m-2 card-body outline-dashed items-center">
            <p>{tk.name}</p>
            {/* <p>{tk.collection_name}</p> */}

            <a href={tk.current_token_data.metadata_uri} target="_blank">
                <img src={image_src} alt="nft" className="w-32 h-32"/>
            </a>

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
      loadAccount(account.address?.toString(), client);
      loadTxs(account.address?.toString(), client).then((res) => {
        setTxs(res);
        console.log("just loaded ", res);
      });
    }
  }, [account,client,connected]);





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
