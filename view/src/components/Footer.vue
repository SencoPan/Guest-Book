<template>
  <v-card height="60">
    <v-footer absolute class="blue-moonlight  font-weight-medium lighten-5">
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} — <strong>FrontEnd</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.blue-moonlight {
  background: #191970 !important;
  color: white !important;
}
</style>
