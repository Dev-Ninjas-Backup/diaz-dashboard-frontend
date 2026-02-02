import {
  Clock,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import React from 'react';
import { type ContactInfoFormData } from './types';

interface ContactInfoPreviewProps {
  formData: ContactInfoFormData;
}

const ContactInfoPreview: React.FC<ContactInfoPreviewProps> = ({
  formData,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Background Image */}
      {formData.backgroundImage && (
        <div className="relative h-64 w-full">
          <img
            src={
              formData.backgroundImage.preview ||
              formData.backgroundImage.url ||
              ''
            }
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-white/90">Get in touch with our team</p>
          </div>
        </div>
      )}

      <div className="p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>

            {/* Address */}
            {formData.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">{formData.address}</p>
                </div>
              </div>
            )}

            {/* Email */}
            {formData.email && (
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href={`mailto:${formData.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {formData.email}
                  </a>
                </div>
              </div>
            )}

            {/* Phone */}
            {formData.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a
                    href={`tel:${formData.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {formData.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Social Media */}
            {(formData.socialMedia.facebook ||
              formData.socialMedia.twitter ||
              formData.socialMedia.linkedin ||
              formData.socialMedia.youtube) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {formData.socialMedia.facebook && (
                    <a
                      href={formData.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {formData.socialMedia.twitter && (
                    <a
                      href={formData.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {formData.socialMedia.linkedin && (
                    <a
                      href={formData.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {formData.socialMedia.youtube && (
                    <a
                      href={formData.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Working Hours */}
          {formData.workingHours.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Working Hours
              </h2>
              <div className="space-y-3">
                {formData.workingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      {item.day}
                    </span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPreview;
