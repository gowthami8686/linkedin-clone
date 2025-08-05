import React, { useState } from 'react';
import { Send, Search, MoreHorizontal, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const Messaging: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const mockConversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Thanks for the help with the project!',
      timestamp: '2 min ago',
      unread: 1
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'MC',
      lastMessage: 'When can we schedule the meeting?',
      timestamp: '1 hour ago',
      unread: 0
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'ED',
      lastMessage: 'Great work on the presentation!',
      timestamp: '3 hours ago',
      unread: 2
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hi! How are you doing?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'I\'m doing great! How about you?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'Pretty good! I wanted to ask about the React project we discussed.',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: '4',
      sender: 'You',
      content: 'Of course! What do you need help with?',
      timestamp: '10:35 AM',
      isOwn: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you'd send this to your backend
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)]">
      <div className="card h-full flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-linkedin-border">
          <div className="p-4 border-b border-linkedin-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-linkedin-gray w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-linkedin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-linkedin-border cursor-pointer hover:bg-linkedin-lightBlue ${
                  selectedConversation === conversation.id ? 'bg-linkedin-lightBlue' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-linkedin-darkGray truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-linkedin-gray">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-linkedin-gray truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-linkedin-blue rounded-full flex items-center justify-center text-white text-xs">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-linkedin-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                    {mockConversations.find(c => c.id === selectedConversation)?.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-linkedin-darkGray">
                      {mockConversations.find(c => c.id === selectedConversation)?.name}
                    </h3>
                    <p className="text-sm text-linkedin-gray">Active now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-linkedin-gray hover:text-linkedin-blue rounded-full hover:bg-linkedin-lightBlue">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-linkedin-gray hover:text-linkedin-blue rounded-full hover:bg-linkedin-lightBlue">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-linkedin-gray hover:text-linkedin-blue rounded-full hover:bg-linkedin-lightBlue">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isOwn
                          ? 'bg-linkedin-blue text-white'
                          : 'bg-linkedin-lightBlue text-linkedin-darkGray'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-linkedin-gray'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-linkedin-border">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 border border-linkedin-border rounded-full focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-linkedin-blue text-white rounded-full hover:bg-linkedin-darkBlue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-linkedin-darkGray mb-2">
                  Select a conversation
                </h3>
                <p className="text-linkedin-gray">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messaging; 