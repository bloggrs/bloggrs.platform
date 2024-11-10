import React, { useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { BLOGGRS_THEME } from '../../../../../../theme/constants';

interface AdSpot {
  id: string;
  position: string;
  provider: string;
  adUnitId: string;
}

interface AdManagerProps {
  adSpots: AdSpot[];
  providers: string[];
  onChange: (ads: AdSpot[]) => void;
}

export const AdManager: React.FC<AdManagerProps> = ({
  adSpots,
  providers,
  onChange,
}) => {
  const positions = [
    'header',
    'sidebar',
    'in-content',
    'footer',
    'between-posts',
    'popup',
  ];

  const addNewSpot = () => {
    const newSpot: AdSpot = {
      id: Date.now().toString(),
      position: positions[0],
      provider: providers[0],
      adUnitId: '',
    };
    onChange([...adSpots, newSpot]);
  };

  const removeSpot = (id: string) => {
    onChange(adSpots.filter(spot => spot.id !== id));
  };

  const updateSpot = (id: string, field: keyof AdSpot, value: string) => {
    onChange(
      adSpots.map(spot =>
        spot.id === id ? { ...spot, [field]: value } : spot,
      ),
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Ad Spots</h2>
        </div>

        <div className="space-y-4">
          {adSpots.map(spot => (
            <div
              key={spot.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center space-x-4">
                <Select
                  value={spot.position}
                  onChange={value => updateSpot(spot.id, 'position', value)}
                  className="min-w-[140px]"
                  options={positions.map(p => ({ label: p, value: p }))}
                />
                <Select
                  value={spot.provider}
                  onChange={value => updateSpot(spot.id, 'provider', value)}
                  className="min-w-[140px]"
                  options={providers.map(p => ({ label: p, value: p }))}
                />
                <Input
                  placeholder="Ad Unit ID"
                  value={spot.adUnitId}
                  onChange={e =>
                    updateSpot(spot.id, 'adUnitId', e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  onClick={() => removeSpot(spot.id)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-2 transition-colors"
                  icon={<DeleteOutlined />}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addNewSpot}
          className="mt-4 w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all"
        >
          <PlusOutlined className="mr-2" />
          Add Ad Spot
        </button>
      </div>
    </div>
  );
};
