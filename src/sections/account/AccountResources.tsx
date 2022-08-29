import { useEffect, useState } from "react";
// import {getAccountResources } from '@fewcha/web3";
// loads the resources for an account
import Web3 from "@fewcha/web3";
import { MoveResource } from "aptos/dist/generated";
import { Types } from "aptos";
import { format_large_number, shortenAddress } from "hooks/formatting";

const web3 = new Web3();
const AccountResources = ({ address }: { address: string }) => {
    const [resources, setResources] = useState<MoveResource[]>([]);
    useEffect(() => {
        web3.action.sdk.getAccountResources(address).then((res) => {
            if (res.status === 200) {
                // res.data
                setResources(res.data);
            }
        });
        // web3.action.sdk.
    }, [address]
    );
    return (
        <div>
            <h1>Account Resources</h1>
            <div className="modScroll p-2 flex flex-col">
                {resources && resources.length != 0 ? (ResourceList(resources)) : <p>no resources</p>}
            </div>
            <p>

            </p>
        </div>
    );
}

const ResourceList = (resources: MoveResource[]) => {
    return resources.map((resource: MoveResource) => Resource(resource))
}

const Resource = (resource: MoveResource) => {
    console.log("Account resource",resource);
    if (resource.type == "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>") {

        return CoinStore(resource.data);
    }

    return (
        <div className="p-2 m-2 outline outline-2 ">
            <p>{resource.type}</p>
            {/* <p>{resource.data}</p> */}
        </div>
    )
}

const CoinStore = (coins: any) => {



    return (<div className="flex flex-col p-3 m-3 rounded-lg text-left items-start justify-start">
        <div className="outline rounded-lg w-full p-2 m-1">
            <p className="text-4xl font-bold">{format_large_number(coins.coin?.value)}</p>
            <p className="text text-sm opacity-70">Aptos Tokens</p>
        </div>
        <div className="flex flex-row justify-start gap gap-4">

            <div className="user-stat">
                <p className="stat-val"> {coins.deposit_events.counter || 0} </p>
                <p> deposits </p>
            </div>
            <div className="user-stat">
                <p className="stat-val"> {coins.withdraw_events.counter || 0} </p>
                <p> withdrawls </p>
            </div>
        </div>
        {/* <UserNfts {...user.nfts} /> */}
        {/* <input className=" m-3 bg-opacity-30 outline outline-white outline-2 text-black" type="text" value={sendAddr} onChange={(e) => setSendAddr(e.target.value)} /> */}
        {/* <button className="seam-button m-3" onClick={() => sendTransaction(sendAddr)}>Send coins:</button> */}
    </div>);
}

export default AccountResources;