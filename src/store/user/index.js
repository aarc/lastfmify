import Api from './../../api/';

const user = {
  state: () => ({
    info: null,
    username: null,
    processing: false,
    period: 'overall', // overall | 7day | 1month | 3month | 6month | 12month
    top: {
      albums: {},
      artists: {},
      tags: {},
      tracks: {}
    }
  }),
  mutations: {
    setProcessing (state, payload) {
      state.processing = payload;
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
    setUserPeriod (state, payload) {
      state.period = payload;
    },
    clearUserData (state) {
      state.info = null;
      state.top = {
        albums: {},
        artists: {},
        tags: {},
        tracks: {}
      };
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
        commit("setProcessing", true);
        const response = await fetch(Api.getUrl({
          method: 'user.getInfo',
          user: state.username || rootState.auth.sessionUser,
        }));
        const json = await response.json();

        if (json.error) {
          throw json.message;
        }
        commit("setProcessing", false);
        commit("setInfo", json.user);
        dispatch('fetchUserTopAll');
      } catch(err) {
        commit("setProcessing", false);
        console.error(err);
      }
    },
    fetchUserTop: async function ({ commit, state, rootState }, checkType) {
      try {
        const type = checkType.toLowerCase();
        const allowedTypes = ['albums', 'artists', 'tags', 'tracks'];
        if (!allowedTypes.includes(type)) throw "Top type no allowed";

        commit("setTop", {
          [type]: {
            ...state.top[type],
            processing: true
          }
        });

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
    setUserPeriod: async function ({ commit, dispatch }, period) {
      commit('setUserPeriod', period);
      dispatch('fetchUserTopAll');
    }
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
    },
    getUserPeriod: (state) => {
      return state.period;
    },
    getUserProcessing: (state) => {
      return state.processing;
    }
  }
};

export default user;