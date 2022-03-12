//Helper for one only request
export default async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok)
      throw {
        error: true,
        status: res.status,
        text: res.statusText,
      };

    const data = await res.json();

    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};
