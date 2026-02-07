/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from '@/redux/features/adminBannerApi/adminBannerApi';
import { ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

interface SectionState {
  _id?: string;
  bannerTitle: string;
  subtitle: string;
  backgroundPreview: string | null;
  backgroundFile?: File | null;
  backgroundIsVideo?: boolean;
  isExisting: boolean;
}

interface HomeBannersSectionProps {
  website: 'FLORIDA' | 'JUPITER';
}

const HomeBannersSection: React.FC<HomeBannersSectionProps> = ({
  website,
}: {
  website: string;
}) => {
  const [accordions, setAccordions] = useState<AccordionSection[]>([
    { id: 'hero', title: 'Homepage Hero Banner', isOpen: true },
    { id: 'blogs', title: 'Blogs', isOpen: false },
    { id: 'contact', title: 'Contact', isOpen: false },
    { id: 'search', title: 'Search', isOpen: false },
    { id: 'privacy', title: 'Privacy Policy', isOpen: false },
    { id: 'terms', title: 'Terms of Service', isOpen: false },
  ]);

  const pageMap: Record<string, string> = {
    hero: 'HOME',
    blogs: 'BLOG',
    contact: 'CONTACT',
    search: 'SEARCH',
    privacy: 'PRIVACY_POLICY',
    terms: 'TERMS_AND_CONDITION',
  };

  const [sectionsState, setSectionsState] = useState<
    Record<string, SectionState>
  >(() => ({
    hero: {
      bannerTitle: 'FLORIDA YACHT TRADER',
      subtitle: "The World's most affordable and safe marketplace",
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
    blogs: {
      bannerTitle: '',
      subtitle: '',
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
    contact: {
      bannerTitle: '',
      subtitle: '',
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
    search: {
      bannerTitle: '',
      subtitle: '',
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
    privacy: {
      bannerTitle: '',
      subtitle: '',
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
    terms: {
      bannerTitle: '',
      subtitle: '',
      backgroundPreview: null,
      backgroundFile: null,
      backgroundIsVideo: false,
      isExisting: false,
    },
  }));

  const logoInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Use RTK Query; only fetch when section is open using skip option
  const queries = Object.keys(pageMap).map((key) => {
    const isOpen = accordions.find((a) => a.id === key)?.isOpen;
    return useGetSingleBannerQuery(
      { page: pageMap[key], site: website },
      { skip: !isOpen },
    );
  });

  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const handleLogoUpload = (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSectionsState((prev) => ({
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            backgroundPreview: reader.result as string,
            backgroundFile: file,
            backgroundIsVideo: file.type.startsWith('video'),
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearBackgroundPreview = (sectionId: string) => {
    setSectionsState((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        backgroundPreview: null,
        backgroundFile: null,
        backgroundIsVideo: false,
      },
    }));
    const ref = logoInputRefs.current[sectionId];
    if (ref) ref.value = '';
  };

  const handleSaveChanges = async (sectionId: string) => {
    const page = pageMap[sectionId];
    const state = sectionsState[sectionId];

    try {
      if (state.isExisting && state._id) {
        // update
        const payload: any = { id: state._id };
        if (state.bannerTitle) payload.bannerTitle = state.bannerTitle;
        if (state.subtitle) payload.subtitle = state.subtitle;
        if (state.backgroundFile) payload.background = state.backgroundFile;

        const updatePromise = updateBanner(payload).unwrap();
        try {
          const res: any = await toast.promise(updatePromise, {
            loading: `Updating ${pageMap[sectionId]}...`,
            success: `Updated ${pageMap[sectionId]} banner`,
            error: (err: any) => {
              const msg = err?.data?.message || err?.message || 'Update failed';
              return `Update failed: ${msg}`;
            },
          });

          // sync response
          setSectionsState((prev) => ({
            ...prev,
            [sectionId]: {
              ...prev[sectionId],
              _id: res._id || res.id || prev[sectionId]._id,
              backgroundPreview:
                res.background?.url || prev[sectionId].backgroundPreview,
              isExisting: true,
              backgroundFile: null,
            },
          }));
        } catch (err) {
          // toast.promise already showed an error; keep console for debug

          console.error('Update error', err);
        }
      } else {
        // create
        const payload: any = {
          page,
          site: website,
          bannerTitle: state.bannerTitle,
        } as any;
        if (state.subtitle) payload.subtitle = state.subtitle;
        if (state.backgroundFile) payload.background = state.backgroundFile;

        const createPromise = createBanner(payload).unwrap();
        try {
          const res: any = await toast.promise(createPromise, {
            loading: `Creating ${pageMap[sectionId]}...`,
            success: `Created ${pageMap[sectionId]} banner`,
            error: (err: any) => {
              const msg = err?.data?.message || err?.message || 'Create failed';
              return `Create failed: ${msg}`;
            },
          });

          setSectionsState((prev) => ({
            ...prev,
            [sectionId]: {
              ...prev[sectionId],
              _id: res._id || res.id,
              backgroundPreview:
                res.background?.url || prev[sectionId].backgroundPreview,
              isExisting: true,
              backgroundFile: null,
            },
          }));
        } catch (err) {
          // toast.promise showed error

          console.error('Create error', err);
        }
      }
    } catch (err) {
      // simple console for now
      // in real app show toast

      console.error('Save banner error', err);
    }
  };

  const toggleAccordion = (id: string) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id ? { ...acc, isOpen: !acc.isOpen } : acc,
      ),
    );
  };

  // Sync query results into local state once they arrive
  useEffect(() => {
    Object.keys(pageMap).forEach((sectionId, idx) => {
      const query = queries[idx];
      const data: any = query.data;
      if (query.isError) {
        const pageName = pageMap[sectionId];
        toast.error(`Failed to load ${pageName} banner`);
        return;
      }
      if (data) {
        setSectionsState((prev) => ({
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            _id: (data as any)._id || (data as any).id,
            bannerTitle:
              (data as any).bannerTitle || prev[sectionId].bannerTitle,
            subtitle: (data as any).subtitle || prev[sectionId].subtitle,
            backgroundPreview:
              (data as any).background?.url ||
              prev[sectionId].backgroundPreview,
            backgroundIsVideo:
              (data as any).background?.fileType === 'video' ||
              (data as any).background?.mimeType?.startsWith?.('video'),
            isExisting: true,
          },
        }));
      }
    });
  }, [
    queries.map((q) => q.data).join?.(),
    accordions.map((a) => a.isOpen).join?.(),
    website,
  ]);

  useEffect(() => {
    setAccordions((prev) =>
      prev.map((accordion) => ({
        ...accordion,
        isOpen: false,
      })),
    );
  }, [website]);
  return (
    <div className="space-y-4">
      {/* Homepage Hero Banner Accordion */}
      {accordions.map((accordion) => (
        <div
          key={accordion.id}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(accordion.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-900">
              {accordion.title}
            </span>
            {accordion.isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {accordion.isOpen && (
            <div className="p-6 border-t border-gray-100 space-y-6">
              {/* Banner Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={sectionsState[accordion.id]?.bannerTitle || ''}
                  onChange={(e) =>
                    setSectionsState((prev) => ({
                      ...prev,
                      [accordion.id]: {
                        ...prev[accordion.id],
                        bannerTitle: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={sectionsState[accordion.id]?.subtitle || ''}
                  onChange={(e) =>
                    setSectionsState((prev) => ({
                      ...prev,
                      [accordion.id]: {
                        ...prev[accordion.id],
                        subtitle: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Video/Image (Upload)
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                    <input
                      ref={(el) => {
                        logoInputRefs.current[accordion.id] = el;
                      }}
                      type="file"
                      onChange={(e) => handleLogoUpload(accordion.id, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*,video/*"
                    />
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">
                        Click to upload or drag and drop (image or video)
                      </p>
                      {sectionsState[accordion.id]?.backgroundFile?.name && (
                        <p className="mt-2 text-xs text-gray-600">
                          Selected:{' '}
                          {sectionsState[accordion.id]?.backgroundFile?.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview-only (right column) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Video/Image (Preview)
                  </label>
                  {sectionsState[accordion.id]?.backgroundPreview ? (
                    <div className="relative border-2 border-gray-300 rounded-lg p-4 group">
                      <button
                        onClick={() => clearBackgroundPreview(accordion.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        aria-label="Remove background"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {sectionsState[accordion.id]?.backgroundIsVideo ? (
                        <video
                          src={
                            sectionsState[accordion.id]?.backgroundPreview || ''
                          }
                          className="w-full h-32 object-cover rounded"
                          controls
                        />
                      ) : (
                        <img
                          src={
                            sectionsState[accordion.id]?.backgroundPreview || ''
                          }
                          alt="Background preview"
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <p className="text-xs text-gray-500">
                        No background selected
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Changes Button */}
              <div>
                <button
                  onClick={() => handleSaveChanges(accordion.id)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {sectionsState[accordion.id]?.isExisting
                    ? 'Update'
                    : 'Create'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeBannersSection;
