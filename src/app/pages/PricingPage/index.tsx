import * as React from 'react';
import { Link } from 'react-router-dom';

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
        'Basic analytics'
      ],
      cta: 'Start Free',
      popular: false
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
        'API access'
      ],
      cta: 'Get Pro',
      popular: true
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
        'Custom features'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your blogging needs
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'border-2 border-yellow-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold text-slate-800">$</span>
                  <span className="text-6xl font-bold text-slate-800">
                    {plan.price}
                  </span>
                  <span className="text-slate-600 ml-2">/month</span>
                </div>
                <p className="text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <svg
                      className="w-5 h-5 text-yellow-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/blogs/create"
                className={`block text-center py-3 px-6 rounded-md transition font-medium ${
                  plan.popular
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mb-4">
            Need help? Check out our FAQ or contact support
          </p>
          <Link
            to="/support"
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}; 