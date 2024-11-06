import React from 'react';
import { Button, Input, Select, Switch } from 'antd';
import { BLOGGRS_THEME } from '../../../../../theme/constants';

interface SubscriptionPlan {
  id?: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
}

interface SubscriptionSettingsProps {
  plans: SubscriptionPlan[];
  features: string[];
  onChange: (plans: SubscriptionPlan[]) => void;
}

export const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({
  plans = [],
  features,
  onChange,
}) => {
  const handleAddPlan = () => {
    const newPlan: SubscriptionPlan = {
      name: 'New Plan',
      price: 9.99,
      interval: 'monthly',
      features: [],
      isActive: true,
    };
    onChange([...plans, newPlan]);
  };

  const updatePlan = (index: number, updates: Partial<SubscriptionPlan>) => {
    const updatedPlans = plans.map((plan, i) =>
      i === index ? { ...plan, ...updates } : plan
    );
    onChange(updatedPlans);
  };

  const deletePlan = (index: number) => {
    onChange(plans.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Subscription Plans</h3>
        
        <div className="space-y-6">
          {plans.map((plan, index) => (
            <div 
              key={plan.id || index} 
              className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={plan.name}
                  onChange={(e) => updatePlan(index, { name: e.target.value })}
                  placeholder="Plan Name"
                  className="max-w-xs"
                />
                <Switch
                  checked={plan.isActive}
                  onChange={(checked) => updatePlan(index, { isActive: checked })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  type="number"
                  value={plan.price}
                  onChange={(e) => updatePlan(index, { price: parseFloat(e.target.value) })}
                  placeholder="Price"
                  className="w-full"
                />
                <Select
                  value={plan.interval}
                  onChange={(value) => updatePlan(index, { interval: value })}
                  options={[
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                  ]}
                  className="w-full"
                />
              </div>
              
              <Select
                mode="multiple"
                value={plan.features}
                onChange={(values) => updatePlan(index, { features: values })}
                options={features.map(f => ({ label: f, value: f }))}
                placeholder="Select features"
                className="w-full mb-4"
              />
              
              <Button
                danger
                className="hover:bg-red-50"
                onClick={() => deletePlan(index)}
              >
                Delete Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100">
        <Button 
          type="primary"
          className="bg-[#1a365d] hover:bg-[#2d4a7c] text-white rounded-lg"
          onClick={handleAddPlan}
        >
          Add Plan
        </Button>
      </div>
    </div>
  );
}; 