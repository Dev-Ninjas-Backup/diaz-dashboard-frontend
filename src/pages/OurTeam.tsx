/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateOurTeamMutation,
  useDeleteOurTeamMutation,
  useGetOurTeamQuery,
  useUpdateOurTeamMutation,
  type TeamMember,
} from '@/redux/features/ourTeam/outTeamApi';
import { ArrowLeft, Edit2, Plus, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface TeamMemberFormData {
  name: string;
  designation: string;
  image: File | null;
  isActive: boolean;
}

interface EditingMember extends TeamMemberFormData {
  id?: string;
  existingImageUrl?: string;
}

const OurTeam: React.FC = () => {
  const navigate = useNavigate();
  const { data: ourTeamData, isLoading: isOurTeamLoading } =
    useGetOurTeamQuery();
  const [createTeamMember, { isLoading: isCreating }] =
    useCreateOurTeamMutation();
  const [updateTeamMember, { isLoading: isUpdating }] =
    useUpdateOurTeamMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] =
    useDeleteOurTeamMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<EditingMember | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    designation: '',
    image: null,
    isActive: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCreateForm = () => {
    setFormData({
      name: '',
      designation: '',
      image: null,
      isActive: true,
    });
    setImagePreview(null);
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const openEditForm = (member: TeamMember) => {
    setFormData({
      name: member.name,
      designation: member.designation,
      image: null,
      isActive: member.isActive,
    });
    setEditingMember({
      id: member.id,
      name: member.name,
      designation: member.designation,
      image: null,
      isActive: member.isActive,
      existingImageUrl: member.image?.url,
    });
    setImagePreview(member.image?.url || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingMember(null);
    setFormData({
      name: '',
      designation: '',
      image: null,
      isActive: true,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.designation.trim()) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    if (!editingMember && !formData.image) {
      Swal.fire('Error', 'Please upload an image', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      // Backend expects boolean - send as string representation
      formDataToSend.append('isActive', formData.isActive ? 'true' : 'false');

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editingMember?.id) {
        await updateTeamMember({
          id: editingMember.id,
          data: formDataToSend,
        }).unwrap();
        Swal.fire('Success!', 'Team member updated successfully', 'success');
      } else {
        await createTeamMember(formDataToSend).unwrap();
        Swal.fire('Success!', 'Team member created successfully', 'success');
      }
      closeForm();
    } catch (error: any) {
      Swal.fire('Error!', error?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteTeamMember(id).unwrap();
        Swal.fire('Deleted!', 'Team member has been deleted.', 'success');
      } catch (error: any) {
        Swal.fire(
          'Error!',
          error?.data?.message || 'Failed to delete team member',
          'error',
        );
      }
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
              Our Team Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage team members and their information
            </p>
          </div>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {/* Team Members List */}
      {isOurTeamLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      ) : ourTeamData?.data && ourTeamData.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...ourTeamData.data]
            .sort((a, b) => a.order - b.order)
            .map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {member.image?.url && (
                  <img
                    src={member.image.url}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 text-sm font-medium">
                        {member.designation}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        member.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => openEditForm(member)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">No team members found</p>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Team Member
          </button>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo{' '}
                  {!editingMember && <span className="text-red-500">*</span>}
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">
                      {imagePreview ? 'Change Photo' : 'Upload Photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name..."
                  required
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter designation..."
                  required
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Active Status (Display on website)
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  disabled={isCreating || isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingMember ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <span>
                      {editingMember ? 'Update Member' : 'Create Member'}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTeam;
