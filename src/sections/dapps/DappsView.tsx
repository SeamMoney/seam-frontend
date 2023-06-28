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
import { DappContextProvider, useDappContext } from "./DappContext";
import { Outlet, useParams } from "react-router-dom";
import WindowWrapper from "components/etc/WindowWrapper";
import SplashFrame from "./SplashFrame";
import SwitchView from "sections/SwitchView";
import DappTwitter from "./DappTwitter";
import ReactSelect from "react-select";



const DappsView = () => {
    let { dappName } = useParams();

    const [selectedDapp, setSelectedDapp] = useState<any>(dappByName(dappName || "home"));
    const [recentOpen, setRecentOpen] = useState<any[]>(dapps.slice(0, 4));
    const [home,setHome] = useState<boolean>(true);
    const [txns,setTxs] = useState<any[]>([]);
    const [otherTxns,setOther] = useState<any[]>([]);

    const [dappStack, setDappStack] = useState<any[]>([dappByName("Topaz"), ...recentOpen]);
    // const { isHome, selectDapp, toggleHome } = useDappContext()

    const pushDapp = (curr: any) => {
        if(dappStack.includes(curr)) {
            const newStack = dappStack.filter((dapp) => dapp !== curr);
            setDappStack(newStack);
            return
        }
        const newStack = [curr, ...dappStack]
        setDappStack(newStack);
        setRecentOpen(newStack.slice(0,4));
    }


    const changeDapp = (dapp: any) => {
        setHome(true);
        
        setSelectedDapp(dapp);
        pushDapp(dapp);
        loadTxs(dapp.address, dapp.client).then((res) => {
            setTxs(res);
            setHome(false);
            
        }).catch((err) => {
            setHome(false);
        })
        
        
    }

    

    return (
        <div className="w-screen p-4">
<ReactSelect
  className="w-3/4  bg-black text-black seam-outline"
  options={dapps.map((dapp) => ({
    value: dapp.name,
    label: (
      <div className="flex items-center text-black">
        <img src={`/dapps/${dapp.image}`} alt={dapp.name} className="w-8 h-8 mr-2" />
        {dapp.name}
      </div>
    ),
  }))}
  onChange={(name: any) => changeDapp(dappByName(name.value))}
  placeholder="Search for a Dapp..."
//   getOptionLabel={(option) => option.name}
//   getOptionValue={(option) => option.value}
/>
        <div className="flex flex-wrap w-full p-2 relative items-start justify-start ">
            <div className="flex flex-row">
          {dappStack.map((dapp, index) => (
            <button  className="seam-button" key={index} onClick={() => changeDapp(dapp)}>
            <div className="flex flex-row items-center">
                {DappLogo(dapp.image)}
                <p className="text-bold text-center">
              {dapp.name}
              </p>
            </div>  


            </button>
          ))}

</div>
            </div>
                <div className="px-3 w-full">
                    <div className="w-full items-center justify-center">
                    {home ? (
                            <SplashFrame selectDapp={changeDapp} />)
                            : null}
                        {  selectedDapp?.name && !home ? (
                            <DappFrame dapp={selectedDapp} goHome={()=>setHome(true)} viewUrl={selectedDapp.url} selectDapp={changeDapp} />) : null}
                        
                    </div>
                </div>
                <SwitchView
                    tab_names={["Txns", "Twitter","Stats"]}
                >
                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}
                {selectedDapp?.twitter ? <DappTwitter username={selectedDapp?.twitter} />  : null}

                {txns?.length !== 0 ? <TxnList txns={txns || []} address={selectedDapp.address} /> : null}
                </SwitchView>
                <ReactTooltip place="top" textColor="white" html={true} multiline={true} />
        </div>
    );
}

export default DappsView;