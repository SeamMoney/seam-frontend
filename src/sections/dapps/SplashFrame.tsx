import { dapps } from "data/dapps/dapp_data";
import { shortenAddress } from "hooks/formatting";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import DappLogo from "sections/dapps/DappLogo";
import { useDappContext } from "./DappContext";
import { useState } from "react";


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
            
                <button onClick={() => setSelectedDapp(dapp)}
                    className={`w-full w-60 seam-button  items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + '-ui'}>
                  
                    <div className="flex flex-wraps justify-between items-center">
                <p className="text-lg font-bold text-right">{dapp.name}</p>
                {DappLogo(dapp.image)}
            </div>
            
            {/* <Link to={`/explorer/dapps/${dapp.name}`}>
                    className={`w-full seam-button  items-center justify-center  ${isSelected ? 'bg-white bg-opacity-100 text-black' : ''}`} key={dapp.name + '-ui'}>
                    Open Dapp
            </Link> */}

                </button>);
}

const SplashFrame = ({selectDapp}:SplashProps) => {
    // const { dapp, selectDapp } = useDappContext();

    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const toggleFilter = (tag:any) => {
      setActiveFilters((prevFilters) =>
        prevFilters.includes(tag)
          ? prevFilters.filter((filter) => filter !== tag)
          : [...prevFilters, tag]
      );
    };
  
    const isDappVisible = (dapp:any) => {
      if (activeFilters.length === 0) return true;
      return dapp.tags.some((tag:any) => activeFilters.includes(tag));
    };
  

    return (
        <div className="w-full items-center  justify-center">
           
            <div className="mockup-window bg-black border-pink flex flex-row rounded-xl mockup-window-outline border-4 shadow-xl  shadow-blue  w-full pt-2 m-3">

            <div className="flex flex-wrap w-full  items-center overflow-scroll-y scroll-smooth justify-start">
          {dapps
            .filter((dapp) => isDappVisible(dapp))
            .map((dapp1, i) => {
              return (
                <DappBadge
                  key={"dapp" + i.toString()}
                  dapp={dapp1}
                  setSelectedDapp={selectDapp}
                />
              );
            })}
        </div>
        <div
  className="flex flex-col w-1/8 h-full items-start justify-start  overflow-y-auto"
  style={{ maxHeight: '200px' }} // Set a fixed height for the container
>
  {/* Add filters */}
  {Array.from(new Set(dapps.flatMap((dapp) => dapp.tags))).map((tag, i) => (
    <button
      key={"filter" + i}
      className={`border-2 px-2 py-1 m-1 rounded-xl ${
        activeFilters.includes(tag) ? 'border-blue' : 'border-gray'
      }`}
      onClick={() => toggleFilter(tag)}
    >
      {tag}
    </button>
  ))}
</div>
            </div>
        </div>
    )
}
export default SplashFrame;


