import * as React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started with blogging',
      features: [
        'Single blog',
        'Basic customization',
        'Comments system',
        'Mobile responsive',
        'SSL security',
        'Basic analytics',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '12',
      description: 'Ideal for serious bloggers and professionals',
      features: [
        'Multiple blogs',
        'Advanced customization',
        'Priority support',
        'Custom domain',
        'Advanced analytics',
        'Remove branding',
        'Team collaboration',
        'API access',
      ],
      cta: 'Get Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '49',
      description: 'For large organizations and businesses',
      features: [
        'Unlimited blogs',
        'White-label solution',
        '24/7 support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
        'Dedicated account manager',
        'Custom features',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your blogging needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-sm border ${
                plan.popular ? 'border-[#f4a261]' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#f4a261] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-3xl font-semibold text-gray-900">
                      $
                    </span>
                    <span className="text-5xl font-semibold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-gray-500">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-[#f4a261] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/blogs/create"
                  className={`block w-full text-center py-3 px-6 rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-[#f4a261] hover:bg-[#e76f51] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-4">
            Need help? Check out our FAQ or contact support
          </p>
          <Link
            to="/support"
            className="text-[#f4a261] hover:text-[#e76f51] font-medium"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
};
