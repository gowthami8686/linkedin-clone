import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  Calendar, 
  Smile, 
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share,
  Send
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

const Feed: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        title: 'Software Engineer at Google',
        avatar: 'SJ'
      },
      content: 'Just completed an amazing project using React and TypeScript! The team collaboration was incredible. #React #TypeScript #WebDevelopment',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        title: 'Product Manager at Microsoft',
        avatar: 'MC'
      },
      content: 'Excited to share that our new product feature has been successfully launched! The user feedback has been overwhelmingly positive.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
      likes: 45,
      comments: 12,
      shares: 7,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      author: {
        name: 'Emily Davis',
        title: 'UX Designer at Apple',
        avatar: 'ED'
      },
      content: 'Design thinking workshop today was incredibly insightful. Always amazed by how user-centered design can transform products.',
      likes: 18,
      comments: 5,
      shares: 2,
      timestamp: '6 hours ago'
    }
  ]);

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          title: 'Software Developer',
          avatar: 'Y'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <div className="card p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
            Y
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Start a post..."
              className="w-full p-3 border border-linkedin-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-linkedin-gray hover:text-linkedin-blue">
                  <Image className="w-5 h-5 mr-1" />
                  <span className="text-sm">Photo</span>
                </button>
                <button className="flex items-center text-linkedin-gray hover:text-linkedin-blue">
                  <Video className="w-5 h-5 mr-1" />
                  <span className="text-sm">Video</span>
                </button>
                <button className="flex items-center text-linkedin-gray hover:text-linkedin-blue">
                  <Calendar className="w-5 h-5 mr-1" />
                  <span className="text-sm">Event</span>
                </button>
                <button className="flex items-center text-linkedin-gray hover:text-linkedin-blue">
                  <Smile className="w-5 h-5 mr-1" />
                  <span className="text-sm">Celebrate</span>
                </button>
              </div>
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="card p-4">
          <div className="flex items-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {post.author.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-linkedin-darkGray">{post.author.name}</p>
                  <p className="text-sm text-linkedin-gray">{post.author.title}</p>
                  <p className="text-xs text-linkedin-gray">{post.timestamp}</p>
                </div>
                <button className="text-linkedin-gray hover:text-linkedin-darkGray">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-linkedin-darkGray mb-3">{post.content}</p>
          
          {post.image && (
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
          )}
          
          <div className="flex items-center justify-between text-sm text-linkedin-gray border-t border-linkedin-border pt-3">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center hover:text-linkedin-blue"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center hover:text-linkedin-blue">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center hover:text-linkedin-blue">
                <Share className="w-4 h-4 mr-1" />
                <span>{post.shares}</span>
              </button>
            </div>
            <button className="flex items-center hover:text-linkedin-blue">
              <Send className="w-4 h-4 mr-1" />
              <span>Send</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed; 