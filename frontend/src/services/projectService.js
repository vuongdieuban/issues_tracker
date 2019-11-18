import http from "services/httpService";

const PROJECT_URL = process.env.REACT_APP_BACKEND_URL + "/projects";

const getAll = async () => {
  const { data } = await http.get(PROJECT_URL);
  return data;
};

const getOne = async id => {
  const { data } = await http.get(PROJECT_URL + "/" + id);
  return data;
};

// Combine put and post into save
const save = async project => {
  // if _id exist then that mean project already exist (_id created by mongodb database)
  if (project._id) {
    // passed in by state, hence if delete ._id directly, state will also be affected => clone it first
    const body = { ...project };
    delete body._id;
    const { data } = await http.put(PROJECT_URL + "/" + project._id, body);
    console.log("Project updated", data);
    return data;
  }
  const { data } = await http.post(PROJECT_URL, project);
  console.log("Project created", data);
  return data;
};

const remove = async id => {
  const { data } = await http.delete(PROJECT_URL + "/" + id);
  return data;
};

export default { getAll, getOne, save, remove };
