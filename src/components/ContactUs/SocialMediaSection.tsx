import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { type SocialMedia } from './types';

interface SocialMediaSectionProps {
  socialMedia: SocialMedia;
  onChange: (platform: keyof SocialMedia, value: string) => void;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  socialMedia,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Social Media Links
      </h3>
      <div className="space-y-4">
        {/* Facebook */}
        <div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Facebook className="w-4 h-4" />
            Facebook
          </label>
          <input
            type="url"
            value={socialMedia.facebook || ''}
            onChange={(e) => onChange('facebook', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://facebook.com/..."
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Twitter className="w-4 h-4" />
            Twitter
          </label>
          <input
            type="url"
            value={socialMedia.twitter || ''}
            onChange={(e) => onChange('twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://twitter.com/..."
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </label>
          <input
            type="url"
            value={socialMedia.linkedin || ''}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/..."
          />
        </div>

        {/* YouTube */}
        <div>
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Youtube className="w-4 h-4" />
            YouTube
          </label>
          <input
            type="url"
            value={socialMedia.youtube || ''}
            onChange={(e) => onChange('youtube', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
