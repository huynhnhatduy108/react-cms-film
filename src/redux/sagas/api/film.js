import {endpoint,endpointlocal} from "../../../constants/index";
import api from "../../drivers/index";
const FilmEndpoint = `${endpointlocal}/film`;

const FilmApi = {
    Film: {
      getList: async (params) => await api.get(`${FilmEndpoint}`, params),
      getDetail: async (id) => await api.get(`${FilmEndpoint}/${id}`),
      create: async ({ params }) => await api.post(`${FilmEndpoint}`, params),
      update: async ({ id, params }) => await api.put(`${FilmEndpoint}/${id}`, params),
      delete: async (id) => await api.delete(`${FilmEndpoint}/${id}`),
      getTypeFilm: async (id) => await api.delete(`${FilmEndpoint}/${id}/type`),
    }
  };
  export default FilmApi;