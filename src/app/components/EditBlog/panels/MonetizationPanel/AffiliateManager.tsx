import React from 'react';
import { Button, Input, Select, Table } from 'antd';

interface AffiliateLink {
  id: string;
  programId: string;
  url: string;
  description: string;
  commission: number;
}

interface AffiliateProgram {
  id: string;
  name: string;
  baseCommission: number;
}

interface AffiliateManagerProps {
  links: AffiliateLink[];
  programs: AffiliateProgram[];
  onChange: (links: AffiliateLink[]) => void;
}

export const AffiliateManager: React.FC<AffiliateManagerProps> = ({
  links,
  programs,
  onChange,
}) => {
  const generateId = () => {
    if (typeof window !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as any).randomUUID();
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const addLink = () => {
    const newLink: AffiliateLink = {
      id: generateId(),
      programId: programs[0]?.id || '',
      url: '',
      description: '',
      commission: programs[0]?.baseCommission || 0,
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<AffiliateLink>) => {
    onChange(
      links.map(link => (link.id === id ? { ...link, ...updates } : link)),
    );
  };

  const removeLink = (id: string) => {
    onChange(links.filter(link => link.id !== id));
  };

  const columns = [
    {
      title: 'Program',
      key: 'program',
      render: (record: AffiliateLink) => (
        <Select
          value={record.programId}
          onChange={value => updateLink(record.id, { programId: value })}
        >
          {programs.map(program => (
            <Select.Option key={program.id} value={program.id}>
              {program.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'URL',
      key: 'url',
      render: (record: AffiliateLink) => (
        <Input
          type="url"
          value={record.url}
          onChange={e => updateLink(record.id, { url: e.target.value })}
          placeholder="https://..."
        />
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (record: AffiliateLink) => (
        <Input
          value={record.description}
          onChange={e => updateLink(record.id, { description: e.target.value })}
          placeholder="Description..."
        />
      ),
    },
    {
      title: 'Commission (%)',
      key: 'commission',
      render: (record: AffiliateLink) => (
        <Input
          type="number"
          value={record.commission}
          onChange={e =>
            updateLink(record.id, { commission: Number(e.target.value) })
          }
          min={0}
          max={100}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: AffiliateLink) => (
        <Button danger onClick={() => removeLink(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Affiliate Links
        </h3>
        <Button
          onClick={addLink}
          className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
        >
          Add Link
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <Table
          dataSource={links}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="w-full"
          rowClassName="hover:bg-gray-50"
        />
      </div>
    </div>
  );
};
