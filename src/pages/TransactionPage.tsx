// create a page with a search bar for transaction hash and show the transaction details

import { Types } from "aptos";
import { useClient } from "hooks/useAptos";
import { useState } from "react";
import {useGetTransaction} from "../hooks/useTransaction";

const TransactionPage = () => {
    const [id, setId] = useState("0xea09b200b30411d5fa97716719ca2f3899b7d971ab4ed7868a38354aa4aa1532");
    const [tx, setTx] = useState<Types.Transaction | undefined>(undefined);
    const client = useClient();
    const resolveTx = async () => {
        const tx = await client.getTransactionByHash(id);
        if(tx){
        setTx(tx)};
    }

    const IdInput = () => {
        return (
            <div>
                <input type="text" placeholder="Transaction ID" 
                onChange={(event) => setId(event.target.value)} 
                />
                <button onClick={() => resolveTx()}>Search</button>

            </div>
        )
    }

    const Transaction = () => {
        return (
            <div>
                <p>Transaction ID: {tx?.hash}</p>
                <p>Sender: {tx?.type}</p>
            </div>
                )
        }


    return(
        <div>
            <IdInput />
            <Transaction/>
            </div>
    );
}

export default TransactionPage;