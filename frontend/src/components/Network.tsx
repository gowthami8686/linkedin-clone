import React, { useState } from 'react';
import { UserPlus, Users, Search, CheckCircle } from 'lucide-react';

const Network: React.FC = () => {
  const [connections, setConnections] = useState([
    { id: 1, name: 'Sarah Johnson', title: 'Software Engineer at Google', avatar: 'SJ', mutual: 12, connected: false },
    { id: 2, name: 'Mike Chen', title: 'Product Manager at Microsoft', avatar: 'MC', mutual: 8, connected: false },
    { id: 3, name: 'Emily Davis', title: 'UX Designer at Apple', avatar: 'ED', mutual: 15, connected: false },
    { id: 4, name: 'David Wilson', title: 'Data Scientist at Netflix', avatar: 'DW', mutual: 5, connected: false },
  ]);

  const [invitations, setInvitations] = useState([
    { id: 1, name: 'Alex Thompson', title: 'Frontend Developer at Meta', avatar: 'AT', mutual: 3, status: 'pending' },
    { id: 2, name: 'Lisa Brown', title: 'Backend Engineer at Amazon', avatar: 'LB', mutual: 7, status: 'pending' },
  ]);

  const handleConnect = (userId: number) => {
    setConnections(prev => 
      prev.map(connection => 
        connection.id === userId 
          ? { ...connection, connected: true }
          : connection
      )
    );
  };

  const handleAcceptInvitation = (invitationId: number) => {
    setInvitations(prev => 
      prev.map(invitation => 
        invitation.id === invitationId 
          ? { ...invitation, status: 'accepted' }
          : invitation
      )
    );
  };

  const handleIgnoreInvitation = (invitationId: number) => {
    setInvitations(prev => 
      prev.map(invitation => 
        invitation.id === invitationId 
          ? { ...invitation, status: 'ignored' }
          : invitation
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Network Stats */}
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-linkedin-darkGray mb-4">My Network</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-linkedin-blue">500+</div>
            <div className="text-sm text-linkedin-gray">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-linkedin-blue">
              {invitations.filter(inv => inv.status === 'pending').length}
            </div>
            <div className="text-sm text-linkedin-gray">Pending Invitations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-linkedin-blue">25</div>
            <div className="text-sm text-linkedin-gray">Groups</div>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">Invitations</h2>
          <button className="text-linkedin-blue hover:text-linkedin-darkBlue text-sm">
            See all
          </button>
        </div>
        <div className="space-y-4">
          {invitations.filter(inv => inv.status === 'pending').map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between p-4 border border-linkedin-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {invitation.avatar}
                </div>
                <div>
                  <p className="font-semibold text-linkedin-darkGray">{invitation.name}</p>
                  <p className="text-sm text-linkedin-gray">{invitation.title}</p>
                  <p className="text-xs text-linkedin-gray">{invitation.mutual} mutual connections</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAcceptInvitation(invitation.id)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleIgnoreInvitation(invitation.id)}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Ignore
                </button>
              </div>
            </div>
          ))}
          {invitations.filter(inv => inv.status === 'accepted').map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {invitation.avatar}
                </div>
                <div>
                  <p className="font-semibold text-linkedin-darkGray">{invitation.name}</p>
                  <p className="text-sm text-linkedin-gray">{invitation.title}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connection accepted
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* People You May Know */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">People you may know</h2>
          <button className="text-linkedin-blue hover:text-linkedin-darkBlue text-sm">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="border border-linkedin-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {connection.avatar}
                </div>
                <div>
                  <p className="font-semibold text-linkedin-darkGray">{connection.name}</p>
                  <p className="text-sm text-linkedin-gray">{connection.title}</p>
                  <p className="text-xs text-linkedin-gray">{connection.mutual} mutual connections</p>
                </div>
              </div>
              {connection.connected ? (
                <button className="w-full bg-green-100 text-green-700 text-sm py-2 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Connected
                </button>
              ) : (
                <button 
                  onClick={() => handleConnect(connection.id)}
                  className="w-full btn-primary text-sm py-2"
                >
                  <UserPlus className="w-4 h-4 mr-2 inline" />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-linkedin-darkGray">Groups</h2>
          <button className="text-linkedin-blue hover:text-linkedin-darkBlue text-sm">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-linkedin-border rounded-lg p-4">
            <h3 className="font-semibold text-linkedin-darkGray mb-2">React Developers</h3>
            <p className="text-sm text-linkedin-gray mb-3">15,234 members</p>
            <button className="w-full btn-primary text-sm py-2">Join</button>
          </div>
          <div className="border border-linkedin-border rounded-lg p-4">
            <h3 className="font-semibold text-linkedin-darkGray mb-2">UX Design Community</h3>
            <p className="text-sm text-linkedin-gray mb-3">8,567 members</p>
            <button className="w-full btn-primary text-sm py-2">Join</button>
          </div>
          <div className="border border-linkedin-border rounded-lg p-4">
            <h3 className="font-semibold text-linkedin-darkGray mb-2">Product Management</h3>
            <p className="text-sm text-linkedin-gray mb-3">12,890 members</p>
            <button className="w-full btn-primary text-sm py-2">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network; 