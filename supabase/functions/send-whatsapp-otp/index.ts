import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface SendOTPRequest {
  phoneNumber: string;
}

interface VerifyOTPRequest {
  phoneNumber: string;
  otpCode: string;
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const path = url.pathname;

    // Send OTP endpoint
    if (path.includes('/send') && req.method === 'POST') {
      const { phoneNumber }: SendOTPRequest = await req.json();

      if (!phoneNumber) {
        return new Response(
          JSON.stringify({ error: 'Phone number is required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Generate OTP
      const otpCode = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Save OTP to database
      const { error: insertError } = await supabase
        .from('otp_verifications')
        .insert({
          phone_number: phoneNumber,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString(),
          is_used: false,
        });

      if (insertError) {
        console.error('Error saving OTP:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to generate OTP' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // In production, integrate with WhatsApp Business API or services like Twilio, MessageBird
      // For now, we'll simulate sending and return the OTP (remove in production)
      console.log(`OTP for ${phoneNumber}: ${otpCode}`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'OTP sent successfully',
          // Remove this in production - only for development
          devOTP: otpCode 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify OTP endpoint
    if (path.includes('/verify') && req.method === 'POST') {
      const { phoneNumber, otpCode }: VerifyOTPRequest = await req.json();

      if (!phoneNumber || !otpCode) {
        return new Response(
          JSON.stringify({ error: 'Phone number and OTP code are required' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Check if OTP exists and is valid
      const { data: otpRecord, error: fetchError } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('otp_code', otpCode)
        .eq('is_used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching OTP:', fetchError);
        return new Response(
          JSON.stringify({ error: 'Verification failed' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (!otpRecord) {
        return new Response(
          JSON.stringify({ error: 'Invalid or expired OTP' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Mark OTP as used
      await supabase
        .from('otp_verifications')
        .update({ is_used: true })
        .eq('id', otpRecord.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'OTP verified successfully' 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid endpoint' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});