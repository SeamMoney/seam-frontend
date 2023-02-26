import DappBubble from "components/dapps/DappBubble";
import { dapps } from "data/dapps/dapp_data";
import { useEffect, useState } from "react";
import BubbleSection from "sections/BubbleSection";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import TxnList from "sections/TxnList";
import DappFrame from "./DappFrame";
import { gql } from "@apollo/client";
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
import SwitchView from "sections/SwitchView";



const DappsView = () => {
    let { dappName } = useParams();

    const [selectedDapp, setSelectedDapp] = useState<any>(dappByName(dappName || "home"));
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 3));
    const [home,setHome] = useState<boolean>(true);
    const [txns,setTxs] = useState<any[]>([]);
    const [otherTxns,setOther] = useState<any[]>([]);

    const [dappStack, setDappStack] = useState<any[]>([dappByName(dappName || "home"), ...recentOpen]);
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
        <div className="flex flex-row w-full p-2 relative items-start justify-start ">
                {/* <Draggable>                     */}
                {/* <WindowWrapper> */}
                {/* {home ? (
                            <SplashFrame selectDapp={changeDapp} />)
                            : null} */}
                <div className="px-6 w-full">
                    <div className="w-full items-center justify-center">
                    {home ? (
                            <SplashFrame selectDapp={changeDapp} />)
                            : null}
                        {  selectedDapp?.name ? (
                            <DappFrame dapp={selectedDapp} goHome={()=>setHome(true)} viewUrl={selectedDapp.url} selectDapp={changeDapp} />) : null}
                        
                    </div>
                </div>
                {/* </WindowWrapper> */}

                <SwitchView
                    tab_names={["Txns", "Assets","Stats"]}
                >
                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}
                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}

                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}
                </SwitchView>
                <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
        </div>
    );
}

export default DappsView;