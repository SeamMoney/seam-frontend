import Spline from '@splinetool/react-spline';
import TxnList from "./TxnList";
import { useWeb3 } from '@fewcha/web3-react';
import { useEffect, useState } from "react";
import { Types } from "aptos";
import { loadTxs } from "hooks/useTransaction";
import { loadAccount } from "hooks/loadAptos";
import { sendTransaction, useClient } from "hooks/useAptos";
import ResourceDetailView from "views/ResourceDetailView";
import UserOverview from "./UserOverview";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

export const PINATA_GATEWAY = "moccasin-eligible-jellyfish-850.mypinata.cloud/ipfs/";
export const collectionCoverUrl = PINATA_GATEWAY + "QmQxtKuCfrbkuFCc1jjDQzTGdPFYiRuBGj8TWxvRGeVPLd";

const UserExplorer = () => {
    const { account, connected } = useWallet();
    const client = useClient();
    const [txs, setTxs] = useState<Types.Transaction[]>([]);
    useEffect(() => {
        if (connected && account != null) {
            loadAccount(account.address?.toString() || "", client);
            loadTxs(account.address?.toString() || "", client).then((res) => {
                setTxs(res)
                console.log("just loaded ", res);
            }
            );
        }
    }
        , [account]);

    return (
        <div className="mx-2 w-full justify-center p-2">
            <p className="text-3xl font-semibold">User Explorer</p>
            
            <div className='flex flex-row m-3 items-start justify-start'>
                {account?.address ?
                    <div className='flex flex-col '>
                        <UserOverview {...account} />

                    <TxnList txns={txs} address={account?.address.toString()} />
                    </div>
                    : <p>please connect</p>}
                {account?.address?.toString() ? (
                <div className='w-1/2 p-2'>
                    <ResourceDetailView showDetails={true} showUnder={true} address={account?.address.toString()} />
                </div>)
                 : <p>no resources</p>
                 }

            </div>
        </div>
    );
}


export default UserExplorer;