import WindowWrapper from "components/etc/WindowWrapper";
import Icons from "components/Icons";
import { useRef, useState } from "react";
import { FaArrowCircleUp, FaBackward, FaForward, FaGithub, FaHome, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { dappByName } from "util/dappUtils";
import DappLogo from "./DappLogo";

interface DappFrameProps {
    dapp: Dapp;
    viewUrl: string;
    selectDapp: (dapp: Dapp) => void;
    goHome: () => void;

}







const DappHeader = (dapp: Dapp) => {
    return (<div className="flex flex-row gap gap-2  items-center text-baseline px-4">
        <p className="text-2xl ">{dapp?.name}</p>
        {DappLogo(dapp?.image || "dapp.png")}
    </div>);
}


const DappFrame = ({ dapp, viewUrl, selectDapp, goHome }: DappFrameProps) => {
    const [currentUrl, setCurrentUrl] = useState(viewUrl);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [urlHistory, setUrlHistory] = useState([viewUrl]);
    let dapp_data = dappByName(dapp.name || "") as Dapp;
    const iframeRef = useRef(null);

    const handleIFrameLoad = () => {
        // Check if the new URL is different from the last one in the history
        console.log("BEGIN LOAD");
        if(iframeRef!==null && iframeRef.current){
        if (urlHistory[historyIndex] !== iframeRef.current) {
            const newUrl = iframeRef.current
    
            // Add the new URL to the history and update the historyIndex
            setUrlHistory([...urlHistory.slice(0, historyIndex + 1), newUrl]);
            setHistoryIndex(historyIndex + 1);
    
            // Update the current URL
            setCurrentUrl(newUrl);
        }
    }
    };

    const handleNavigation = (offset: number) => {
        let newIndex = historyIndex + offset;
        newIndex = Math.max(0, Math.min(urlHistory.length - 1, newIndex));
        setCurrentUrl(urlHistory[newIndex]);
        setHistoryIndex(newIndex);
    };

    return (
        <div className="w-full ">
            <WindowWrapper>
                {DappHeader(dapp_data)}
                {DappNav(dapp_data, selectDapp, goHome, currentUrl, setCurrentUrl, handleNavigation,historyIndex,urlHistory)}
                {renderIDapp(currentUrl,handleIFrameLoad)}
            </WindowWrapper>
        </div>
    );


    function renderIDapp(url:string,onLoad:any) {
        return (<iframe className="scrollbar rounded-xl  scrollbar-thumb-pink scrollbar-track-blue"
        width={'100%'}
        height={'600px'}
        ref={iframeRef}
        onLoad={onLoad}
        title="host" src={url} />)
        
    }
};

export default DappFrame;


const DappNav = (
    dapp: Dapp,
    selectDapp: (dapp: Dapp) => void,
    goHome: () => void,
    currentUrl: string,
    setCurrentUrl: (url: string) => void,
    handleNavigation: (offset: number) => void,
    historyIndex:number,
    urlHistory:any
) => {
    return (
        <div className="flex flex-row items-start justify-center px-3">
            {/* BACK ARROW */}
            <button
                className="seam-sqr"
                data-tip="Back"
                onClick={() => handleNavigation(-1)}
                disabled={historyIndex <= 0}
            >
                <FaBackward />
            </button>

            {/* FORWARD ARROW */}
            <button
                className="seam-sqr"
                data-tip="Forward"
                onClick={() => handleNavigation(1)}
                disabled={historyIndex >= urlHistory.length - 1}
            >
                <FaForward />
            </button>

            {/* URL bar */}
            <input
                className="border rounded p-2 mx-2 bg-black seam-outline text-white"
                type="text"
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                style={{ flexGrow: 1 }}
            />

            {/* Home Icon button */}
            <Link to="/explorer/dapps/home">
                <button className="seam-sqr" data-tip="Home" onClick={() => goHome()}>
                    <FaHome />
                </button>
            </Link>

            {/* REFRESH button */}
            <button
                className="seam-sqr"
                data-tip="Refresh"
                onClick={() => setCurrentUrl(currentUrl)}
            >
                <FaArrowCircleUp />
            </button>

            <ReactTooltip place="top" textColor="white" multiline={true} />
        </div>
    );
};