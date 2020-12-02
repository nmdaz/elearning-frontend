export default {
    namespaced: true,

    state: {
        bearerToken: null,
        user: null,
        passwordResetCallbackUrl: 'http://localhost:8080'
    },

    getters: {
        authenticated (state) {
            if (state.bearerToken && state.user) return true;
            return false;
        },

        apiUrl(state, getters, rootState) {
            return rootState.server.apiUrl;
        },

        serverUrl(state, getters, rootState) {
            return rootState.server.url;
        },

        home(state, getters, rootState) {
            return rootState.server.url + '/home';
        }
    },

    mutations: {
        authenticate (state, payload) {
            if (!payload.user) throw new Error("user is not define in payload");
            if (!payload.bearerToken) throw new Error("bearerToken is not define in payload");

            let user = payload.user;
            let bearerToken = payload.bearerToken;

            state.user = Object.assign({}, user);
            state.bearerToken = bearerToken;

            sessionStorage.setItem('bearerToken', bearerToken);
            sessionStorage.setItem('user', JSON.stringify(user));

            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;
        },
        refreshAuthFromSession (state) {
            let bearerToken = sessionStorage.getItem('bearerToken');
            let user = JSON.parse(sessionStorage.getItem('user'));

            if (bearerToken && user) {
                state.user = Object.assign({}, user);
                state.bearerToken = bearerToken;

                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;
            }
        },
        logout (state) {
            sessionStorage.clear();
            state.bearerToken = null;
            state.user = null;
        }
    },

    actions: {
        async login ({commit, getters}, payload) {
            try {
                const url = `${getters.apiUrl}/auth/login`;

                const data = {
                    email: payload.email,
                    password: payload.password
                };

                let response = await window.axios.post(url, data);

                commit('authenticate', {
                    user: response.data.user,
                    bearerToken: response.data.token
                });

                return response;
            } 
            catch (error) {
                throw error.response.data.error;
            }
        },

        async register ({commit, getters}, payload) {
            try {
                const url = `${getters.apiUrl}/auth/register`;

                const data = {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    password_confirmation: payload.password_confirmation
                }

                let response = await window.axios.post(url, data);

                commit('authenticate', {
                    user: response.data.user,
                    bearerToken: response.data.token
                });

                return response;
            }
            catch (error) {
                throw error.response.data.errors;
            }
        }
    }
}