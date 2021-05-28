import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-8e350-default-rtdb.firebaseio.com/",
});
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
