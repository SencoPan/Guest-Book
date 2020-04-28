<template>
  <v-toolbar color="primary" dark max-height="64">
    <v-app-bar-nav-icon
      @click="toggleNav()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Menu</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    toggleNav: async function({show} = this.$store.state.nav){
      this.$store.state.nav.show = !show;
    }
  },
  name: "AdaptiveToolBar"
};
</script>

<style scoped></style>
