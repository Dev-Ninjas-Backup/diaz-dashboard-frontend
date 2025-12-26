import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { LuCalendar } from 'react-icons/lu';

type Tab = 'blog' | 'pages';

interface BlogPost {
  id: number;
  title: string;
  status: string;
  views: number;
}

interface StaticPage {
  id: number;
  title: string;
}

const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Boating: Smarter Tech',
    status: 'Published',
    views: 245,
  },
  {
    id: 2,
    title: 'Market Trends and Sales Projections',
    status: 'Published',
    views: 245,
  },
];

const DEMO_STATIC_PAGES: StaticPage[] = [
  { id: 1, title: 'About Us' },
  { id: 2, title: 'Contact' },
  { id: 3, title: 'Privacy Policy' },
  { id: 4, title: 'Terms of Service' },
];

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const [blogPosts] = useState<BlogPost[]>(DEMO_BLOG_POSTS);
  const [staticPages] = useState<StaticPage[]>(DEMO_STATIC_PAGES);

  const handleNewArticle = () => {
    console.log('Creating new article...');
  };

  const handleEditPost = (id: number) => {
    console.log('Editing post:', id);
  };

  const handleEditPage = (id: number) => {
    console.log('Editing page:', id);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Content Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage pages, blog posts, and site content
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-2 bg-gray-100 rounded-full max-w-full sm:max-w-max overflow-x-auto">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'pages'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Pages
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'blog' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Blog Articles
            </h2>
            <button
              onClick={handleNewArticle}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              New Article
            </button>
          </div>

          {/* Blog Posts List */}
          <div className="divide-y divide-gray-200">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <LuCalendar className="text-xl text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.status} • {post.views} views
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEditPost(post.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  aria-label="Edit post"
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Static Pages
            </h2>
          </div>

          {/* Static Pages List */}
          <div className="divide-y divide-gray-200">
            {staticPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {page.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleEditPage(page.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  aria-label="Edit page"
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
