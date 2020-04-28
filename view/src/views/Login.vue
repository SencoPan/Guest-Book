<template>
  <v-content>
    <Form class="form" actionName="login" send-text="Log in" header="Sign in"/>
  </v-content>
</template>

<script>
import Form from "@/components/Form";
export default {
  name: "Login",
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
