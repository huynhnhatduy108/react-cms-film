import {endpoint} from "../../../constants/index";
import api from "../../drivers/index";
const UserEndpoint = `${endpoint}/nguoidung`;

const UserApi = {
    User: {
      getList: async (params) => await api.get(`${UserEndpoint}`, params),
      getDetail: async (id) => await api.get(`${UserEndpoint}/${id}`),
      create: async ({ params }) => await api.post(`${UserEndpoint}`, params),
      update: async ({ id, params }) => await api.put(`${UserEndpoint}/${id}`, params),
      delete: async (id) => await api.delete(`${UserEndpoint}/${id}`),
    }
  };
  export default UserApi;