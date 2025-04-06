import React from 'react';
import { GraphiQLProvider, QueryEditor } from '@graphiql/react';
import Editor from '@monaco-editor/react';
import { buildSchema } from 'graphql';

interface GraphQLEditorProps {
  schema: string;
  query: string;
  onQueryChange: (query: string) => void;
}

export const EnhancedGraphQLEditor: React.FC<GraphQLEditorProps> = ({
  schema,
  query,
  onQueryChange,
}) => {
  const graphqlSchema = buildSchema(schema);

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="graphql"
        value={query}
        onChange={(value) => onQueryChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}; 