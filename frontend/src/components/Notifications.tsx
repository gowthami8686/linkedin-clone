import React, { useState } from 'react';
import { Bell, UserPlus, ThumbsUp, MessageCircle, Briefcase, Globe } from 'lucide-react';

interface Notification {
  id: string;
  type: 'connection' | 'like' | 'comment' | 'job' | 'post' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'connection',
      title: 'Sarah Johnson accepted your connection request',
      message: 'You are now connected with Sarah Johnson',
      timestamp: '2 minutes ago',
      isRead: false,
      avatar: 'SJ'
    },
    {
      id: '2',
      type: 'like',
      title: 'Mike Chen liked your post',
      message: 'Mike Chen reacted to your post about React development',
      timestamp: '1 hour ago',
      isRead: false,
      avatar: 'MC'
    },
    {
      id: '3',
      type: 'comment',
      title: 'Emily Davis commented on your post',
      message: 'Emily Davis: "Great insights! This really helped me understand..."',
      timestamp: '3 hours ago',
      isRead: true,
      avatar: 'ED'
    },
    {
      id: '4',
      type: 'job',
      title: 'New job matching your profile',
      message: 'Senior React Developer at TechCorp Inc. - San Francisco, CA',
      timestamp: '1 day ago',
      isRead: true
    },
    {
      id: '5',
      type: 'post',
      title: 'Your network is talking about React',
      message: '5 people in your network posted about React development',
      timestamp: '2 days ago',
      isRead: true
    },
    {
      id: '6',
      type: 'general',
      title: 'LinkedIn Weekly Digest',
      message: 'Here\'s what happened in your network this week',
      timestamp: '3 days ago',
      isRead: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return <UserPlus className="w-5 h-5 text-linkedin-blue" />;
      case 'like':
        return <ThumbsUp className="w-5 h-5 text-linkedin-blue" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-linkedin-blue" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-linkedin-blue" />;
      case 'post':
        return <Globe className="w-5 h-5 text-linkedin-blue" />;
      default:
        return <Bell className="w-5 h-5 text-linkedin-blue" />;
    }
  };

  const filteredNotifications = activeTab === 'unread' 
    ? mockNotifications.filter(n => !n.isRead)
    : mockNotifications;

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-linkedin-darkGray">Notifications</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-linkedin-gray">{unreadCount} unread</span>
            <button className="text-linkedin-blue hover:text-linkedin-darkBlue text-sm">
              Mark all as read
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-linkedin-border">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 px-1 font-medium ${
              activeTab === 'all'
                ? 'text-linkedin-blue border-b-2 border-linkedin-blue'
                : 'text-linkedin-gray hover:text-linkedin-darkGray'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`pb-2 px-1 font-medium ${
              activeTab === 'unread'
                ? 'text-linkedin-blue border-b-2 border-linkedin-blue'
                : 'text-linkedin-gray hover:text-linkedin-darkGray'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`card p-4 hover:shadow-md transition-shadow cursor-pointer ${
              !notification.isRead ? 'bg-linkedin-lightBlue' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {notification.avatar ? (
                <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {notification.avatar}
                </div>
              ) : (
                <div className="w-10 h-10 bg-linkedin-lightBlue rounded-full flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      !notification.isRead ? 'text-linkedin-darkGray' : 'text-linkedin-gray'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-linkedin-gray mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-linkedin-gray mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-linkedin-blue rounded-full ml-2"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="card p-8 text-center">
          <Bell className="w-12 h-12 text-linkedin-gray mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-linkedin-darkGray mb-2">
            {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
          </h3>
          <p className="text-linkedin-gray">
            {activeTab === 'unread' 
              ? 'You\'re all caught up! Check back later for new notifications.'
              : 'You don\'t have any notifications yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications; 