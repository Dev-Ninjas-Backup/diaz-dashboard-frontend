# About Us Components

Reusable components for managing the About Us page content.

## Structure

```
AboutUs/
├── types.ts                  # TypeScript interfaces
├── AboutUsHeader.tsx         # Page header with navigation and actions
├── AboutUsForm.tsx           # Form fields for About Us content
├── AboutUsSidebar.tsx        # Site selector and page info
├── AboutUsPreview.tsx        # Preview mode display
└── index.ts                  # Centralized exports
```

## Components

### AboutUsHeader

Header component with back navigation, preview toggle, and save button.

**Props:**

- `isPreviewMode`: boolean - Current preview state
- `onTogglePreview`: () => void - Toggle preview mode
- `onSave`: () => void - Save handler
- `onBack`: () => void - Back navigation handler

### AboutUsForm

Form component with all input fields for About Us content.

**Props:**

- `formData`: AboutUsFormData - Form state
- `onInputChange`: (e: React.ChangeEvent) => void - Input change handler
- `onDescriptionChange`: (value: string) => void - Rich text editor change handler

**Fields:**

- About Title (text input)
- About Description (rich text editor)
- Mission (textarea)
- Vision (textarea)

### AboutUsSidebar

Sidebar with site selection and page information.

**Props:**

- `selectedSite`: 'FLORIDA' | 'JUPITER' - Current selected site
- `onSiteChange`: (e: React.ChangeEvent<HTMLSelectElement>) => void - Site change handler
- `updatedAt?`: string - Last updated timestamp

### AboutUsPreview

Preview component that displays the formatted content.

**Props:**

- `formData`: AboutUsFormData - Form data to display

## API Integration

The About Us page integrates with three API endpoints:

### 1. Get About Us Data

```typescript
useGetAboutUsContentQuery(site: string)
```

**Returns:**

```typescript
{
  id: string;
  site: 'FLORIDA' | 'JUPITER';
  aboutTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Create About Us

```typescript
useCreateAboutUsMutation();
```

**Request:**

- Query Param: `site` (FLORIDA | JUPITER)
- Body:

```typescript
{
  aboutTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
}
```

### 3. Update About Us

```typescript
useUpdateAboutUsMutation();
```

**Request:**

- Query Param: `site` (FLORIDA | JUPITER)
- Body:

```typescript
{
  aboutTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
}
```

## Usage Example

```tsx
import {
  AboutUsForm,
  AboutUsHeader,
  AboutUsPreview,
  AboutUsSidebar,
  type AboutUsFormData,
} from '@/components/AboutUs';

const AboutUsPage = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<AboutUsFormData>({
    aboutTitle: '',
    aboutDescription: '',
    mission: '',
    vision: '',
    site: 'FLORIDA',
  });

  return (
    <div>
      <AboutUsHeader
        isPreviewMode={isPreviewMode}
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        onSave={handleSave}
        onBack={handleBack}
      />

      {isPreviewMode ? (
        <AboutUsPreview formData={formData} />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <AboutUsForm
            formData={formData}
            onInputChange={handleInputChange}
            onDescriptionChange={handleDescriptionChange}
          />
          <AboutUsSidebar
            selectedSite={selectedSite}
            onSiteChange={handleSiteChange}
            updatedAt={data?.updatedAt}
          />
        </div>
      )}
    </div>
  );
};
```

## Features

✅ **Modular Components** - Each component has a single responsibility
✅ **Type Safety** - Full TypeScript support with interfaces
✅ **API Integration** - Handles create and update operations automatically
✅ **Rich Text Editor** - Uses the same editor as FAQ and PrivacyPolicy pages
✅ **Preview Mode** - Toggle between edit and preview modes
✅ **Site Selection** - Switch between FLORIDA and JUPITER sites
✅ **Auto-save Logic** - Automatically chooses create or update based on data existence
✅ **Validation** - Validates required fields before submission
✅ **Loading States** - Shows loading indicator while fetching data
✅ **Error Handling** - User-friendly error messages with SweetAlert2

## Logic Flow

1. **On Mount**: Fetch About Us data for selected site
2. **Data Exists**: Populate form fields with existing data
3. **No Data**: Keep fields empty
4. **On Save**:
   - If data exists (`aboutUsData?.id`): Call `updateAboutUs` API
   - If no data: Call `createAboutUs` API
5. **On Site Change**: Fetch new data for the selected site
6. **On Success**: Show success message and navigate to content management page
7. **On Error**: Show error message with details
