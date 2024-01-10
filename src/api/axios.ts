import loadTokenAndCheckExpiration from "@/utils/loadTokenAndCheckExpiration";
import axios, { AxiosError, AxiosInstance } from "axios";

// none-member token 호출시 사용할 Instance
export const tokenInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SPOTIFY_ACCOUNT_URL,
});

// 기본적인 api 호출시 사용할 Instance
export const baseInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SPOTIFY_BASE_URL,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Bearer ${localStorage.getItem("none-member-token")}`,
	},
});

baseInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("none-member-token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

baseInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			try {
				const newToken = await loadTokenAndCheckExpiration();

				const originalRequestConfig = error.config;
				if (originalRequestConfig) {
					originalRequestConfig.headers.Authorization = `Bearer ${newToken}`;
					return axios(originalRequestConfig);
				} else {
					return Promise.reject(new Error("originalRequestConfig 에러"));
				}
			} catch (refreshError) {
				console.error("토큰 갱신 실패:", refreshError);
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);
