import { api } from "../API/api";

export function createAuthManager() {
    let user = null; // User stored in memory
    let token = null; // Access token stored in memory

    return {
        setUser(newUser) {
            user = newUser;
        },

        setToken(newToken) {
            token = newToken;
        },

        getUser() {
            return user;
        },

        getToken() {
            return token;
        },

        async verifyToken() {
            if (!token) return false;
            const { data } = await api.verifyToken(token);
            if (data) {
                this.setUser(data.user);
                return true;
            }
            this.setToken(null);
            this.setUser(null);
            return false;
        },

        async login(email, password) {
            const { data } = await api.login(email, password);
            if (data) {
                this.setUser(data.user);
                this.setToken(data.access_token);
                return true;
            }
            return false;
        },

        async logout() {
            if (token) {
                await api.logout(token);
            }
            this.setUser(null);
            this.setToken(null);
        },

        async refreshToken() {
            const { data } = await api.refreshToken();
            if (data) {
                this.setToken(data.access_token);
                return true;
            }
            return false;
        },
    };
}