<template>
  <v-app>
     <Header></header>
     
    <div class="container">
      <router-view></router-view>
    </div>
   <v-btn
      @click="addData()"
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
  },
  methods: {
    addData(){
        this.$store.dispatch('setModal', { form: `create_${this.$route.name}`});
    }
  }
}
</script>

