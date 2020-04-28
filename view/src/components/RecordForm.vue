<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" class="form" center lazy-validation>
      <v-layout class="mb-4" justify-start>
        <v-flex shrink>
          <h1 class="brown--text lighten-4">{{ header }}</h1>
        </v-flex>
      </v-layout>
      <v-textarea
        clear-icon="cancel"
        label="Text"
        v-model="postText"
        :value="postText"
        :rules="recordRules"
        required
      ></v-textarea>
      <v-layout class="mt-4" justify-center>
        <v-flex shrink>
          <v-btn color="success" @click="create()" class="center send-button" width="x-large">
            {{ sendText }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-snackbar
        class="mt-12"
        v-model="snackbar.show"
        :timeout="2000"
        :top="true"
        color="success"
      >
        {{ text }}
        <v-icon :class="snackbar.iconColor">
          {{ snackbar.icon }}
        </v-icon>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    actionName: String,
    sendText: String,
    header: String
  },
  data() {
    return {
      valid: true,
      snackbar: {
        icon: "mdi-check-bold",
        iconColor: "white--text",
        show: false
      },
      postText: "",
      text: "Recorded",
      recordRules: [
        v => !!v || "Text is required",
        v => (v && v.length >= 5) || "Text should be longer than 4 characters"
      ]
    };
  },
  methods: {
    create: async function(
      { dispatch } = this.$store,
      // eslint-disable-next-line no-unused-vars
      { postText, snackbar } = this,
      { form } = this.$refs
    ) {
      const success = (await form.validate())
        ? await dispatch("create", { postText })
        : false;

      if (success) {
        postText = "";
        snackbar.show = true;
      }
    }
  },
  name: "RecordForm"
};
</script>

<style scoped>
.form {
  max-width: 30em;
  height: 15em;
  max-height: 30em;
}
.send-button {
  max-width: 10em;
}
</style>
