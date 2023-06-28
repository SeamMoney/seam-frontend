import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject } from '@apollo/client';


const apolloClient = new ApolloClient({
    uri: 'https://indexer.mainnet.aptoslabs.com/v1/graphql',
    cache: new InMemoryCache(),
  });

const useGqlClient = (): ApolloClient<any> => {
  

  return apolloClient;
};


const MODULE_QUERY = gql`
    query ModuleTxs($prefix: String!) {
        user_transactions(
            where: { entry_function_id_str: { _like: $prefix } }
            order_by: { timestamp: desc }
        ) {
            entry_function_id_str
            sender
            version
            timestamp
        }
    }
`;



// const useDappQuery = (client: ApolloClient<NormalizedCacheObject> | null, dapp: string) => {
//     const [data, setData] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(true);




const useModuleQuery = (client: ApolloClient<NormalizedCacheObject> | null, prefix: string,) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (client) {
      const query = gql`
        query ModuleTxs($prefix: String!) {
          user_transactions(
            where: { entry_function_id_str: { _like: $prefix }, sender:{_eq: "0x9ee9892d8600ed0bf65173d801ab75204a16ac2c6f190454a3b98f6bcb99d915" }
            order_by: { timestamp: desc }
          ) {
            entry_function_id_str
            sender
            version
            timestamp
          }
        }
      `;

      client
        .query({ query, variables: { prefix } })
        .then((result) => {
          setData(result.data);
          setLoading(false);
          console.log("result:",result.data);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [client, prefix]);
  
  return { data, loading };
};


const useCustomQuery = (client: ApolloClient<NormalizedCacheObject> | null, query: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (client && query) {
      const gqlQuery = gql`${query}`;

      client
        .query({ query: gqlQuery })
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [client, query]);

  return { data, loading };
};


const QUERY_TEMPLATE = `{
    __schema {
      queryType {
        fields	{
          name
          description
        }
      }
    }
  }`;



  const useStakeQuery = () => {
    const query = `
      query StakeQuery {
        current_delegator_balances {
          amount
          delegator_address
          pool_address
          pool_type
          table_handle
        }
      }
    `;
  
    return useCustomQuery(apolloClient, query);
  };
  

export { useGqlClient, useModuleQuery, useCustomQuery,useStakeQuery,QUERY_TEMPLATE };