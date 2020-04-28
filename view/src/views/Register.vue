<template>
  <v-content>
    <Form class="form" actionName="register" send-text="Sign up" header="Sign up" />
  </v-content>
</template>

<script>
import Form from "@/components/Form";
export default {
  name: "Register",
  components: { Form }
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 10em auto 10em auto;
}
</style>
