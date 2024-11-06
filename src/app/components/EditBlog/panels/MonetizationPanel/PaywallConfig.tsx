import React from 'react';
import { Switch, Select, Input, Card } from 'antd';
import { BLOGGRS_THEME } from '../../../../../theme/constants';

interface PaywallRule {
  type: 'articles' | 'time' | 'percentage';
  value: number;
  unit?: 'days' | 'hours' | 'articles' | 'percent';
}

interface PaywallContent {
  title: string;
  description: string;
  ctaText: string;
}

interface PaywallConfigProps {
  rules: PaywallRule[];
  content: PaywallContent;
  onChange: (config: { paywallRules: PaywallRule[], paywallContent: PaywallContent }) => void;
}

export const PaywallConfig: React.FC<PaywallConfigProps> = ({ rules, content, onChange }) => {
  const handleRuleChange = (index: number, rule: PaywallRule) => {
    const newRules = [...rules];
    newRules[index] = rule;
    onChange({ paywallRules: newRules, paywallContent: content });
  };

  const handleContentChange = (updates: Partial<PaywallContent>) => {
    onChange({ paywallRules: rules, paywallContent: { ...content, ...updates } });
  };

  return (
    <Card 
      title="Paywall Configuration" 
      className="bg-white rounded-xl shadow-sm border border-gray-200"
      style={{ padding: 0 }}
      headStyle={{
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 1.5rem',
        fontSize: '1.25rem',
        fontWeight: 600,
        margin: 0,
        background: 'white'
      }}
      bodyStyle={{
        padding: '1.5rem'
      }}
    >
      <div className="space-y-8">
        {/* Rules Configuration */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Access Rules</h3>
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <Select
                className="min-w-[180px]"
                value={rule.type}
                onChange={(type) => handleRuleChange(index, { ...rule, type: type as PaywallRule['type'] })}
                options={[
                  { label: 'Articles Limit', value: 'articles' },
                  { label: 'Time Based', value: 'time' },
                  { label: 'Content Percentage', value: 'percentage' },
                ]}
                style={{ borderRadius: '0.5rem' }}
              />
              <Input
                type="number"
                value={rule.value}
                onChange={(e) => handleRuleChange(index, { ...rule, value: Number(e.target.value) })}
                style={{ width: 120, borderRadius: '0.5rem' }}
                className="focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              />
              {rule.type !== 'percentage' && (
                <Select
                  value={rule.unit}
                  onChange={(unit) => handleRuleChange(index, { ...rule, unit })}
                  options={
                    rule.type === 'articles'
                      ? [{ label: 'Articles', value: 'articles' }]
                      : [
                          { label: 'Days', value: 'days' },
                          { label: 'Hours', value: 'hours' },
                        ]
                  }
                  style={{ borderRadius: '0.5rem' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Paywall Content Configuration */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Paywall Message</h3>
          <div className="space-y-4">
            <Input
              placeholder="Paywall Title"
              value={content.title}
              onChange={(e) => handleContentChange({ title: e.target.value })}
              className="rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            />
            <Input.TextArea
              placeholder="Description"
              value={content.description}
              onChange={(e) => handleContentChange({ description: e.target.value })}
              rows={3}
              className="rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            />
            <Input
              placeholder="Call to Action Text"
              value={content.ctaText}
              onChange={(e) => handleContentChange({ ctaText: e.target.value })}
              className="rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}; 