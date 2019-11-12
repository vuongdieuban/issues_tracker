import http from "services/httpService";

const ISSUETYPE_URL = process.env.REACT_APP_BACKEND_URL + "/issue-types";

const getAll = async () => {
  const { data } = await http.get(ISSUETYPE_URL);
  return data;
};

export default { getAll };
