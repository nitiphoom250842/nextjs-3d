import axios from "axios";

const timeout = process.env.TIMEOUT || 30000;
// const token = localStorage.getItem.(`${process.env.ACCESS_TOKEN_NAME ?? ''}`)
const token = localStorage.getItem(`${process.env.ACCESS_TOKEN_NAME ?? ""}`);

export const defaultAppAxiosConfigs = {
  timeout: Number.parseInt(`${timeout}`),
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export interface AppAxiosConfig {
  headers: any;
}

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/
export const appAxios = (config?: AppAxiosConfig) => {
  const axiosInstance = config
    ? axios.create(config)
    : axios.create(defaultAppAxiosConfigs);

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log('response api', response)
      return response;
    },
    (error) => {
      // console.log('error api error', error)
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

/**
|--------------------------------------------------
| AXIOS with multipart/form-data
|--------------------------------------------------
*/
export const appAxiosMulipart = () => {
  return appAxios({
    ...defaultAppAxiosConfigs,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
};
