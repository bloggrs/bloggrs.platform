import React, { useState } from 'react';

interface Thread {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  authorId: string;
  timestamp: Date;
}

interface CommunicationHubProps {
  threads: Thread[];
  members: { id: string; name: string }[];
  onNewMessage: (message: { threadId: string; content: string }) => void;
}

export const CommunicationHub: React.FC<CommunicationHubProps> = ({
  threads,
  members,
  onNewMessage,
}) => {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (activeThread && newMessage.trim()) {
      onNewMessage({ threadId: activeThread, content: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Team Communication</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thread List */}
          <div className="md:border-r border-gray-100 pr-6">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  activeThread === thread.id ? 'bg-[#1a365d]/5 border-l-4 border-[#1a365d]' : ''
                }`}
                onClick={() => setActiveThread(thread.id)}
              >
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">#{thread.id}</span>
                  <h4 className="font-medium text-gray-900">{thread.title}</h4>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {thread.messages.length} message{thread.messages.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="col-span-1 md:col-span-2">
            {activeThread ? (
              <>
                <div className="h-[400px] overflow-y-auto mb-4 pr-4 space-y-4">
                  {threads
                    .find((t) => t.id === activeThread)
                    ?.messages.map((message) => (
                      <div key={message.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {members.find((m) => m.id === message.authorId)?.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                      </div>
                    ))}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 pl-4 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Select a thread to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 