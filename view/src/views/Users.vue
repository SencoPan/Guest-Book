<template>
  <v-app>
    <v-content>
      <v-layout justify-center>
        <h1 class="brown--text lighten-4">All users</h1>
      </v-layout>
      <div v-for="item in $store.state.auth.users" :key="item.id">
        <Record
          :username="item.username"
          :text="''"
          :created-at="item.createdAt.split('T')[0]"
          :id="0"
        />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Record from "@/components/Body/Record";
export default {
  name: "Users",
  created() {
    this.$store.dispatch("getUsers");
  },
  components: { Record }
};
</script>

<style scoped></style>
