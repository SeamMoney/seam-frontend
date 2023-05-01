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
import { BASE_TYPES } from "BaseStyles";

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
    owner_address
    token_properties

    current_token_data {
      token_data_id_hash
      metadata_uri
    }

    current_collection_data {
      description
      metadata_uri
      supply
      last_transaction_timestamp
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
      <div  className="h-1/2">
        <div className="flex flex-wrap scroll-m-10 overflow-scroll">
            {data.current_token_ownerships.map((nft:any) => {
                return <NFT {...nft}/>;
            })}
        </div>
      </div>
    )
}



const NFT = (tk:any) => {

  
  const [image_src, setImageSrc] = useState(tk.current_token_data.metadata_uri);
  

  // useEffect(() => {
  //   getMetadata(tk.current_token_data.metadata_uri).then((metadata:any) => {
  //   let image_src = tk.current_token_data.metadata_uri;
  // if (metadata && metadata.image||"") {
  //   image_src = metadata.image;
  // }
  // setImageSrc(image_src);
  //   });
  // }, [tk.current_token_data.metadata_uri]);


    return (
      
        <div className="p-4 m-2 card-body outline-dashed items-center">
            <p
              className={BASE_TYPES.SEAM_TEXT}
            >{tk.name}</p>
            <div>
            <p
              className={BASE_TYPES.SEAM_TEXT_SECONDARY}
            >{tk.collection_name}</p>
            {/* supply */}
            
</div>
            <a href={tk.current_token_data.metadata_uri} target="_blank">
                <img src={image_src} alt="nft" className="w-32 h-32 rounded-lg m-2"/>
            </a>
            <div className="flex flex-row p-2">
            <p>Q.</p>
            <p
              className={BASE_TYPES.SEAM_TEXT_SECONDARY}
            >{tk.current_collection_data.supply}</p>
            
            </div>

        </div>
    )
    }

const NFTButtons = () => {
    return (
        <div className="flex flex-row">

          </div>
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
