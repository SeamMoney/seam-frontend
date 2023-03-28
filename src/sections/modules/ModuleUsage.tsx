import React from 'react';
import { useGqlClient, useModuleQuery } from 'hooks/useGql'; // Make sure to adjust the path to the location of the useQueries.ts file
import { gql } from '@apollo/client';
import { aptosTxnLink } from 'hooks/useExplorer';

interface ModuleUsageProps {
  address: string;
  module: string;
  func: string;
}

const ModuleUsage: React.FC<ModuleUsageProps> = ({ address, module, func }) => {
  const entryFunctionIdStr = `${address}::${module}::${func}%`;
  const client = useGqlClient();
  const { data,loading } = useModuleQuery(client,entryFunctionIdStr);

  if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

  const transactions = data.user_transactions;

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Entry Function ID</th>
            <th>Sender</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn: any, index: number) => (
            <tr key={index}>
              <td>{txn.entry_function_id_str}</td>
              <td>{txn.sender}</td>
              <td>
                <a href={aptosTxnLink(txn.version)}>
                {txn.version}
                </a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleUsage;