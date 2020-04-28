<template>
  <v-app id="app">
    <AdaptiveToolBar />
    <Nav />
    <router-view class="mt-4 mx-4"/>
    <Footer id="footer" absolute />
  </v-app>
</template>
<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdaptiveToolBar from "@/components/AdaptiveToolBar";
export default {
  components: { AdaptiveToolBar, Footer, Nav },
  data() {
    return {
    };
  }
};
</script>
