import { dapps } from "data/dapps/dapp_data";
import { shortenAddress } from "hooks/formatting";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";
import { useDappContext } from "./DappContext";


interface sDapp {
    dapp: any;
    setSelectedDapp: (dapp: any) => void;
    isSelected?: boolean;
    key: string;
}

interface SplashProps{
    selectDapp : (dapp:any)=>void;
}

const DappBadge = ({ dapp, setSelectedDapp, isSelected, key }: sDapp) => {
    return (
                <button onClick={() => setSelectedDapp(dapp)}>
            
                <button onClick={() => setSelectedDapp(dapp)}
                    className={`w-full w-60 seam-button  items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + '-ui'}>
                  
                    <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-bold text-right">{dapp.name}</p>
                {DappLogo(dapp.image)}
            </div>
            
            {/* <Link to={`/explorer/dapps/${dapp.name}`}>
                    className={`w-full seam-button  items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + '-ui'}>
                    Open Dapp
            </Link> */}

        </div>
                </button>);
}

const SplashFrame = ({selectDapp}:SplashProps) => {
    // const { dapp, selectDapp } = useDappContext();
    return (
        <div className="w-1/4 h-100 items-center justify-center">
            <div className="mockup-window bg-black border-pink rounded-xl mockup-window-outline border-4 shadow-xl  shadow-blue  w-full pt-2 m-3">

                <div className="flex flex-wrap w-full  items-center justify-start">
                    {/* <Draggable> */}
                    {dapps.map((dapp1, i) => {
                        
                        return (
                            <div className="bg-black">
                                <DappBadge key={"dapp" + i.toString()} dapp={dapp1} setSelectedDapp={selectDapp
                        } />
                            </div>)

                    })}
                </div>
            </div>
        </div>
    )
}
export default SplashFrame;


