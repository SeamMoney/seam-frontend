import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import AceEditor from "react-ace";
import { Configuration, OpenAIApi } from "openai";
import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-monokai";
// import { useClient } from "@apollo/react-hooks";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  
const client = new ApolloClient({
  uri: "https://indexer.mainnet.aptoslabs.com/v1/graphql",
  cache: new InMemoryCache(),
});

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


  

  async function generateQuery(schema:string, naturalLanguage:string) {
    // Call OpenAI's completions API to generate the query
    // Make sure to replace 'your-openai-api-key' with your actual API key
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Given the GraphQL schema:\n${schema}\nGenerate a query based on the following natural language description:\n${naturalLanguage}`,
    },
      {
        timeout: 10000,
      }
    );
  
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0];
    } else {
      return 'error';
    }
  }

function QueryRunner() {
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
    useEffect(() => {
        const q = useQuery(gql(QUERY_TEMPLATE), {
            client,
            }).then((data) => {
                setSchema(data);
            });
    }, []);


    const handleGenerateQuery =  () => {
        const schema = useQuery(gql(QUERY_TEMPLATE), {
            client,
            });
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