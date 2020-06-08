import Api from './../../api/';

const user = {
  state: () => ({
    info: null,
    username: null,
    period: 'overall',
    top: {}
  }),
  mutations: {
    setProcessing (state, payload) {
      state.proccessing = payload;
    },
    setInfo (state, payload) {
      state.info = payload;
    },
    setUserName (state, payload) {
      state.username = payload;
    },
    setTop (state, payload) {
      state.top = {
        ...state.top,
        ...payload
      };
    },
    clearUserData (state) {
      state.info = null;
      state.top = {};
    },
  },
  actions: {
    fetchNewUser: async function ({ commit, dispatch }, newUser) {
      commit('setUserName', newUser);
      commit('clearUserData');
      dispatch('fetchUserInfo');
    },
    fetchUserInfo: async function ({ commit, state, rootState, dispatch }) {
      try {
        const response = await fetch(Api.getUrl({
          method: 'user.getInfo',
          user: state.username || rootState.auth.sessionUser,
        }));
        const json = await response.json();

        if (json.error) {
          throw json.message;
        }

        commit("setInfo", json.user);
        dispatch('fetchUserTopAll');
      } catch(err) {
        console.error(err);
      }
    },
    fetchUserTop: async function ({ commit, state, rootState }, checkType) {
      try {
        const type = checkType.toLowerCase();
        const allowedTypes = ['albums', 'artists', 'tags', 'tracks'];
        if (!allowedTypes.includes(type)) throw "Top type no allowed";

        const response = await fetch(Api.getUrl({
          method: `user.getTop${checkType}`,
          period: state.period,
          user: state.username || rootState.auth.sessionUser,
        }));
        const json = await response.json();
        const update = {};
        update[type] = json[`top${type.toLowerCase()}`]
        commit("setTop", update);
      } catch(err) {
        console.error(err);
      }
    },
    fetchUserTopAll: async function ({ dispatch }) {
      dispatch('fetchUserTop', 'Artists');
      dispatch('fetchUserTop', 'Albums');
      dispatch('fetchUserTop', 'Tracks');
    },
  },
  getters: {
    getUserName: (state, getters, rootState) => {
      return state.username || rootState.auth.sessionUser;
    },
    getUserTop: (state) => {
      return state.top;
    },
    getUserInfo: (state) => {
      return state.info;
    }
  }
};

export default user;