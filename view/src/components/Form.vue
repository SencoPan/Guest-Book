<template>
  <v-form ref="form" v-model="valid" class="form" center lazy-validation>
    <h1 class="brown--text lighten-4">{{ header }}</h1>
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :type="'password'"
      label="Password"
      required
    ></v-text-field>

    <v-btn color="success" v-on:click="authUser()">
      {{ sendText }}
    </v-btn>
    <v-snackbar
            class="mt-12"
            v-model="snackbar.show"
            :timeout="3000"
            :top="true"
            color="error"
    >
      {{ snackbar.text }}
      <v-icon :class="snackbar.iconColor">
        {{ snackbar.icon }}
      </v-icon>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  name: "Form",
  props: {
    actionName: String,
    sendText: String,
    header: String
  },
  methods: {
    authUser: async function(
      { dispatch } = this.$store,
      { actionName, username, password, snackbar } = this
    ) {
      const ifValid = this.$refs.form.validate();
      if (ifValid) {
        const success = await dispatch(actionName, { username, password });

        if (!success.error) {
          await dispatch("regToggle", { isAuth: true });
          await this.$router.push("/");
        } else {
          snackbar.text = "Error while trying to sign up" || success.error;
          snackbar.show = true;
        }
      }
    }
  },
  data: () => ({
    valid: true,
    snackbar: {
      text: "Error",
      icon: "mdi-account-alert",
      iconColor: "white--text",
      show: false
    },
    username: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 6) || "Name should be longer than 5 characters",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be longer than 5 symbols"
    ]
  })
};
</script>

<style scoped>
.form {
  max-width: 30em;
  height: 15em;
  max-height: 30em;
}
</style>
