import { supabase } from './supabase';
import { LeadFormData } from '../types/lead';

export const saveLead = async (formData: LeadFormData): Promise<void> => {
  const { error } = await supabase.from('leads').insert({
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone_number: formData.phoneNumber,
    email: formData.email,
    business_name: formData.businessName,
    business_field: formData.businessField,
    city: formData.city,
    website_url: formData.websiteUrl || null,
    instagram_url: formData.instagramUrl || null,
    youtube_url: formData.youtubeUrl || null,
    tiktok_url: formData.tiktokUrl || null,
    snapchat_url: formData.snapchatUrl || null,
    is_verified: true,
  });

  if (error) {
    throw new Error(error.message);
  }
};
