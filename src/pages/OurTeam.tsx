/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Eye, Plus, Save, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EditorPreview, RichTextEditor } from '../components/Editor';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
}

interface OurTeamFormData {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

const OurTeam: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<OurTeamFormData>({
    title: 'Meet Our Team',
    subtitle: 'The talented people behind our success',
    members: [
      {
        id: '1',
        name: '',
        position: '',
        bio: '',
        image: '',
        email: '',
        phone: '',
        socialLinks: { linkedin: '', twitter: '' },
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member) => {
        if (member.id === id) {
          if (field.startsWith('social.')) {
            const socialKey = field.split(
              '.',
            )[1] as keyof TeamMember['socialLinks'];
            return {
              ...member,
              socialLinks: { ...member.socialLinks, [socialKey]: value },
            };
          }
          return { ...member, [field]: value };
        }
        return member;
      }),
    }));
  };

  const handleImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleMemberChange(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addMember = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          id: newId,
          name: '',
          position: '',
          bio: '',
          image: '',
          email: '',
          phone: '',
          socialLinks: { linkedin: '', twitter: '' },
        },
      ],
    }));
  };

  const removeMember = (id: string) => {
    if (formData.members.length <= 1) {
      Swal.fire('Error', 'At least one team member is required', 'error');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== id),
    }));
  };

  const handleSave = async () => {
    const hasEmptyFields = formData.members.some(
      (member) => !member.name.trim() || !member.position.trim(),
    );

    if (!formData.title.trim() || hasEmptyFields) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      // TODO: Implement API call to save team data
      Swal.fire('Success!', 'Team page updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to update team page', 'error');
    }
  };

  const handleBack = () => {
    navigate('/content');
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Our Team Content
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage team member information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!isPreviewMode ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter page title..."
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subtitle..."
              />
            </div>

            {/* Team Members */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Team Members <span className="text-red-500">*</span>
                </h3>
                <button
                  onClick={addMember}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </div>

              <div className="space-y-6">
                {formData.members.map((member, index) => (
                  <div
                    key={member.id}
                    className="p-4 border border-gray-200 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">
                        Team Member {index + 1}
                      </h4>
                      {formData.members.length > 1 && (
                        <button
                          onClick={() => removeMember(member.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">
                        Profile Photo
                      </label>
                      <div className="flex items-center gap-4">
                        {member.image && (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        )}
                        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(member.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleMemberChange(
                              member.id,
                              'name',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter name..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Position <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) =>
                            handleMemberChange(
                              member.id,
                              'position',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter position..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) =>
                            handleMemberChange(
                              member.id,
                              'email',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) =>
                            handleMemberChange(
                              member.id,
                              'phone',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone..."
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Bio
                      </label>
                      <RichTextEditor
                        value={member.bio}
                        onChange={(value) =>
                          handleMemberChange(member.id, 'bio', value)
                        }
                        placeholder="Enter bio..."
                      />
                    </div>

                    {/* Social Links */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">
                        Social Links
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="url"
                            value={member.socialLinks.linkedin}
                            onChange={(e) =>
                              handleMemberChange(
                                member.id,
                                'social.linkedin',
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="LinkedIn URL..."
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            value={member.socialLinks.twitter}
                            onChange={(e) =>
                              handleMemberChange(
                                member.id,
                                'social.twitter',
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Twitter URL..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-2 text-center">
              {formData.title}
            </h1>
            {formData.subtitle && (
              <p className="text-gray-600 mb-8 text-center">
                {formData.subtitle}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.members.map((member) => (
                <div
                  key={member.id}
                  className="text-center p-6 border border-gray-200 rounded-lg"
                >
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-1">
                    {member.name || 'Name'}
                  </h3>
                  <p className="text-blue-600 mb-3">
                    {member.position || 'Position'}
                  </p>
                  {member.bio && (
                    <div className="text-left mb-3">
                      <EditorPreview content={member.bio} />
                    </div>
                  )}
                  {(member.email || member.phone) && (
                    <div className="text-sm text-gray-600 mb-2">
                      {member.email && <p>{member.email}</p>}
                      {member.phone && <p>{member.phone}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
