import axios from "axios";

axios.defaults.baseURL = "https://ftl-cryptokitties.fly.dev/api";

const getAll = async (page, per_page, sort_by, sort_dir) => {
  axios.defaults.params = {
    page,
    per_page,
    sort_by,
    sort_dir,
  };
  const result = await axios.get("/crypto_kitties");
  return result;
};

export default getAll;
