import React from 'react';
import { AdManager } from './AdManager';
import { SubscriptionSettings } from './SubscriptionSettings';
import { PaywallConfig } from './PaywallConfig';
import { AffiliateManager } from './AffiliateManager';

interface MonetizationSettings {
  adSpots: any[];
  subscriptionPlans: any[];
  paywallRules: any[];
  paywallContent: any;
  affiliateLinks: any[];
}

interface MonetizationFeatures {
  adProviders: any[];
  subscriptionFeatures: any[];
  affiliatePrograms: any[];
}

interface MonetizationPanelProps {
  settings: MonetizationSettings;
  onChange: (settings: MonetizationSettings) => void;
  features: MonetizationFeatures;
}

export const MonetizationPanel: React.FC<MonetizationPanelProps> = ({ settings, onChange, features }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-6 p-6">
        <div className="pb-6 border-b border-gray-100">
          <AdManager
            adSpots={settings.adSpots}
            providers={features.adProviders}
            onChange={(ads) => onChange({ ...settings, adSpots: ads })}
          />
        </div>
        
        <div className="pb-6 border-b border-gray-100">
          <SubscriptionSettings
            plans={settings.subscriptionPlans}
            features={features.subscriptionFeatures}
            onChange={(plans) => onChange({ ...settings, subscriptionPlans: plans })}
          />
        </div>
        
        <div className="pb-6 border-b border-gray-100">
          <PaywallConfig
            rules={settings.paywallRules}
            content={settings.paywallContent}
            onChange={(paywall) => onChange({ ...settings, ...paywall })}
          />
        </div>
        
        <div className="pb-6">
          <AffiliateManager
            links={settings.affiliateLinks}
            programs={features.affiliatePrograms}
            onChange={(affiliates) => onChange({ ...settings, affiliateLinks: affiliates })}
          />
        </div>
      </div>
    </div>
  );
}; 