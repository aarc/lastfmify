import Api from './../../api/';

const defaultState = () => ({
  session: null,
  sessionUser: null,
  token: null,
  error: null,
  proccessing: false
});

const auth = {
  state: defaultState(),
  mutations: {
    processing (state) {
      state.proccessing = true;
    },
    clearProcessing (state) {
      state.proccessing = false;
    },
    setToken (state, token) {
      state.token = token
      localStorage.token = token;
    },
    clearToken (state) {
      state.token = null;

      localStorage.removeItem('token');
    },
    setSession (state, session) {
      if (localStorage.session != session) {
        localStorage.session = session;
      }
      state.session = session;
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = false;
    },
    setSessionUser (state, user) {
      state.sessionUser = user;
      localStorage.sessionUser = user;
    },
    clearSessionUser (state) {
      state.sessionUser = null;
      localStorage.removeItem('sessionUser');
    },
    clearState (state) {
      Object.assign(state, defaultState())
    }
  },
  actions: {
    getSession: async function ({ commit, state }) {
      commit("processing");
      commit("clearError");
      try {
        const response = await fetch(Api.getUrl({
          method: 'auth.getSession',
          token: state.token,
        }));
        const json = await response.json();

        commit("setSession", json.session.key);
        commit("setSessionUser", json.session.name);
        commit("clearToken");
        commit("clearProcessing");

      } catch(err) {
        commit("setError", err);
        commit("clearToken");
        commit("clearProcessing");
      }
    },
    loadAuthState: async function ({ commit }) {
      if (localStorage.token) {
        commit('setToken', localStorage.token);
      }
  
      if (localStorage.session) {
        commit('setSession', localStorage.session);
      }
  
      if (localStorage.sessionUser) {
        commit('setSessionUser', localStorage.sessionUser);
      }
    },
    logOut: async function ({ commit }) {
      commit('clearState');
    }
  }
};

export default auth;