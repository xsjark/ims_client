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
            error: {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'An unexpected error occurred',
            },
        };
    }
};

export default fetchApi;