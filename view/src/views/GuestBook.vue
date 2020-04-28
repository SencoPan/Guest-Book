<template>
  <v-app>
    <v-content>
      <Body class="body" />
    </v-content>
  </v-app>
</template>

<script>
import Body from "@/components/Body";

export default {
  created() {
    this.$store.state.guestBook.currentPage = 1;
    this.$store.dispatch("getPage", { pageNumber: 0 });
    this.$store.dispatch("count");
  },
  methods: {
    test: async function() {
      await this.$store.dispatch("getPage", {pageNumber: 0});
    }
  },
  name: "GuestBook",
  components: {
    Body
  },

  data: () => ({
    //
  })
};
</script>

<style>
</style>
