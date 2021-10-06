<template>
  <v-bottom-navigation class="main-footer primary" v-model="value">
    <v-btn @click="goToPage(`/users`)">
      <span>Users</span>
      <v-icon>mdi-account-group</v-icon>
    </v-btn>
    <v-btn @click="goToPage(`/posts`)">
      <span>Posts</span>
      <v-icon>mdi-card-text</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>

  export default {
    data: () => ({ value: 0 }),
    methods: {
      goToPage(path) {
        this.$router.push({ path: path}) 
      },
    },
    mounted(){
        if(this.$router.history.current.path == '/posts'){
          this.value = 1;
        }
    }
  
  }
</script>

  