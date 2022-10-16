import TxnList from "./TxnList";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { loadAccount } from "hooks/loadAptos";
import { sendTransaction, useClient } from "hooks/useAptos";
import ResourceDetailView from "views/ResourceDetailView";


const UserExplorer = () => {
    const { account, isConnected } = useWeb3();
    const client = useClient();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    const [sendAddr, setSendAddr] = useState<string>("");
    useEffect(() => {
        if (isConnected && account) {
            loadAccount(account.address, client);
            loadTxs(account.address, client).then((res) => {
                setTxs(res)
                console.log("just loaded ", res);
            }
            );
        }
    }
        , [account]);

    return (
        <div className="w-full h-screen mx-6">
            <p className="text-3xl font-semibold">User Explorer</p>
            
            <div className='flex flex-row w-full items-start justify-center'>
                {/* <UserOverview  /> */}
                {account?.address ?
                
                <TxnList txns={txs} address={account?.address} />
                : <p>please connect</p>}
                {account?.address?.toString() ? (<ResourceDetailView showDetails={false} address={account?.address.toString()} />) : <p>no resources</p>}
                
                {/* <WagMemeContainer /> */}
            </div>
        </div>
    );
}

export default UserExplorer;