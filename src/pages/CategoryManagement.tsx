/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Category,
  CategoryFormData,
} from '@/components/CategoryManagement';
import {
  CategoryManagementForm,
  CategoryManagementHeader,
  CategoryManagementPreview,
} from '@/components/CategoryManagement';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryListsQuery,
  useUpdateCategoryMutation,
} from '@/redux/features/contentmanagement/contentmanagement';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CategoryManagement: React.FC = () => {
  const {
    data: categoryListData,
    isLoading: isCategoryLoading,
    refetch,
  } = useGetCategoryListsQuery({});

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [categories, setCategories] = useState<CategoryFormData[]>([]);

  // Load categories from API
  useEffect(() => {
    console.log('Category List Data:', categoryListData);

    // Check if data is directly an array or nested under 'data'
    const categoriesArray = Array.isArray(categoryListData)
      ? categoryListData
      : categoryListData?.data;

    if (categoriesArray && Array.isArray(categoriesArray)) {
      const loadedCategories: CategoryFormData[] = categoriesArray.map(
        (category: Category) => ({
          id: category.id,
          title: category.title,
          imagePreview: category.image?.url || '',
        }),
      );
      console.log('Loaded Categories:', loadedCategories);
      setCategories(loadedCategories);
    }
  }, [categoryListData]);

  const handleAddCategory = () => {
    const newCategory: CategoryFormData = {
      id: `temp-${Date.now()}`,
      title: '',
      imagePreview: '',
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleUpdateCategory = (
    id: string,
    field: keyof CategoryFormData,
    value: string | File,
  ) => {
    // Only update local state - no API call until user clicks Update button
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, [field]: value } : category,
      ),
    );
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Update local state only - no API call until user clicks Update button
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id
            ? {
              ...category,
              imageFile: file,
              imagePreview: reader.result as string,
            }
            : category,
        ),
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (id: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
            ...category,
            imageFile: undefined,
            imagePreview: '',
          }
          : category,
      ),
    );
  };

  const handleSaveCategory = async (id: string) => {
    console.log('handleSaveCategory called with id:', id);
    console.log('Current categories state:', categories);

    if (!id || id === 'undefined') {
      Swal.fire('Error', 'Invalid category ID', 'error');
      console.error('Invalid category ID:', id);
      return;
    }

    const category = categories.find((c) => {
      console.log(
        'Checking category:',
        c,
        'c.id:',
        c.id,
        'matches:',
        c.id === id,
      );
      return c.id === id;
    });

    if (!category) {
      Swal.fire('Error', 'Category not found', 'error');
      console.error(
        'Category not found for ID:',
        id,
        'Available categories:',
        categories,
      );
      return;
    }

    if (!category.title.trim()) {
      Swal.fire('Error', 'Please fill in the category title', 'error');
      return;
    }

    console.log('Updating category:', {
      id,
      title: category.title,
      hasImage: !!category.imageFile,
    });

    try {
      const formData = new FormData();
      formData.append('title', category.title);

      if (category.imageFile) {
        formData.append('image', category.imageFile);
      }

      const result = await updateCategory({
        categoryId: id,
        categoryContent: formData,
      }).unwrap();
      console.log('Update result:', result);
      await refetch();
      Swal.fire('Success!', 'Category updated successfully', 'success');
    } catch (error: any) {
      console.error('Error updating category:', error);
      Swal.fire(
        'Error!',
        error?.message || 'Failed to update category',
        'error',
      );
    }
  };

  const handleCreateCategory = async (id: string) => {
    const category = categories.find((c) => c.id === id);

    if (!category) {
      Swal.fire('Error', 'Category not found', 'error');
      return;
    }

    if (!category.title.trim()) {
      Swal.fire('Error', 'Please fill in the category title', 'error');
      return;
    }

    if (!category.imageFile) {
      Swal.fire(
        'Error',
        'Please upload an image for the new category',
        'error',
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', category.title);
      formData.append('image', category.imageFile);

      await createCategory(formData).unwrap();
      await refetch();
      Swal.fire('Success!', 'Category created successfully', 'success');
    } catch (error: any) {
      console.error('Error creating category:', error);
      Swal.fire(
        'Error!',
        error?.message || 'Failed to create category',
        'error',
      );
    }
  };

  const handleRemoveCategory = async (id: string) => {
    // If it's an existing category from the backend
    if (!id.startsWith('temp-')) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This category will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        try {
          await deleteCategory(id).unwrap();
          await refetch();
          Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete category.', 'error');
        }
      }
    } else {
      // Just remove from local state if it's a temporary category
      setCategories((prev) => prev.filter((category) => category.id !== id));
    }
  };

  // const handleSave = async () => {
  //   // Only save new (temp) categories
  //   const tempCategories = categories.filter((category) =>
  //     category.id?.startsWith('temp-'),
  //   );

  //   if (tempCategories.length === 0) {
  //     Swal.fire(
  //       'Info',
  //       'No new categories to save. Existing categories are updated automatically.',
  //       'info',
  //     );
  //     return;
  //   }

  //   // Validate new categories
  //   const hasEmptyFields = tempCategories.some(
  //     (category) => !category.title.trim() || !category.imageFile,
  //   );

  //   if (hasEmptyFields) {
  //     Swal.fire(
  //       'Error',
  //       'Please fill in all category titles and upload images for new categories',
  //       'error',
  //     );
  //     return;
  //   }

  //   try {
  //     const promises = tempCategories.map(async (category) => {
  //       const formData = new FormData();
  //       formData.append('title', category.title);
  //       if (category.imageFile) {
  //         formData.append('image', category.imageFile);
  //       }
  //       return createCategory(formData).unwrap();
  //     });

  //     await Promise.all(promises);
  //     await refetch();
  //     Swal.fire('Success!', 'New categories created successfully', 'success');
  //   } catch (error: any) {
  //     console.error('Error saving categories:', error);
  //     Swal.fire(
  //       'Error!',
  //       error?.message || 'Failed to save categories',
  //       'error',
  //     );
  //   }
  // };

  const handleBack = () => {
    navigate('/content');
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const isSaving = isCreating || isUpdating || isDeleting;

  if (isCategoryLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <CategoryManagementHeader
        isPreviewMode={isPreviewMode}
        onTogglePreview={handleTogglePreview}
        onBack={handleBack}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!isPreviewMode ? (
          <CategoryManagementForm
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onRemoveCategory={handleRemoveCategory}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
            onSaveCategory={handleSaveCategory}
            onCreateCategory={handleCreateCategory}
            isLoading={isSaving}
          />
        ) : (
          <CategoryManagementPreview categories={categories} />
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
