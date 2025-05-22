export const getToken = async () => {
  try {
    const res = await fetch(
      "https://api.jellyfaas.com/auth-service/v1/validate",
      {
        headers: {
          "x-jf-apikey": process.env.TOKEN || "",
        },
        cache: 'no-store' 
      }
    );
    const data = await res.json();
    return data?.token;
  } catch (error) {
    return null;
  }
};
