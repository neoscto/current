export const sendOffer = async (data: any) => {
  await fetch('api/send-offer', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};
