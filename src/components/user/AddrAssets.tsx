import { motion } from "framer-motion";
import tokensJson from "../../defaultList.mainnet.json";
import { gql, useQuery } from "@apollo/client";
import { useClient } from "hooks/useAptos";
const lookup_coin = (
  owner_address: string,
  coin_type: string,
  amount: number,
  last_transaction_timestamp: number
) => {
  const balance = (amount / 100000000).toFixed(3);
  
  const symbol = get_symbol(coin_type);
  const image = tokensJson.find(
    (token: any) => token.symbol === symbol
  )?.logo_url;
  return { n: balance, symbol, image };
};

const get_symbol = (coin_type: string):string => {
  const addr = coin_type.split("::")[0];
  const sym = tokensJson.find((token: any) => token.token_type.account_address === addr)?.symbol;
  if (sym === undefined) {
      return (coin_type.split("::")[1]).split("::")[0];
  }
  return sym;
}


const UserBalance =(balance:any) => {
  const {n, symbol, image} = lookup_coin(balance.owner_address, balance.coin_type, balance.amount, balance.last_transaction_timestamp);
  const sym = symbol.split("")[0];
  return (
      <motion.div className="listing" whileHover={{ scale: 1.05, y: 8 }}>
          <div className="p-4 m-2 card-body outline-dashed ou">
      <div className="bg-black m-2 p-2 text-white opacity-100 flex flex-col items-center w-20 justify-center">
          <img src={image} className="w-6 h-6" />
          <p>{symbol}</p>
          <p className="text-lg font-bold">{n}</p>
          </div>
          </div>
      </motion.div>
  )
}

const UserBalances = (bs:any[]) => {
  return (
      <div className="flex flex-wrap w-1/2">
          {bs.filter((b:any) => b.amount > 0).
              map((balance:any) => {
              return (
                  <UserBalance {...balance} />
              )
          })}
      </div>
  )
}
const GET_TOKENS = gql`
  query current_balances($owner_address: String!, $offset: Int!) {
    current_coin_balances(
      where: {
        owner_address: {
          _eq: $owner_address
        }
      }
      order_by: { last_transaction_version: desc }
      offset: $offset
    ) {
      coin_type
      amount
      last_transaction_timestamp
    }
  }
  # args:
`;


const AddrAssets = (address:string)=>{
  const client = useClient();
  const { loading, error, data } = useQuery(GET_TOKENS,
    {variables: { owner_address: address||"0x1", offset: 0 },
});
return (<div>
        <p>Balances</p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : UserBalances(data.current_coin_balances)}
            
            
        </div>

        {/* {error ? <p>{error.toString()}</p> : <p>Loaded</p>} */}
      </div>
)}

export default AddrAssets