import { getXCSRFToken } from "./getXCSRFToken";

const API_URL = 'http://localhost:3000';

async function fetchApi(endpoint, method = 'GET', body, token, XCSRFToken) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (XCSRFToken) {
        headers['X-CSRF-Token'] = getXCSRFToken();
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error;
        }

        return data;
    } catch (error) {
        return {
            data: null,
            error: error,
        };
    }
};

export default fetchApi;