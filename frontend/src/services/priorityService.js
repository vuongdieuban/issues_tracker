import http from "services/httpService";

const PRIORITY_URL = process.env.REACT_APP_BACKEND_URL + "/priorities";

const getAll = async () => {
  const { data } = await http.get(PRIORITY_URL);
  return data;
};

export default { getAll };
