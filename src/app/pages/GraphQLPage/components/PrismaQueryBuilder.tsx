import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { ChevronDown, ChevronRight, Plus, Trash2, Code } from 'lucide-react';

interface PrismaQueryBuilderProps {
  model: string;
  initialValue?: any;
  onChange: (value: any) => void;
}

interface Field {
  name: string;
  type: string;
  isRelation?: boolean;
}

// Mock schema info - in real app, this would come from your API
const mockModelFields: Record<string, Field[]> = {
  Post: [
    { name: 'id', type: 'ID' },
    { name: 'title', type: 'String' },
    { name: 'content', type: 'String' },
    { name: 'author', type: 'User', isRelation: true },
    { name: 'comments', type: 'Comment[]', isRelation: true },
  ],
  User: [
    { name: 'id', type: 'ID' },
    { name: 'name', type: 'String' },
    { name: 'email', type: 'String' },
    { name: 'posts', type: 'Post[]', isRelation: true },
  ],
};

export const PrismaQueryBuilder: React.FC<PrismaQueryBuilderProps> = ({
  model,
  initialValue,
  onChange,
}) => {
  const [queryData, setQueryData] = useState({
    method: initialValue?.method || 'findMany',
    select: initialValue?.select || {},
    include: initialValue?.include || {},
    where: initialValue?.where || {},
    orderBy: initialValue?.orderBy || [],
    take: initialValue?.take || 10,
    skip: initialValue?.skip || 0,
  });

  const [expandedSections, setExpandedSections] = useState({
    select: true,
    include: false,
    where: false,
    orderBy: false,
    pagination: false,
  });

  const [showCode, setShowCode] = useState(false);

  const modelFields = mockModelFields[model] || [];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMethodChange = (method: string) => {
    setQueryData(prev => ({ ...prev, method }));
  };

  const handleSelectToggle = (field: string) => {
    setQueryData(prev => ({
      ...prev,
      select: {
        ...prev.select,
        [field]: !prev.select[field],
      },
    }));
  };

  const handleIncludeToggle = (relation: string) => {
    setQueryData(prev => ({
      ...prev,
      include: {
        ...prev.include,
        [relation]: !prev.include[relation],
      },
    }));
  };

  const addWhereCondition = (field: string) => {
    setQueryData(prev => ({
      ...prev,
      where: {
        ...prev.where,
        [field]: { equals: '' },
      },
    }));
  };

  const updateWhereCondition = (field: string, operator: string, value: string) => {
    setQueryData(prev => ({
      ...prev,
      where: {
        ...prev.where,
        [field]: { [operator]: value },
      },
    }));
  };

  const addOrderBy = () => {
    setQueryData(prev => ({
      ...prev,
      orderBy: [...prev.orderBy, { field: modelFields[0]?.name || '', direction: 'asc' }],
    }));
  };

  const updateOrderBy = (index: number, field: string, direction: 'asc' | 'desc') => {
    setQueryData(prev => {
      const newOrderBy = [...prev.orderBy];
      newOrderBy[index] = { field, direction };
      return { ...prev, orderBy: newOrderBy };
    });
  };

  const removeOrderBy = (index: number) => {
    setQueryData(prev => ({
      ...prev,
      orderBy: prev.orderBy.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    onChange(queryData);
  }, [queryData, onChange]);

  const generatePrismaCode = () => {
    const parts = [`prisma.${model.toLowerCase()}.${queryData.method}(`];
    const options: string[] = [];
    
    if (Object.keys(queryData.select).length > 0) {
      options.push(`  select: ${JSON.stringify(queryData.select, null, 2)}`);
    }

    if (Object.keys(queryData.include).length > 0) {
      options.push(`  include: ${JSON.stringify(queryData.include, null, 2)}`);
    }

    if (Object.keys(queryData.where).length > 0) {
      options.push(`  where: ${JSON.stringify(queryData.where, null, 2)}`);
    }

    if (queryData.orderBy.length > 0) {
      options.push(`  orderBy: ${JSON.stringify(queryData.orderBy, null, 2)}`);
    }

    if (queryData.take) options.push(`  take: ${queryData.take}`);
    if (queryData.skip) options.push(`  skip: ${queryData.skip}`);

    return `${parts.join('\n')}{\n${options.join(',\n')}\n})`;
  };

  return (
    <div className="space-y-4 bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={queryData.method}
            onChange={(e) => handleMethodChange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="findMany">findMany</option>
            <option value="findUnique">findUnique</option>
            <option value="findFirst">findFirst</option>
            <option value="create">create</option>
            <option value="update">update</option>
            <option value="delete">delete</option>
          </select>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <Code className="w-4 h-4 mr-2" />
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Select Fields Section */}
          <div className="border rounded-md">
            <button
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('select')}
            >
              <span className="font-medium">Select Fields</span>
              {expandedSections.select ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.select && (
              <div className="p-4 space-y-2">
                {modelFields
                  .filter(field => !field.isRelation)
                  .map(field => (
                    <label key={field.name} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={queryData.select[field.name] || false}
                        onChange={() => handleSelectToggle(field.name)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span>{field.name}</span>
                      <span className="text-xs text-gray-500">({field.type})</span>
                    </label>
                  ))}
              </div>
            )}
          </div>

          {/* Include Relations Section */}
          <div className="border rounded-md">
            <button
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('include')}
            >
              <span className="font-medium">Include Relations</span>
              {expandedSections.include ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.include && (
              <div className="p-4 space-y-2">
                {modelFields
                  .filter(field => field.isRelation)
                  .map(field => (
                    <label key={field.name} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={queryData.include[field.name] || false}
                        onChange={() => handleIncludeToggle(field.name)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span>{field.name}</span>
                      <span className="text-xs text-gray-500">({field.type})</span>
                    </label>
                  ))}
              </div>
            )}
          </div>

          {/* Where Conditions Section */}
          <div className="border rounded-md">
            <button
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('where')}
            >
              <span className="font-medium">Where Conditions</span>
              {expandedSections.where ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.where && (
              <div className="p-4 space-y-4">
                {Object.entries(queryData.where).map(([field, condition]: [string, any]) => (
                  <div key={field} className="flex items-center space-x-2">
                    <select
                      value={field}
                      onChange={(e) => {
                        const newField = e.target.value;
                        const { [field]: _, ...rest } = queryData.where;
                        setQueryData(prev => ({
                          ...prev,
                          where: { ...rest, [newField]: condition },
                        }));
                      }}
                      className="rounded-md border-gray-300"
                    >
                      {modelFields.map(f => (
                        <option key={f.name} value={f.name}>{f.name}</option>
                      ))}
                    </select>
                    <select
                      value={Object.keys(condition)[0]}
                      onChange={(e) => updateWhereCondition(field, e.target.value, condition[Object.keys(condition)[0]])}
                      className="rounded-md border-gray-300"
                    >
                      <option value="equals">equals</option>
                      <option value="not">not equals</option>
                      <option value="in">in</option>
                      <option value="notIn">not in</option>
                      <option value="lt">less than</option>
                      <option value="gt">greater than</option>
                      <option value="contains">contains</option>
                    </select>
                    <input
                      type="text"
                      value={condition[Object.keys(condition)[0]]}
                      onChange={(e) => updateWhereCondition(field, Object.keys(condition)[0], e.target.value)}
                      className="flex-1 rounded-md border-gray-300"
                    />
                    <button
                      onClick={() => {
                        const { [field]: _, ...rest } = queryData.where;
                        setQueryData(prev => ({ ...prev, where: rest }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addWhereCondition(modelFields[0]?.name || '')}
                  className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Condition
                </button>
              </div>
            )}
          </div>

          {/* Order By Section */}
          <div className="border rounded-md">
            <button
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('orderBy')}
            >
              <span className="font-medium">Order By</span>
              {expandedSections.orderBy ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.orderBy && (
              <div className="p-4 space-y-4">
                {queryData.orderBy.map((order: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <select
                      value={order.field}
                      onChange={(e) => updateOrderBy(index, e.target.value, order.direction)}
                      className="rounded-md border-gray-300"
                    >
                      {modelFields.map(field => (
                        <option key={field.name} value={field.name}>{field.name}</option>
                      ))}
                    </select>
                    <select
                      value={order.direction}
                      onChange={(e) => updateOrderBy(index, order.field, e.target.value as 'asc' | 'desc')}
                      className="rounded-md border-gray-300"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                    <button
                      onClick={() => removeOrderBy(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOrderBy}
                  className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Order By
                </button>
              </div>
            )}
          </div>

          {/* Pagination Section */}
          <div className="border rounded-md">
            <button
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('pagination')}
            >
              <span className="font-medium">Pagination</span>
              {expandedSections.pagination ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            {expandedSections.pagination && (
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <span>Take:</span>
                    <input
                      type="number"
                      value={queryData.take}
                      onChange={(e) => setQueryData(prev => ({ ...prev, take: parseInt(e.target.value) || 0 }))}
                      className="w-20 rounded-md border-gray-300"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <span>Skip:</span>
                    <input
                      type="number"
                      value={queryData.skip}
                      onChange={(e) => setQueryData(prev => ({ ...prev, skip: parseInt(e.target.value) || 0 }))}
                      className="w-20 rounded-md border-gray-300"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Preview */}
        {showCode && (
          <div className="border rounded-md overflow-hidden">
          <Editor
              height="500px"
            defaultLanguage="typescript"
              value={generatePrismaCode()}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      )}
      </div>
    </div>
  );
}; 