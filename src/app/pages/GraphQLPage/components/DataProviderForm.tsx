import React, { useState } from 'react';
import { PrismaQueryBuilder } from './PrismaQueryBuilder';

interface DataProviderFormProps {
  initialData?: any;
  operations: any[];
  onSubmit: (data: any) => void;
}

export const DataProviderForm: React.FC<DataProviderFormProps> = ({
  initialData,
  operations,
  onSubmit
}) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    type: 'prisma',
    operation: '',
    model: '',
    prismaQuery: {},
    resultMapping: {}
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Provider Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={e => setFormData({ ...formData, model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GraphQL Operation</label>
          <select
            value={formData.operation}
            onChange={e => setFormData({ ...formData, operation: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select operation</option>
            {operations.map(op => (
              <option key={op.id} value={op.name}>{op.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t pt-6">
        <PrismaQueryBuilder
          model={formData.model}
          initialValue={formData.prismaQuery}
          onChange={(queryData) => setFormData({ ...formData, prismaQuery: queryData })}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onSubmit(formData)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Provider
        </button>
      </div>
    </div>
  );
}; 