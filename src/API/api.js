const API_URL = 'http://localhost:3000';

async function fetchApi(endpoint, method = 'GET', body, token) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include', // This is important for handling cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error;
        }

        return data;
    } catch (error) {
        return {
            data: null,
            error: {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'An unexpected error occurred',
            },
        };
    }
}

export const api = {
    login: (email, password) => fetchApi('/auth/login', 'POST', { email, password }),

    refreshToken: () => fetchApi('/auth/refresh-token', 'POST'),

    logout: (token) => fetchApi('/auth/logout', 'POST', undefined, token),

    verifyToken: (token) => fetchApi('/auth/verify-token', 'GET', undefined, token),
};