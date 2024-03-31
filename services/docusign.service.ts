import axios from 'axios';
const clientId = process.env.NEXT_PUBLIC_DOCUSIGN_INTEGRATION_KEY;
const clientSecret = process.env.NEXT_PUBLIC_DOCUSIGN_SECRET_KEY;
const redirectUri = process.env.NEXT_PUBLIC_DOCUSIGN_AUTH_CALLBACK;

const createAuthHeader = (accessToken: string): Record<string, string> => {
  return {
    Authorization: `Bearer ${accessToken}`
  };
};

export const authenticate = async (code: string) => {
  const authHeader = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString('base64')}`;

  const params = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri || ''
  });

  try {
    const response = await axios.post(
      `https://${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT}/oauth/token`,
      params.toString(), // Convert params to a string
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader
        }
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Error authenticating with DocuSign:', error);
    throw error;
  }
};

export const createEnvelope = async (
  accessToken: string,
  envelopeData: any
) => {
  try {
    const response = await axios.post(
      // 'https://demo.docusign.net/restapi/v2.1/accounts/2a6cb19d-7b9b-45a0-8e7e-46e03d32b79c/envelopes',
      `${process.env.NEXT_PUBLIC_DOCUSIGN_API_URL}/restapi/v2.1/accounts/${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT_ID}/envelopes`,
      envelopeData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const { envelopeId } = response.data;
    return envelopeId;
  } catch (error) {
    console.error('Error creating envelope with DocuSign:', error);
    throw error;
  }
};

export const getAuthorizationUrl = () => {
  return `https://${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT}/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=${clientId}&redirect_uri=${redirectUri}`;
};

export const getEmbeddedSigningUrl = async (
  accessToken: string,
  envelopeId: string,
  offerData: any
): Promise<string> => {
  const response = await axios.post(
    // `https://demo.docusign.net/restapi/v2.1/accounts/2a6cb19d-7b9b-45a0-8e7e-46e03d32b79c/envelopes/${envelopeId}/views/recipient`,
    `${process.env.NEXT_PUBLIC_DOCUSIGN_API_URL}/restapi/v2.1/accounts/${process.env.NEXT_PUBLIC_DOCUSIGN_ACCOUNT_ID}/envelopes/${envelopeId}/views/recipient`,
    {
      returnUrl: `${process.env.NEXT_PUBLIC_DOCUSIGN_AFTER_SIGN_REDIRECT}?offer=${offerData.offerId}&user=${offerData._id}`,
      authenticationMethod: 'email',
      phoneNumber: offerData.phoneNumber,
      email: offerData.emailAddress,
      userName: offerData.firstName,
      clientUserId: offerData._id
    },
    {
      headers: createAuthHeader(accessToken)
    }
  );

  return response.data.url;
};
