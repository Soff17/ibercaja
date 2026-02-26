import axios from "axios";
import { getSession } from "next-auth/react";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_FASTAPI_URL,
	withCredentials: true,
});

api.interceptors.request.use(async (config) => {
	const session = await getSession();
	const token = session?.accessToken;

	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	if (!config.headers?.["Content-Type"]) {
		config.headers["Content-Type"] = "application/json";
	}

	return config;
});
