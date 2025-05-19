export const getTradeData = async (queries: {
  station?: string;
  artifact?: string;
  historic?: string;
}) => {
  try {
    const token = localStorage.getItem("ttk");
    const queryString = Object.entries(queries)
      .filter(([, value]) => value != null && value !== "")
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    const res = await fetch("/get-data?" + queryString, {
      headers: {
        jfwt: token || "",
        Referer: "https://api.jellyfaas.com",
      },
    });
    if (res.status === 404) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
