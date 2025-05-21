export const getTradeData = async (queries: {
  station?: string;
  artifact?: string;
  historic?: string;
}) => {
  try {
    let token = localStorage.getItem("ttk");

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

    if (res.status === 403) {
      localStorage.removeItem("ttk");
      window.location.reload();
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
