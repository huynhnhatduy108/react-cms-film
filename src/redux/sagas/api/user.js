import {endpoint,endpointlocal} from "../../../constants/index";
import api from "../../drivers/index";
const UserEndpoint = `${endpointlocal}/user`;

const UserApi = {
    User: {
      getList: async (params) => await api.get(`${UserEndpoint}`, params),
      getDetail: async (id) => await api.get(`${UserEndpoint}/${id}`),
      create: async ({ params }) => await api.post(`${UserEndpoint}`, params),
      update: async ({ id, params }) => await api.put(`${UserEndpoint}/${id}`, params),
      delete: async (id) => await api.delete(`${UserEndpoint}/${id}`),
    },
    Auth:{
      register: async (params) => await api.post(`${UserEndpoint}/register`,params),
      login: async (params) => await api.post(`${UserEndpoint}/login`,params),
      logout: async (params) => await api.get(`${UserEndpoint}/logout`,params),
      authGoogle: async (params) => await api.post(`${UserEndpoint}/auth/google`,params),
    }
  };
  export default UserApi;