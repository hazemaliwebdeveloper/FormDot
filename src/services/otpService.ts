const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const sendOTP = async (phoneNumber: string): Promise<{ success: boolean; message: string; devOTP?: string }> => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-whatsapp-otp/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send OTP');
  }

  return response.json();
};

export const verifyOTP = async (phoneNumber: string, otpCode: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/send-whatsapp-otp/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber, otpCode }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to verify OTP');
  }

  return response.json();
};
