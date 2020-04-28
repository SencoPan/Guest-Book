<template>
  <div id="id">
    <v-layout class="mb-4" justify-center>
      <v-flex shrink>
        <h1 class="brown--text lighten-4">Records</h1>
      </v-flex>
    </v-layout>
    <div v-for="item in $store.state.guestBook.page" :key="item.id">
      <Record
        :personal="isPersonal"
        :username="item.User ? item.User.username : $store.state.auth.username"
        :text="item.text"
        :created-at="item.createdAt.split('T')[0]"
        :id="item.id"
      />
    </div>
    <div class="text-center">
      <v-pagination
        v-model="$store.state.guestBook.currentPage"
        @input="next()"
        class="mb-8 mt-4"
        :length="$store.state.guestBook.pages"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Record from "@/components/Body/Record";
export default {
  components: { Record },
  methods: {
    next: async function(
      { dispatch } = this.$store,
      { currentPage } = this.$store.state.guestBook,
      { isPersonal } = this,
      { username } = this.$store.state.auth
    ) {
      isPersonal
        ? await dispatch("getPersonalPage", {
            pageNumber: currentPage,
            userId: username
          })
        : await dispatch("getPage", { pageNumber: currentPage });
    }
  },
  props: {
    isPersonal: Boolean
  },
  name: "Body"
};
</script>

<style scoped></style>
