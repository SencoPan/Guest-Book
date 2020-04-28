<template>
  <v-app>
    <v-content>
      <Body class="body" :is-personal="true" />
    </v-content>
  </v-app>
</template>

<script>
import Body from "@/components/Body";

export default {
  created() {
    this.$store.state.guestBook.currentPage = 1;
    this.$store.dispatch("getPersonalPage", { userId: this.$store.state.auth.username });
    this.$store.dispatch("countPersonal", { userId: this.$store.state.auth.username });
  },
  methods: {
    test: async function() {
      await this.$store.dispatch("getPage", { pageNumber: 0 });
    }
  },
  name: "PersonalRecords",
  components: {
    Body
  },

  data: () => ({
    //
  })
};
</script>

<style></style>
