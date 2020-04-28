import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/auth";
import Login from "@/views/Login";
import GuestBook from "@/views/GuestBook";
import Register from "@/views/Register";
import AddGuestBook from "@/views/AddGuestBook";
import Users from "@/views/Users";
import PersonalRecords from "@/views/PersonalRecords";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GuestBook",
    component: GuestBook,
    meta: {
      guest: true
    }
  },
  {
    path: "/personal",
    name: "PersonalRecords",
    component: PersonalRecords,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add",
    name: "AddGuestBook",
    component: AddGuestBook,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireNotAuth: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Login,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requireNotAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const state = store.state;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (state.token === "") {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requireNotAuth)) {
    if (state.token !== "") {
      next({
        path: "/"
      });
    } else{
      next();
    }
  } else {
    next();
  }
});

export default router;
