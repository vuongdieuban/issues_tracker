import http from "services/httpService";

const STATUS_URL = process.env.REACT_APP_BACKEND_URL + "/status";

const getAll = async () => {
  const { data } = await http.get(STATUS_URL);
  return data;
};

export default { getAll };
