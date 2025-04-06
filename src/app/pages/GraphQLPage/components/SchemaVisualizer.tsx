import React from 'react';
import { buildSchema, GraphQLSchema } from 'graphql';

interface SchemaVisualizerProps {
  schema: string;
}

export const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({ schema }) => {
  const graphqlSchema = buildSchema(schema);
  
  return (
    <div className="h-[600px] border rounded-lg p-4 overflow-auto">
      <pre className="text-sm">
        {schema}
      </pre>
    </div>
  );
}; 