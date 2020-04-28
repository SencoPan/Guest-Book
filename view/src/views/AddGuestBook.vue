<template>
  <v-content>
    <RecordForm class="form" actionName="/posts/new" send-text="Create Post" header="New Record" />
  </v-content>
</template>

<script>
import RecordForm from "@/components/RecordForm";
export default {
  name: "AddGuestBook",
  components: { RecordForm }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 10em auto 10em auto;
}
</style>
