import * as React from "react";
import { useState } from "react";
import { MainPanel } from 'app/components/MainPanel';

import { Form, Field } from 'react-final-form';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg max-w-lg w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};


interface AuthenticationTabProps {
  oauthClients: any[];
  onCreateClient: (data: any) => void;
  onUpdateClient: (id: string, data: any) => void;
  onDeleteClient: (id: string) => void;
}

export const AuthenticationTab: React.FC<AuthenticationTabProps> = ({
  oauthClients,
  onCreateClient,
  onUpdateClient,
  onDeleteClient
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">OAuth2 Settings</h2>
        <button
          onClick={() => onCreateClient({
            name: 'New Client',
            type: 'web',
            redirectUris: [],
            jsOrigins: []
          })}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Add OAuth Client
        </button>
      </div>

      <div className="space-y-4">
        {oauthClients.map(client => (
          <div key={client.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{client.name}</h3>
                <p className="text-sm text-gray-500">Client ID: {client.clientId}</p>
                <p className="text-sm text-gray-500">Client Secret: {client.clientSecret}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onUpdateClient(client.id, {
                    name: `${client.name} (Updated)`
                  })}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteClient(client.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium">Redirect URIs</h4>
                <ul className="mt-1 space-y-1">
                  {client.redirectUris.map((uri: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">{uri}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium">JavaScript Origins</h4>
                <ul className="mt-1 space-y-1">
                  {client.jsOrigins.map((origin: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">{origin}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


interface UserManagementTabProps {
  users: {
    instanceUsers: any[];
    regularUsers: any[];
  };
  onCreateUser: (userData: any, type: 'instance' | 'regular') => void;
  onUpdateUser: (userId: number, updates: any, type: 'instance' | 'regular') => void;
  onDeleteUser: (userId: number, type: 'instance' | 'regular') => void;
  onVerifyIdentity: (userId: number, documentId: number) => void;
}

export const UserManagementTab: React.FC<UserManagementTabProps> = ({
  users,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
  onVerifyIdentity
}) => {
  return (
    <div className="p-6">
      <div className="space-y-8">
        {/* Instance Users Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Instance Users</h2>
            <button
              onClick={() => onCreateUser({
                firstName: 'New',
                lastName: 'Admin',
                email: 'admin@example.com'
              }, 'instance')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Add Instance User
            </button>
          </div>

          <div className="space-y-4">
            {users.instanceUsers.map(user => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => onUpdateUser(user.id, {}, 'instance')}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id, 'instance')}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Identity Documents */}
                {user.identityDocuments && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Identity Documents</h4>
                    <div className="space-y-2">
                      {user.identityDocuments.map((doc: any) => (
                        <div key={doc.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{doc.type}</p>
                            <p className="text-xs text-gray-500">Number: {doc.number}</p>
                          </div>
                          {!doc.verified && (
                            <button
                              onClick={() => onVerifyIdentity(user.id, doc.id)}
                              className="px-2 py-1 bg-green-100 text-green-600 text-sm rounded hover:bg-green-200"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Regular Users Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Regular Users</h2>
            <button
              onClick={() => onCreateUser({
                firstName: 'New',
                lastName: 'User',
                email: 'user@example.com'
              }, 'regular')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Add Regular User
            </button>
          </div>

          <div className="space-y-4">
            {users.regularUsers.map(user => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => onUpdateUser(user.id, {}, 'regular')}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id, 'regular')}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockApiKeys = {
  production: 'prod_key_123456789',
  development: 'dev_key_987654321'
};

const mockOAuthSettings = {
  clientId: 'client_123456',
  clientSecret: 'secret_abcdef',
  redirectUris: ['https://app1.example.com/callback', 'https://app2.example.com/callback'],
  jsOrigins: ['https://app1.example.com', 'https://app2.example.com'],
  applicationType: 'web',
  authorizationCodes: [
    { code: 'auth_123', clientId: 'client_123456', expiresAt: new Date().getTime() + 600000 }
  ],
  accessTokens: [
    { token: 'access_123', clientId: 'client_123456', expiresAt: new Date().getTime() + 3600000 }
  ]
};

// Add new mock data types
const mockAuthTokens = {
  accessTokens: [
    { token: 'access_123', clientId: 'client_123', expiresAt: new Date().getTime() + 3600000 },
    { token: 'access_456', clientId: 'client_456', expiresAt: new Date().getTime() + 7200000 }
  ],
  refreshTokens: [
    { token: 'refresh_123', clientId: 'client_123', expiresAt: new Date().getTime() + 86400000 }
  ]
};

// Expand mockUsers with more comprehensive data
const mockUsers = {
  instanceUsers: [
    {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      identityDocuments: [
        {
          id: 1,
          type: 'passport',
          number: 'P123456',
          expiryDate: '2025-12-31',
          nationality: 'US',
          verified: true,
          sides: {
            front: 'front-image-url',
            back: 'back-image-url'
          },
          verificationStatus: 'verified',
          verifiedAt: '2023-01-01T00:00:00Z'
        },
        {
          id: 2,
          type: 'drivers_license',
          number: 'DL789012',
          expiryDate: '2024-06-30',
          nationality: 'US',
          verified: false,
          sides: {
            front: 'front-image-url',
            back: 'back-image-url'
          },
          verificationStatus: 'pending',
          submittedAt: '2023-06-01T00:00:00Z'
        }
      ],
      addresses: [
        {
          id: 1,
          type: 'billing',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'US',
          postalCode: '10001',
          primary: true
        },
        {
          id: 2,
          type: 'shipping',
          street: '456 Market St',
          city: 'Los Angeles',
          state: 'CA',
          country: 'US',
          postalCode: '90001',
          primary: false
        }
      ],
      metadata: {
        lastLogin: '2023-06-01T00:00:00Z',
        loginCount: 42,
        preferences: {
          theme: 'light',
          notifications: true
        }
      }
    }
  ],
  regularUsers: [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user' }
  ]
};

const mockIdentitySettings = {
  compreface: {
    recognitionKey: 'recog_key_123',
    verificationKey: 'verif_key_456',
    detectionKey: 'detect_key_789'
  },
  providers: [] as any[]
};

const mockApplications = [
  {
    id: 1,
    name: 'Main App',
    logo: 'https://example.com/logo.png',
    homepageUrl: 'https://example.com',
    description: 'Main application instance',
    callbackUrls: ['https://example.com/callback'],
    chargeWebhooks: ['https://example.com/webhooks/charge']
  }
];

// Add new mock data
const mockPaymentSettings = {
  stripe: {
    publishableKey: 'pk_test_123456',
    secretKey: 'sk_test_123456',
    webhookSecret: 'whsec_123456',
    enabled: true
  },
  providers: [
    { id: 1, name: 'Stripe', enabled: true, metadata: { country: 'US', currency: 'USD' } },
    { id: 2, name: 'PayPal', enabled: false, metadata: { country: 'US', currency: 'USD' } }
  ]
};

// Add project settings
const mockProjects = [
  {
    id: 1,
    name: 'Main Project',
    apiKeys: mockApiKeys,
    instanceUsers: mockUsers.instanceUsers,
    applications: mockApplications
  }
];

// Add new mock data types for OAuth
const mockOAuthClients = {
  clients: [
    {
      id: 'client_123',
      name: 'Web Application',
      clientId: 'client_123456',
      clientSecret: 'secret_abcdef',
      type: 'web',
      redirectUris: ['https://app1.example.com/callback'],
      jsOrigins: ['https://app1.example.com'],
      createdAt: new Date().toISOString()
    }
  ]
};

// Add mock data for identity verification
const mockVerificationRequests = [
  {
    id: 'ver_123',
    userId: 1,
    status: 'pending',
    documentType: 'passport',
    documentNumber: 'P123456',
    createdAt: new Date().toISOString(),
    faceMatchScore: 0.95,
    documentValidation: {
      mrzValid: true,
      documentExpired: false,
      securityFeaturesValid: true
    }
  }
];

// Add new tab for Features Management
const tabs = [
  { id: 'api', label: 'API Keys' },
  { id: 'oauth2', label: 'OAuth2' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'users', label: 'Users' },
  { id: 'identity', label: 'Identity' },
  { id: 'documents', label: 'Documents' },
  { id: 'applications', label: 'Applications' },
  { id: 'features', label: 'Features' }
];

// Add new mock data for features
const mockFeatures = {
  authentication: {
    enabled: true,
    settings: {
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      requireMFA: false
    }
  },
  userManagement: {
    enabled: true,
    settings: {
      allowSelfRegistration: true,
      requireEmailVerification: true,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
        requireNumbers: true
      }
    }
  },
  payment: {
    enabled: true,
    settings: {
      supportedCurrencies: ['USD', 'EUR'],
      minimumAmount: 1.00,
      maximumAmount: 999999.99
    }
  },
  identity: {
    enabled: true,
    settings: {
      requiredDocuments: ['passport', 'drivers_license'],
      minVerificationAge: 18,
      allowExpiredDocuments: false
    }
  }
};

// Add interfaces for the different data types
interface Address {
  id: number;
  type: 'billing' | 'shipping';
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  primary: boolean;
}

interface PaymentProvider {
  id: number;
  name: string;
  enabled: boolean;
  metadata: {
    country: string;
    currency: string;
  };
}

interface Application {
  id: number;
  name: string;
  logo: string;
  homepageUrl: string;
  description: string;
  callbackUrls: string[];
  chargeWebhooks: string[];
  createdAt: string;
}

// Add modal state interfaces
interface ModalState {
  isOpen: boolean;
  type: 'document' | 'address' | 'project' | 'payment' | 'application' | 'user' | null;
  data?: any;
}

// Add new interface for CRUD operations
interface CrudModalData {
  type: 'create' | 'update';
  entityType: 'client' | 'user' | 'provider' | 'application' | 'oauth2Provider' | 'identityProvider';
  data?: any;
}

// Add new mock data structure for OAuth2 settings
const mockOAuth2Settings = {
  providers: [
    {
      id: 1,
      name: 'Google',
      clientId: 'google_client_123',
      clientSecret: 'google_secret_456',
      enabled: true,
      scopes: ['email', 'profile'],
      redirectUris: ['http://localhost:3000/auth/google/callback']
    },
    {
      id: 2,
      name: 'GitHub',
      clientId: 'github_client_789',
      clientSecret: 'github_secret_012',
      enabled: false,
      scopes: ['user', 'repo'],
      redirectUris: ['http://localhost:3000/auth/github/callback']
    }
  ]
};

// Add to existing mock data section
const mockIdentityProviders = [
  {
    id: 1,
    name: 'Compreface',
    enabled: true,
    apiKey: 'key_123456',
    settings: {
      minConfidence: 0.9,
      maxAttempts: 3,
      documentTypes: ['passport', 'drivers_license', 'national_id']
    }
  },
  {
    id: 2,
    name: 'ID.me',
    enabled: false,
    apiKey: 'key_789012',
    settings: {
      minConfidence: 0.85,
      maxAttempts: 5,
      documentTypes: ['passport', 'drivers_license']
    }
  }
];

// Add new tab component
interface IdentityDocumentsTabProps {
  users: {
    instanceUsers: any[];
    regularUsers: any[];
  };
  onVerifyIdentity: (userId: number, documentId: number) => void;
  onUploadDocument: (userId: number, documentType: string, side: 'front' | 'back', file: File) => void;
}

export const IdentityDocumentsTab: React.FC<IdentityDocumentsTabProps> = ({
  users,
  onVerifyIdentity,
  onUploadDocument
}) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-6">Identity Documents</h2>
      <div className="space-y-6">
        {users.instanceUsers.map(user => (
          <div key={user.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <label className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer">
                Upload Document
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onUploadDocument(user.id, 'passport', 'front', file);
                    }
                  }}
                />
              </label>
            </div>

            {user.identityDocuments && user.identityDocuments.length > 0 ? (
              <div className="space-y-3">
                {user.identityDocuments.map((doc: any) => (
                  <div key={doc.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{doc.type}</p>
                        <p className="text-xs text-gray-500">Number: {doc.number}</p>
                        <p className="text-xs text-gray-500">Expires: {doc.expiryDate}</p>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            doc.verified 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.verified ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      </div>
                      {!doc.verified && (
                        <button
                          onClick={() => onVerifyIdentity(user.id, doc.id)}
                          className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded hover:bg-green-200"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No documents uploaded</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function Platform() {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [oauthSettings, setOauthSettings] = useState(mockOAuthSettings);
  const [paymentSettings, setPaymentSettings] = useState(mockPaymentSettings);
  const [users, setUsers] = useState(mockUsers);
  const [identitySettings, setIdentitySettings] = useState(mockIdentitySettings);
  const [applications, setApplications] = useState(mockApplications);
  const [projects, setProjects] = useState(mockProjects);
  const [authTokens, setAuthTokens] = useState(mockAuthTokens);
  const [oauthClients, setOauthClients] = useState(mockOAuthClients);
  const [verificationRequests, setVerificationRequests] = useState(mockVerificationRequests);
  const [features, setFeatures] = useState(mockFeatures);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null });
  const [crudModal, setCrudModal] = useState<{ isOpen: boolean; data?: CrudModalData }>({
    isOpen: false
  });
  const [oauth2Settings, setOAuth2Settings] = useState(mockOAuth2Settings);

  const generateApiKey = (type: 'production' | 'development') => {
    const newKey = `${type}_key_${Math.random().toString(36).substr(2, 9)}`;
    setApiKeys(prev => ({ ...prev, [type]: newKey }));
  };

  // Add new handlers
  const handleStripeConfiguration = () => {
    setPaymentSettings(prev => ({
      ...prev,
      stripe: {
        ...prev.stripe,
        enabled: !prev.stripe.enabled
      }
    }));
  };

  const handleIdentityDocumentVerification = (userId: number, docId: number) => {
    setUsers(prev => ({
      ...prev,
      instanceUsers: prev.instanceUsers.map(user => 
        user.id === userId ? {
          ...user,
          identityDocuments: user.identityDocuments.map(doc =>
            doc.id === docId ? { ...doc, verified: true } : doc
          )
        } : user
      )
    }));
  };

  const handleDocumentUpload = async (userId: number, documentType: string, side: 'front' | 'back', file: File) => {
    try {
      // Simulate API upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const imageUrl = URL.createObjectURL(file);
      
      setUsers(prev => ({
        ...prev,
        instanceUsers: prev.instanceUsers.map(user => 
          user.id === userId ? {
            ...user,
            identityDocuments: [
              ...user.identityDocuments,
              {
                id: Math.random(),
                type: documentType,
                number: `DOC${Math.random().toString(36).substr(2, 9)}`,
                expiryDate: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
                nationality: 'US',
                verified: false,
                sides: {
                  front: side === 'front' ? imageUrl : '',
                  back: side === 'back' ? imageUrl : ''
                },
                verificationStatus: 'pending',
                submittedAt: new Date().toISOString()
              }
            ]
          } : user
        )
      }));

      // Close modal after successful upload
      setModal({ isOpen: false, type: null });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleAddAddress = (userId: number, address: Address) => {
    setUsers(prev => ({
      ...prev,
      instanceUsers: prev.instanceUsers.map(user =>
        user.id === userId ? {
          ...user,
          addresses: [...user.addresses, { ...address, id: Math.random() }]
        } : user
      )
    }));
    setModal({ isOpen: false, type: null });
  };

  const handleGenerateAuthToken = (clientId: string) => {
    const newToken = {
      token: `access_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      expiresAt: new Date().getTime() + 3600000
    };
    setAuthTokens(prev => ({
      ...prev,
      accessTokens: [...prev.accessTokens, newToken]
    }));
  };

  const handleCreateOAuthClient = (clientData: any) => {
    const newClient = {
      id: `client_${Math.random().toString(36).substr(2, 9)}`,
      name: clientData.name,
      clientId: `client_${Math.random().toString(36).substr(2, 9)}`,
      clientSecret: `secret_${Math.random().toString(36).substr(2, 9)}`,
      type: clientData.type || 'web',
      redirectUris: clientData.redirectUris || [],
      jsOrigins: clientData.jsOrigins || [],
      createdAt: new Date().toISOString()
    };
    
    setOauthClients(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }));
  };

  const handleUpdateOAuthClient = (clientId: string, updates: any) => {
    setOauthClients(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === clientId ? { ...client, ...updates } : client
      )
    }));
  };

  const handleDeleteOAuthClient = (clientId: string) => {
    setOauthClients(prev => ({
      ...prev,
      clients: prev.clients.filter(client => client.id !== clientId)
    }));
  };

  const handleVerifyIdentity = async (userId: number, documentId: number) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock face recognition result
    const faceMatchScore = Math.random() * 0.3 + 0.7; // Random score between 0.7 and 1.0

    setVerificationRequests(prev => [
      ...prev,
      {
        id: `ver_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        status: faceMatchScore > 0.8 ? 'approved' : 'rejected',
        documentType: 'passport',
        documentNumber: `P${Math.random().toString().substr(2, 6)}`,
        createdAt: new Date().toISOString(),
        faceMatchScore,
        documentValidation: {
          mrzValid: true,
          documentExpired: false,
          securityFeaturesValid: true
        }
      }
    ]);

    // Update user's document verification status
    if (faceMatchScore > 0.8) {
      handleIdentityDocumentVerification(userId, documentId);
    }
  };

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      id: Math.random(),
      apiKeys: {
        production: `prod_${Math.random().toString(36).substr(2, 9)}`,
        development: `dev_${Math.random().toString(36).substr(2, 9)}`
      },
      createdAt: new Date().toISOString(),
      ...projectData
    };

    setProjects(prev => [...prev, newProject]);
    setModal({ isOpen: false, type: null });
  };

  // Add payment integration handlers
  const handleAddPaymentProvider = (providerData: Partial<PaymentProvider>) => {
    const newProvider = {
      id: Math.random(),
      name: providerData.name || '',
      enabled: false,
      metadata: {
        country: providerData.metadata?.country || 'US',
        currency: providerData.metadata?.currency || 'USD'
      }
    };

    setPaymentSettings(prev => ({
      ...prev,
      providers: [...prev.providers, newProvider]
    }));
    setModal({ isOpen: false, type: null });
  };

  const handleUpdatePaymentProvider = (providerId: number, updates: any) => {
    setPaymentSettings(prev => ({
      ...prev,
      providers: prev.providers.map(provider =>
        provider.id === providerId ? { ...provider, ...updates } : provider
      )
    }));
  };

  const handleDeletePaymentProvider = (providerId: number) => {
    setPaymentSettings(prev => ({
      ...prev,
      providers: prev.providers.filter(provider => provider.id !== providerId)
    }));
  };

  const handleWebhookTest = async (providerId: number) => {
    // Simulate webhook test
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Webhook test successful' };
  };

  // Add application management handlers
  const handleCreateApplication = (appData: any) => {
    const newApp = {
      id: Math.random(),
      logo: appData.logo || 'https://example.com/default-logo.png',
      createdAt: new Date().toISOString(),
      ...appData
    };

    setApplications(prev => [...prev, newApp]);
  };

  // Add user management handlers
  const handleCreateUser = (userData: any, type: 'instance' | 'regular') => {
    const newUser = {
      id: Math.random(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: type === 'instance' ? 'admin' : 'user',
      status: 'active',
      identityDocuments: [],
      addresses: [],
      metadata: {
        lastLogin: null,
        loginCount: 0,
        preferences: {
          theme: 'light',
          notifications: true
        }
      }
    };

    setUsers(prev => ({
      ...prev,
      [type === 'instance' ? 'instanceUsers' : 'regularUsers']: [
        ...prev[type === 'instance' ? 'instanceUsers' : 'regularUsers'],
        newUser
      ]
    }));
  };

  const handleUpdateUser = (userId: number, updates: any, type: 'instance' | 'regular') => {
    setUsers(prev => ({
      ...prev,
      [type === 'instance' ? 'instanceUsers' : 'regularUsers']: prev[type === 'instance' ? 'instanceUsers' : 'regularUsers']
        .map(user => user.id === userId ? { ...user, ...updates } : user)
    }));
  };

  const handleDeleteUser = (userId: number, type: 'instance' | 'regular') => {
    setUsers(prev => ({
      ...prev,
      [type === 'instance' ? 'instanceUsers' : 'regularUsers']: prev[type === 'instance' ? 'instanceUsers' : 'regularUsers']
        .filter(user => user.id !== userId)
    }));
  };

  // Add feature management handlers
  const handleToggleFeature = (featureKey: keyof typeof mockFeatures) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        enabled: !prev[featureKey].enabled
      }
    }));
  };

  const handleUpdateFeatureSettings = (
    featureKey: keyof typeof mockFeatures,
    settings: any
  ) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        settings: {
          ...prev[featureKey].settings,
          ...settings
        }
      }
    }));
  };

  // Generic form modal component
  const FormModal = ({ onSubmit, initialData, fields }: {
    onSubmit: (data: any) => void;
    initialData?: any;
    fields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'select' | 'number';
      options?: Array<{ value: string; label: string }>;
    }>;
  }) => (
    <Form
      onSubmit={onSubmit}
      initialValues={initialData}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <Field name={field.name}>
                {({ input }) => 
                  field.type === 'select' ? (
                    <select {...input} className="form-select block w-full rounded-md border-gray-300">
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...input}
                      type={field.type}
                      className="form-input block w-full rounded-md border-gray-300"
                    />
                  )
                }
              </Field>
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setCrudModal({ isOpen: false })}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    />
  );

  // Add handlers for CRUD operations
  const handleOpenCrudModal = (data: CrudModalData) => {
    setCrudModal({ isOpen: true, data });
  };

  const handleCrudSubmit = (formData: any) => {
    const { type, entityType } = crudModal.data!;

    switch (entityType) {
      case 'client':
        if (type === 'create') {
          handleCreateOAuthClient(formData);
        } else {
          handleUpdateOAuthClient(formData.id, formData);
        }
        break;
      case 'user':
        if (type === 'create') {
          handleCreateUser(formData, formData.userType);
        } else {
          handleUpdateUser(formData.id, formData, formData.userType);
        }
        break;
      case 'provider':
        if (type === 'create') {
          handleAddPaymentProvider(formData);
        } else {
          handleUpdatePaymentProvider(formData.id, formData);
        }
        break;
      case 'application':
        if (type === 'create') {
          handleCreateApplication(formData);
        }
        break;
    }

    setCrudModal({ isOpen: false });
  };

  // Modal Content Components
  const DocumentUploadModal = ({ userId }: { userId: number }) => (
    <Form
      onSubmit={(values) => handleDocumentUpload(userId, values.documentType, values.side, values.file)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="documentType">
            {({ input }) => (
              <select {...input} className="form-select">
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="id_card">ID Card</option>
              </select>
            )}
          </Field>
          <Field name="side">
            {({ input }) => (
              <select {...input} className="form-select mt-2">
                <option value="front">Front</option>
                <option value="back">Back</option>
              </select>
            )}
          </Field>
          <Field name="file">
            {({ input: { value, onChange, ...input } }) => (
              <input
                {...input}
                type="file"
                onChange={({ target }) => onChange(target.files?.[0])}
                className="form-input mt-2"
              />
            )}
          </Field>
          <button type="submit" className="btn-primary mt-4">Upload</button>
        </form>
      )}
    />
  );

  // Add OAuth2 CRUD handlers
  const handleCreateOAuth2Provider = (providerData: any) => {
    const newProvider = {
      id: Math.random(),
      name: providerData.name,
      clientId: providerData.clientId,
      clientSecret: providerData.clientSecret,
      enabled: false,
      scopes: providerData.scopes?.split(',').map((s: string) => s.trim()) || [],
      redirectUris: providerData.redirectUris?.split(',').map((u: string) => u.trim()) || []
    };

    setOAuth2Settings(prev => ({
      ...prev,
      providers: [...prev.providers, newProvider]
    }));
    setCrudModal({ isOpen: false });
  };

  const handleUpdateOAuth2Provider = (providerId: number, updates: any) => {
    setOAuth2Settings(prev => ({
      ...prev,
      providers: prev.providers.map(provider =>
        provider.id === providerId
          ? {
              ...provider,
              ...updates,
              scopes: updates.scopes?.split(',').map((s: string) => s.trim()) || provider.scopes,
              redirectUris: updates.redirectUris?.split(',').map((u: string) => u.trim()) || provider.redirectUris
            }
          : provider
      )
    }));
    setCrudModal({ isOpen: false });
  };

  const handleDeleteOAuth2Provider = (providerId: number) => {
    setOAuth2Settings(prev => ({
      ...prev,
      providers: prev.providers.filter(provider => provider.id !== providerId)
    }));
  };

  const handleToggleOAuth2Provider = (providerId: number) => {
    setOAuth2Settings(prev => ({
      ...prev,
      providers: prev.providers.map(provider =>
        provider.id === providerId
          ? { ...provider, enabled: !provider.enabled }
          : provider
      )
    }));
  };

  // Add to existing handlers section
  const handleCreateIdentityProvider = (providerData: any) => {
    const newProvider = {
      id: Math.random(),
      enabled: false,
      ...providerData,
      settings: {
        minConfidence: 0.9,
        maxAttempts: 3,
        documentTypes: providerData.documentTypes?.split(',').map((t: string) => t.trim()) || []
      }
    };
    setIdentitySettings(prev => ({
      ...prev,
      providers: [...(prev.providers || []), newProvider]
    }));
  };

  const handleUpdateIdentityProvider = (id: number, updates: any) => {
    setIdentitySettings(prev => ({
      ...prev,
      providers: [...(prev.providers || []).map(provider =>
        provider.id === id ? { ...provider, ...updates } : provider
      )]
    }));
  };

  const handleDeleteIdentityProvider = (id: number) => {
    setIdentitySettings(prev => ({
      ...prev,
      providers: (prev.providers || []).filter(provider => provider.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ marginTop: '-1%' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
            Platform Settings
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-[#1a365d] text-[#1a365d]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {activeTab === 'api' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">API Keys</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-gray-500">{apiKeys.production}</p>
                    </div>
                    <button 
                      onClick={() => generateApiKey('production')}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Generate Key
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Development API Key</p>
                      <p className="text-sm text-gray-500">{apiKeys.development}</p>
                    </div>
                    <button 
                      onClick={() => generateApiKey('development')}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Generate Key
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'oauth2' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">OAuth2 Providers</h2>
                  <button
                    onClick={() => handleOpenCrudModal({
                      type: 'create',
                      entityType: 'oauth2Provider'
                    })}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Add Provider
                  </button>
                </div>

                <div className="space-y-4">
                  {oauth2Settings.providers.map(provider => (
                    <div key={provider.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{provider.name}</h3>
                          <p className="text-sm text-gray-500">Client ID: {provider.clientId}</p>
                          <div className="mt-2 space-x-2">
                            {provider.scopes.map(scope => (
                              <span
                                key={scope}
                                className="inline-block px-2 py-1 text-xs bg-gray-100 rounded"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleToggleOAuth2Provider(provider.id)}
                            className={`px-3 py-1 ${
                              provider.enabled
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-600'
                            } rounded hover:opacity-80`}
                          >
                            {provider.enabled ? 'Enabled' : 'Disabled'}
                          </button>
                          <button
                            onClick={() => handleOpenCrudModal({
                              type: 'update',
                              entityType: 'oauth2Provider',
                              data: {
                                ...provider,
                                scopes: provider.scopes.join(', '),
                                redirectUris: provider.redirectUris.join(', ')
                              }
                            })}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteOAuth2Provider(provider.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'checkout' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Payment Integration</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Stripe Integration</p>
                      <p className="text-sm text-gray-500">
                        {paymentSettings.stripe.enabled ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                    <button 
                      onClick={handleStripeConfiguration}
                      className={`px-4 py-2 ${
                        paymentSettings.stripe.enabled ? 'bg-red-500' : 'bg-yellow-500'
                      } text-white rounded hover:opacity-90`}
                    >
                      {paymentSettings.stripe.enabled ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                  
                  {paymentSettings.stripe.enabled && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Publishable Key:</span>
                        <span className="text-sm font-mono">{paymentSettings.stripe.publishableKey}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Webhook Status:</span>
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">User Management</h2>
                <UserManagementTab
                  users={users}
                  onCreateUser={handleCreateUser}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                  onVerifyIdentity={handleVerifyIdentity}
                />
              </div>
            )}

            {activeTab === 'identity' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Identity Verification Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Compreface Recognition Key
                    </label>
                    <input
                      type="text"
                      value={identitySettings.compreface.recognitionKey}
                      onChange={(e) => setIdentitySettings(prev => ({
                        ...prev,
                        compreface: { ...prev.compreface, recognitionKey: e.target.value }
                      }))}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  {/* Add similar inputs for verification and detection keys */}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <IdentityDocumentsTab
                users={users}
                onVerifyIdentity={handleVerifyIdentity}
                onUploadDocument={(userId, documentType, side, file) => 
                  handleDocumentUpload(userId, documentType, side, file)
                }
              />
            )}

            {activeTab === 'applications' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Applications</h2>
                <div className="space-y-4">
                  {applications.map(app => (
                    <div key={app.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={app.logo} alt={app.name} className="w-12 h-12 rounded" />
                        <div>
                          <h3 className="font-medium">{app.name}</h3>
                          <p className="text-sm text-gray-500">{app.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-6">Feature Management</h2>
                <div className="space-y-6">
                  {/* Authentication Feature */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Authentication</h3>
                        <p className="text-sm text-gray-500">
                          Manage authentication settings and policies
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleFeature('authentication')}
                        className={`px-4 py-2 ${
                          features.authentication.enabled
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        } text-white rounded`}
                      >
                        {features.authentication.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    {features.authentication.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Session Timeout (seconds)
                          </label>
                          <input
                            type="number"
                            value={features.authentication.settings.sessionTimeout}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('authentication', {
                                sessionTimeout: parseInt(e.target.value)
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Max Login Attempts
                          </label>
                          <input
                            type="number"
                            value={features.authentication.settings.maxLoginAttempts}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('authentication', {
                                maxLoginAttempts: parseInt(e.target.value)
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={features.authentication.settings.requireMFA}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('authentication', {
                                requireMFA: e.target.checked
                              })
                            }
                            className="h-4 w-4 text-yellow-600 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Require Multi-Factor Authentication
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Management Feature */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">User Management</h3>
                        <p className="text-sm text-gray-500">
                          Configure user registration and verification settings
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleFeature('userManagement')}
                        className={`px-4 py-2 ${
                          features.userManagement.enabled
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        } text-white rounded`}
                      >
                        {features.userManagement.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    {features.userManagement.enabled && (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={features.userManagement.settings.allowSelfRegistration}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('userManagement', {
                                allowSelfRegistration: e.target.checked
                              })
                            }
                            className="h-4 w-4 text-yellow-600 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Allow Self Registration
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={features.userManagement.settings.requireEmailVerification}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('userManagement', {
                                requireEmailVerification: e.target.checked
                              })
                            }
                            className="h-4 w-4 text-yellow-600 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Require Email Verification
                          </label>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Password Policy</h4>
                          <div className="ml-4 space-y-2">
                            <div>
                              <label className="block text-sm text-gray-700">
                                Minimum Length
                              </label>
                              <input
                                type="number"
                                value={features.userManagement.settings.passwordPolicy.minLength}
                                onChange={(e) =>
                                  handleUpdateFeatureSettings('userManagement', {
                                    passwordPolicy: {
                                      ...features.userManagement.settings.passwordPolicy,
                                      minLength: parseInt(e.target.value)
                                    }
                                  })
                                }
                                className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm"
                              />
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={features.userManagement.settings.passwordPolicy.requireSpecialChars}
                                onChange={(e) =>
                                  handleUpdateFeatureSettings('userManagement', {
                                    passwordPolicy: {
                                      ...features.userManagement.settings.passwordPolicy,
                                      requireSpecialChars: e.target.checked
                                    }
                                  })
                                }
                                className="h-4 w-4 text-yellow-600 rounded"
                              />
                              <label className="ml-2 text-sm text-gray-700">
                                Require Special Characters
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={features.userManagement.settings.passwordPolicy.requireNumbers}
                                onChange={(e) =>
                                  handleUpdateFeatureSettings('userManagement', {
                                    passwordPolicy: {
                                      ...features.userManagement.settings.passwordPolicy,
                                      requireNumbers: e.target.checked
                                    }
                                  })
                                }
                                className="h-4 w-4 text-yellow-600 rounded"
                              />
                              <label className="ml-2 text-sm text-gray-700">
                                Require Numbers
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Feature */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Payment</h3>
                        <p className="text-sm text-gray-500">
                          Configure payment processing settings
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleFeature('payment')}
                        className={`px-4 py-2 ${
                          features.payment.enabled
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        } text-white rounded`}
                      >
                        {features.payment.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    {features.payment.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Supported Currencies
                          </label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {features.payment.settings.supportedCurrencies.map((currency) => (
                              <span
                                key={currency}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                              >
                                {currency}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Minimum Amount
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={features.payment.settings.minimumAmount}
                              onChange={(e) =>
                                handleUpdateFeatureSettings('payment', {
                                  minimumAmount: parseFloat(e.target.value)
                                })
                              }
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Maximum Amount
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={features.payment.settings.maximumAmount}
                              onChange={(e) =>
                                handleUpdateFeatureSettings('payment', {
                                  maximumAmount: parseFloat(e.target.value)
                                })
                              }
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Identity Feature */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Identity Verification</h3>
                        <p className="text-sm text-gray-500">
                          Configure identity verification requirements
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleFeature('identity')}
                        className={`px-4 py-2 ${
                          features.identity.enabled
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        } text-white rounded`}
                      >
                        {features.identity.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    {features.identity.enabled && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Required Documents
                          </label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {features.identity.settings.requiredDocuments.map((doc) => (
                              <span
                                key={doc}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                              >
                                {doc.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Minimum Verification Age
                          </label>
                          <input
                            type="number"
                            value={features.identity.settings.minVerificationAge}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('identity', {
                                minVerificationAge: parseInt(e.target.value)
                              })
                            }
                            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={features.identity.settings.allowExpiredDocuments}
                            onChange={(e) =>
                              handleUpdateFeatureSettings('identity', {
                                allowExpiredDocuments: e.target.checked
                              })
                            }
                            className="h-4 w-4 text-yellow-600 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Allow Expired Documents
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, type: null })}
        title={modal.type ? `Add ${modal.type.charAt(0).toUpperCase() + modal.type.slice(1)}` : ''}
      >
        {modal.type === 'document' && <DocumentUploadModal userId={modal.data?.userId} />}
      </Modal>

      {/* CRUD Modal */}
      <Modal
        isOpen={crudModal.isOpen}
        onClose={() => setCrudModal({ isOpen: false })}
        title={crudModal.data ? `${crudModal.data.type === 'create' ? 'Create' : 'Update'} ${crudModal.data.entityType}` : ''}
      >
        {crudModal.data && (
          <FormModal
            onSubmit={handleCrudSubmit}
            initialData={crudModal.data.type === 'update' ? crudModal.data.data : undefined}
            fields={getFieldsForEntity(crudModal.data.entityType)}
          />
        )}
      </Modal>
    </div>
  );
}

// Helper function to get fields for different entities
function getFieldsForEntity(entityType: string): Array<{
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'number';
  options?: Array<{ value: string; label: string }>;
}> {
  switch (entityType) {
    case 'client':
      return [
        { name: 'name', label: 'Client Name', type: 'text' },
        { name: 'type', label: 'Client Type', type: 'select', options: [
          { value: 'web', label: 'Web Application' },
          { value: 'mobile', label: 'Mobile Application' },
          { value: 'service', label: 'Service Account' }
        ]},
        { name: 'redirectUris', label: 'Redirect URIs', type: 'text' },
        { name: 'jsOrigins', label: 'JavaScript Origins', type: 'text' }
      ];
    case 'user':
      return [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'userType', label: 'User Type', type: 'select', options: [
          { value: 'instance', label: 'Instance User' },
          { value: 'regular', label: 'Regular User' }
        ]}
      ];
    case 'provider':
      return [
        { name: 'name', label: 'Provider Name', type: 'text' },
        { name: 'metadata.country', label: 'Country', type: 'text' },
        { name: 'metadata.currency', label: 'Currency', type: 'text' }
      ];
    case 'application':
      return [
        { name: 'name', label: 'Application Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'homepageUrl', label: 'Homepage URL', type: 'text' },
        { name: 'logo', label: 'Logo URL', type: 'text' }
      ];
    case 'oauth2Provider':
      return [
        { name: 'name', label: 'Provider Name', type: 'text' },
        { name: 'clientId', label: 'Client ID', type: 'text' },
        { name: 'clientSecret', label: 'Client Secret', type: 'text' },
        { name: 'scopes', label: 'Scopes (comma-separated)', type: 'text' },
        { name: 'redirectUris', label: 'Redirect URIs (comma-separated)', type: 'text' }
      ];
    case 'identityProvider':
      return [
        { name: 'name', label: 'Provider Name', type: 'text' },
        { name: 'apiKey', label: 'API Key', type: 'text' },
        { name: 'documentTypes', label: 'Document Types (comma-separated)', type: 'text' },
        { name: 'minConfidence', label: 'Minimum Confidence', type: 'number' }
      ];
    default:
      return [];
  }
}