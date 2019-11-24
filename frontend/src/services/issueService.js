import http from "services/httpService";

const ISSUE_URL = process.env.REACT_APP_BACKEND_URL + "/issues";

const getAll = async query => {
  // query should be an object with properties project:projectId an openBy: userId
  let queryString = "?";
  let { project, openBy } = query;
  if (project) queryString = queryString + `project=${project}`;
  if (openBy) queryString = queryString + `openBy=${openBy}`;

  const { data } = await http.get(ISSUE_URL + queryString);
  return data;
};

const getOne = async id => {
  const { data } = await http.get(ISSUE_URL, { id });
  return data;
};

// Combine put and post into save
const save = async issue => {
  // if _id exist then that mean issue already exist (_id created by mongodb database)
  if (issue._id) {
    // passed in by state, hence if delete ._id directly, state will also be affected => clone it first
    const body = { ...issue };
    delete body._id;
    const { data } = await http.put(ISSUE_URL + "/" + issue._id, body);
    console.log("Issue updated", data);
    return data;
  }
  const { data } = await http.post(ISSUE_URL, issue);
  console.log("Issue created", data);
  return data;
};

const remove = async id => {
  const { data } = await http.delete(ISSUE_URL + "/" + id);
  return data;
};

export default { getAll, getOne, save, remove };
