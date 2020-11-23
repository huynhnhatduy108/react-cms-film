import {endpoint,endpointlocal} from "../../../constants/index";
import api from "../../drivers/index";
const TypeFilmEndpoint = `${endpointlocal}/type`;

const TypeApi = {
    Type: {
      getList: async (params) => await api.get(`${TypeFilmEndpoint}`, params),
      getDetail: async (id) => await api.get(`${TypeFilmEndpoint}/${id}`),
      create: async ({ params }) => await api.post(`${TypeFilmEndpoint}`, params),
      update: async ({ id, params }) => await api.put(`${TypeFilmEndpoint}/${id}`, params),
      delete: async (id) => await api.delete(`${TypeFilmEndpoint}/${id}`),
    },
    FilmType:{
      getListFilm: async (params) => await api.get(`${TypeFilmEndpoint}/film`, params),
      creatFilmToType: async ({id, params }) => await api.post(`${TypeFilmEndpoint}/${id}/film`, params),
      updateFilmFromType: async ({ id, params }) => await api.put(`${TypeFilmEndpoint}/${id}/film`, params),
      deleteFilmOutType: async (id) => await api.delete(`${TypeFilmEndpoint}/${id}/film`),
    }
  };
  export default TypeApi;