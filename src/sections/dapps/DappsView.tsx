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
import { dappsByAddress, shuffle } from "util/dappUtils";
// import {shuffle} from 'util
import { DappContextProvider } from "./DappContext";
import { Outlet } from "react-router-dom";



const DappsView = () => {

    const [selectedDapp, setSelectedDapp] = useState<any>(dapps[5]);
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 3));
    const [orderedDapps, setOrderedDapps] = useState<any[]>(shuffle(dapps));
    const [txns, setTxns] = useState<Types.Transaction[] | null>(null);

    const [dappStack, setDappStack] = useState<any[]>([]);

    const pushDapp = (curr: any) => {
        const newStack = [curr, ...dappStack]
        setDappStack(newStack);
    }

    return (
        <div className="flex flex-col w-full p-6 relative items-start justify-start ">
                <DappContextProvider value={{dapp:null,isHome:true}}>
            <div className="px-6 w-full">
                <Outlet/>
            </div>
            {txns?.length!==0 ? <TxnList txns={txns||[]} address={selectedDapp.address}/> : null}
            <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
                </DappContextProvider>
        </div>
    );
}

export default DappsView;