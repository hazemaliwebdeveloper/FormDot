export interface LeadFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  businessName: string;
  businessField: string;
  city: string;
  websiteUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  snapchatUrl?: string;
}

export interface OTPVerification {
  phoneNumber: string;
  otpCode: string;
}
