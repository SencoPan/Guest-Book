import axios from "axios";

const state = {
  page: [],
  pages: 1,
  currentPage: 1,
  length: 0
};

const mutations = {
  assignPage: async (state, { data }) => {
    state.page = [...data];
  },
  assignAmount: async (state, { length, pages }) => {
    state.pages = pages > 0 ? pages : 1;
    state.length = length;
  }
};

const actions = {
  postRequest: async (ctx, { url, postText, userId }) => {
    return await axios({
      method: "POST",
      url: `http://localhost:3000/api/posts/${url}`,
      data: {
        postText,
        userId
      },
      contentType: "application/x-www-form-urlencoded"
    });
  },
  getRequest: async (ctx, { pageNumber, personal, userId }) => {
    let url = "http://localhost:3000/api/posts";

    let append;
    let query;

    if (personal) {
      append = `/personal`;
      query = `?personal=true&userId=${userId}`;
    } else {
      append = `/page`;
      query = "";
    }

    url += append;
    pageNumber > 0 ? (url += `/${pageNumber - 1}`) : false;
    url += query;

    return axios({
      method: "GET",
      url: url
    });
  },
  counterRequest: async (ctx, { personal, userId }) => {
    let query;

    if (personal) {
      personal = "Personal";
      query = `?personal=true&userId=${userId}`;
    } else {
      personal = "";
      query = "";
    }
    return axios({
      method: "GET",
      url: `http://localhost:3000/api/posts/count${personal + query}`
    });
  },
  deleteRequest: async (ctx, { id }) => {
    return axios({
      method: "DELETE",
      url: `http://localhost:3000/api/posts/delete?id=${id}`
    });
  },
  create: async ({ commit, dispatch, rootState }, { postText }) => {
    const { userId } = rootState.auth;

    if (userId) {
      const posts = await dispatch("postRequest", {
        url: "new",
        postText,
        userId
      });

      await commit("assignPage", posts.data);

      return !!posts;
    }
  },
  getPage: async ({ dispatch, commit }, { pageNumber }) => {
    let [personal, userId] = [false, false];
    const page = await dispatch("getRequest", { pageNumber, personal, userId });
    await commit("assignPage", page.data);
  },
  getPersonalPage: async ({ dispatch, commit }, { pageNumber, userId }) => {
    const page = await dispatch("getRequest", {
      pageNumber,
      personal: true,
      userId
    });
    await commit("assignPage", page.data);
  },
  count: async ({ dispatch, commit }) => {
    let [personal, userId] = [false, false];
    const info = await dispatch("counterRequest", { personal, userId });
    await commit("assignAmount", info.data.data);
  },
  countPersonal: async ({ dispatch, commit }, { userId }) => {
    const info = await dispatch("counterRequest", { personal: true, userId });
    await commit("assignAmount", info.data.data);
  },
  delete: async ({ dispatch, commit, state }, { id, username, personal }) => {
    await dispatch("deleteRequest", { id });

    const page = await dispatch("getRequest", {
      pageNumber: state.currentPage,
      userId: username,
      personal
    });

    !personal ? await dispatch("counter") : await dispatch("countPersonal", { username })
    await commit("assignPage", page.data);
  }
};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};
