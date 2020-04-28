const state = {
  show: false,
  items: [
    {
      title: "Guest Book",
      icon: "dashboard",
      class: "primary--text lighten-2",
      link: "/"
    },
    {
      title: "Users",
      icon: "mdi-account-multiple",
      class: "primary--text lighten-2",
      link: "/users"
    },
    {
      title: "Sign in",
      icon: "mdi-login-variant",
      class: "green--text lighten-2",
      link: "/login"
    },
    {
      title: "Sign up",
      icon: "mdi-account-plus",
      class: "green--text lighten-2",
      link: "/register"
    }
  ],
  personal: {
    title: "Personal records",
    icon: "mdi-badge-account",
    class: "primary--text darken-2",
    link: "/personal"
  },
  addRec: {
    title: "Add Guest Book",
    icon: "mdi-plus",
    class: "primary--text darken-2",
    link: "/add"
  },
  logOut: {
    title: "Log out",
    icon: "logout",
    class: "red--text darken-2",
    link: "/logout"
  },
  signIn: {
    title: "Sign in",
    icon: "mdi-login-variant",
    class: "green--text lighten-2",
    link: "/login"
  },
  signUp: {
    title: "Sign up",
    icon: "mdi-account-plus",
    class: "green--text lighten-2",
    link: "/register"
  }
};
const actions = {
  regToggle: async ({ commit }, { isAuth }) => {
    if (isAuth) {
      await commit("assignMenu", {
        first: "Sign in",
        second: "Sign up",
        third: false,
        firstChange: "addRec",
        secondChange: "logOut",
        thirdChange: "personal"
      });
    } else {
      await commit("assignMenu", {
        first: "Log out",
        second: "Add Guest Book",
        third: "Personal records",
        firstChange: "signIn",
        secondChange: "signUp",
        thirdChange: false
      });
      await commit("unAuth");
    }
  }
};
const mutations = {
  assignMenu: async (
    state,
    { first, second, third, firstChange, secondChange, thirdChange }
  ) => {
    let firstSlc = state.items.findIndex(item => {
      return item.title === first;
    });

    state.items.splice(firstSlc, 1);

    let secondSlc = state.items.findIndex(item => {
      return item.title === second;
    });

    state.items.splice(secondSlc, 1);

    if (third) {
      let thirdsSlc = state.items.findIndex(item => {
        return item.title === third;
      });

      state.items.splice(thirdsSlc, 1);
    }

    thirdChange ? state.items.push(state[thirdChange]) : false;

    state.items.push(state[firstChange]);
    state.items.push(state[secondChange]);
  }
};
const getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};
