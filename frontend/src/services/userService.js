import http from "services/httpService";

const USER_URL = process.env.REACT_APP_BACKEND_URL + "/users";

const getOne = async id => {
  const { data } = await http.get(USER_URL + "/" + id);
  return data;
};
export default { getOne };
