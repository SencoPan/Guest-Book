<template>
  <v-card>
    <v-navigation-drawer
      v-model="$store.state.nav.show"
      clipped
      absolute
      temporary
      height="auto"
      ><!--
      <v-list-item>
        <v-list-item-icon center>
          <v-icon>menu</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Menu</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>-->

      <v-list dense>
        <v-list-item
          v-for="item in $store.state.nav.items"
          :key="item.title"
          link
          :to="item.title !== 'Log out' ? item.link : ''"
          @click="item.title === 'Log out' ? logOut() : false"
        >
          <v-list-item-icon>
            <v-icon :class="item.class">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  created(){
    this.$store.state.nav.show = false;
  },
  name: "Nav",
  methods: {
    logOut: async function({ dispatch } = this.$store) {
      await dispatch("regToggle", { isAuth: false });
      await this.$router.push("/");
    }
  },
  data() {
    return {
      mini: true,
      right: null
    };
  }
};
</script>

<style scoped></style>
