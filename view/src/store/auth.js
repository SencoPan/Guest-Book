import axios from "axios";

const state = {
  authenticated: false,
  username: "",
  token: "",
  userId: "",
  users: []
};

const mutations = {
  authUser: async (state, { data }) => {
    const { auth, user, token } = data;
    state.authenticated = auth;
    state.username = user.username;
    state.userId = user.id;
    state.token = token;
  },
  assignUsers: async (state, { users }) => {
    state.users = users;
  },
  unAuth: async state => {
    state.authenticated = false;
    state.username = "";
    state.userId = "";
    state.token = "";
  }
};

const actions = {
  authRequest: async (ctx, { url, username, password }) => {
    let user;
    try {
      user = await axios({
        method: "POST",
        url: `http://localhost:3000/api/auth/${url}`,
        data: {
          username,
          password
        },
        contentType: "application/x-www-form-urlencoded"
      });
      axios.defaults.headers.authorization = `Bearer ${user.data.data.token}`;
    } catch (error) {
      user = { error };
    }
    return user;
  },
  getAllUsersRequest: async () => {
    let user;
    try {
      user = axios({
        method: "GET",
        url: `http://localhost:3000/api/auth/get`
      });
    } catch (error) {
      user = { error };
    }
    return user;
  },
  register: async ({ commit, dispatch }, { username, password }) => {
    const user = await dispatch("authRequest", {
      url: "register",
      username,
      password
    });

    if (!user.error) {
      await commit("authUser", user.data);
      return true;
    } else {
      return user;
    }

  },
  login: async ({ commit, dispatch }, { username, password }) => {
    const user = await dispatch("authRequest", {
      url: "login",
      username,
      password
    });

    if (!user.error) {
      await commit("authUser", user.data);
      return true;
    } else {
      return user;
    }
  },
  getUsers: async ({ commit, dispatch }) => {
    const users = await dispatch("getAllUsersRequest");
    await commit("assignUsers", users.data);
  }
};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};
