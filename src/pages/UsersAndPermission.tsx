/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddAdminModal, UpdateRoleModal } from '@/components/UserPermission';
import {
  useChangeRoleMutation,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useGetAllPermissionUsersQuery,
} from '@/redux/features/permissionManagement/permission';
import type {
  CreateAdminRequest,
  PermissionUser,
  UpdateRoleRequest,
} from '@/types/permission-types';
import { MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const UsersAndPermission: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PermissionUser | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useGetAllPermissionUsersQuery({});
  const [createAdmin, { isLoading: isCreating }] =
    useCreatePermissionMutation();
  const [updateRole, { isLoading: isUpdating }] = useChangeRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeletePermissionMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.dropdown-menu') &&
        !target.closest('.dropdown-button')
      ) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openDropdownId]);

  const handleAddAdmin = () => {
    setIsAddModalOpen(true);
  };

  const handleCreateAdmin = async (data: CreateAdminRequest) => {
    try {
      await createAdmin(data).unwrap();
      toast.success('Admin created successfully');
      setIsAddModalOpen(false);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Failed to create admin');
    }
  };

  const handleUpdateRole = (user: PermissionUser) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleRoleUpdate = async (data: UpdateRoleRequest) => {
    if (!selectedUser) return;

    try {
      await updateRole({ id: selectedUser.id, data }).unwrap();
      toast.success('Role updated successfully');
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (user: PermissionUser) => {
    setOpenDropdownId(null);

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${user.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id).unwrap();
        toast.success('User deleted successfully');
      } catch (error) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || 'Failed to delete user');
      }
    }
  };

  const toggleDropdown = (userId: string) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleLabel = (role: string) => {
    return role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Error loading users. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Users & Permissions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage admin users and access control
        </p>
      </div>

      {/* Admin Users Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>

        {/* Users List */}
        <div className="divide-y divide-gray-200">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No admin users found
            </div>
          ) : (
            users.map((user: any) => (
              <div
                key={user.id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors gap-4"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {getInitials(user.name)}
                    </span>
                  </div>

                  {/* Name and Email */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Activity Info & Role */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                  {/* Activity Times */}
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Last Login:</span>{' '}
                      {formatDate(user.lastLoginAt)}
                    </div>
                    <div>
                      <span className="font-medium">Last Active:</span>{' '}
                      {formatDate(user.lastActiveAt)}
                    </div>
                  </div>

                  {/* Role Badge */}
                  <span className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg whitespace-nowrap">
                    {getRoleLabel(user.role)}
                  </span>

                  {/* More Options Button */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="dropdown-button p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="More options"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdownId === user.id && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => handleUpdateRole(user)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg"
                          disabled={isUpdating || isDeleting}
                        >
                          <Pencil className="w-4 h-4" />
                          Update Role
                        </button>
                        {user.role !== 'SUPER_ADMIN' && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                            disabled={isUpdating || isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete User
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateAdmin}
        isLoading={isCreating}
      />

      {selectedUser && (
        <UpdateRoleModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleRoleUpdate}
          currentRole={selectedUser.role}
          userName={selectedUser.name}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
};

export default UsersAndPermission;
