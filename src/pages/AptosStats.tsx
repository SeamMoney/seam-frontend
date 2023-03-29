import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import AceEditor from "react-ace";
import { Configuration, OpenAIApi } from "openai";
import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-monokai";
import { useClient } from "hooks/useAptos";
import { useGqlClient,QUERY_TEMPLATE, } from "hooks/useGql";





function QueryRunner() {
  const client = useGqlClient();
  const [indexer, setIndexer] = useState("");
//   const client= useClient()
  const [query, setQuery] = useState(QUERY_TEMPLATE);
  const [schema, setSchema] = useState(null);
  const { loading, error, data } = useQuery(gql(query), {
    client,
    variables: { indexer },
  });

  const handleRunQuery = () => {
    // Add any logic you want to execute before running the query
  };

  return (
    <div>
      <label>
        Indexer:
        <input
          type="text"
          value={indexer}
          onChange={(e) => setIndexer(e.target.value)}
        />
      </label>
      <AceEditor
        mode="graphqlschema"
        theme="monokai"
        value={query}
        onChange={setQuery}
        name="query-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="200px"
      />
      <button onClick={handleRunQuery}>Run Query</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

const AptosStats = () => {

    const [naturalLanguage, setNaturalLanguage] = useState('');
    const [schema, setSchema] = useState(null);
    
    const handleGenerateQuery =  () => {
        
        }
    return (
        <div className="h-screen items-center">
      <div className="flex-1 p-4">
        <h1>GraphQL Query Generator</h1>
        <textarea
          className="w-full h-48"
          value={naturalLanguage}
          onChange={(e) => setNaturalLanguage(e.target.value)}
          placeholder="Enter your natural language description here"
        />
        <button className="mt-4" onClick={handleGenerateQuery}>
          <i className="fas fa-sync-alt"></i> Generate Query
        </button>
      </div>
      <QueryRunner />
        </div>
    )
}

export default AptosStats