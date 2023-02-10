import DappBubble from "components/dapps/DappBubble";
import { dapps } from "data/dapps/dapp_data";
import { useEffect, useState } from "react";
import BubbleSection from "sections/BubbleSection";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import TxnList from "sections/TxnList";
import DappFrame from "./DappFrame";
import Icons from "components/Icons";
import DappLogo from "./DappLogo";
import DappBadge from "components/DappBadge";
import ReactTooltip from "react-tooltip";
import Draggable from 'react-draggable';
import { dappByName, dappsByAddress, shuffle } from "util/dappUtils";
// import {shuffle} from 'util
import { DappContextProvider, useDappContext } from "./DappContext";
import { Outlet, useParams } from "react-router-dom";
import WindowWrapper from "components/etc/WindowWrapper";
import SplashFrame from "./SplashFrame";
import { gql } from "@apollo/client";


const GET_NFTS = gql`
    query CurrentTokens($owner_address: String, $offset: Int) {
  current_token_datas(
    where: {owner_address: {_eq: $owner_address}, amount: {_gt: "0"}}
    order_by: {last_transaction_version: desc}
    offset: $offset
  ) {
    token_data_id_hash
    name
    collection_name
    property_version
  }
}`;


const GET_TX_WITH_DAPP = gql`
    query MyQuery($owner_address: String, $offset: Int) {
    user_transactions(
      where: {entry_function_id_str: {_eq: "0x1::"}, sender: {_eq: "user"}}
    )
  }`;

const DappsView = () => {
    let { dappName } = useParams();

    const [selectedDapp, setSelectedDapp] = useState<any>(dappByName(dappName || "home"));
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 3));
    const [home,setHome] = useState<boolean>(true);
    const [txns,setTxs] = useState<any[]>([]);
    const [otherTxns,setOther] = useState<any[]>([]);

    const [dappStack, setDappStack] = useState<any[]>(recentOpen);
    // const { isHome, selectDapp, toggleHome } = useDappContext()

    const pushDapp = (curr: any) => {
        const newStack = [curr, ...dappStack]
        setDappStack(newStack);
    }

    // const lendFunctions = [
    //     {

    // ];

    const loadOthers = async (dappaddress: string) => {
      const alike = `%${dappaddress}%`;
      const q = gql`
      query CurrentTxs($owner_address: String, $offset: Int) {
    user_transactions(
      where: {entry_function_id_str: {_like: alike}, sender: {_eq: "user"}}
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
    };

    const changeDapp = (dapp: any) => {
        setHome(false);
        setSelectedDapp(dapp);
        loadTxs(dapp.address, dapp.client).then((res) => {
            setTxs(res);
        }
        );


    }



    return (
        <div className="flex flex-col w-full p-6 relative items-start justify-start ">
                {/* <Draggable>                     */}
                {/* <WindowWrapper> */}
                <div className="px-6 w-full">
                    <div className="w-full items-center justify-center">
                        {  selectedDapp?.name ? (
                            <DappFrame dapp={selectedDapp} goHome={()=>setHome(true)} viewUrl={selectedDapp.url} selectDapp={changeDapp} />) : null}
                        {home ? (
                            <SplashFrame selectDapp={changeDapp} />)
                            : null}
                    </div>
                </div>
                {/* </WindowWrapper> */}
                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}
                <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
        </div>
    );
}

export default DappsView;