<template>
  <v-app>
     <Header></header>
    <div class="container">
      <router-view></router-view>
    </div>
   <v-btn
      class="floating-btn"
      color="primary"
      fab>
        <v-icon>mdi-plus</v-icon>
    </v-btn>
    <bottom-nav></bottom-nav>
  </v-app>
</template>

<script>
import BottomNav from './components/partials/bottom-nav.vue';
import Header from './components/partials/header.vue';

export default {
  name: 'App',
 data() {
      return {
    }
  },
  components: {
    BottomNav,
    Header
  },
  created() {
  }
}
</script>

