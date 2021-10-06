<template>
    <v-card v-if="items.length > 0">
      <v-list class="pa-5">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1 ">
                mdi-note
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle>{{ item.body }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">
                  mdi-pencil
                </v-icon>
              </v-btn>
                <v-btn icon>
                <v-icon color="grey lighten-1" @click="deleteUser(item.id)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { apollo } from "../apollo";
import { ALLPOST } from "../graphql/allposts"

export default {
  name: 'App',
  data() {
      return {
        // items:[]
    }
  },
  components: {
    // HelloWorld
  },
  computed: {
      ...mapGetters({
          items: 'getPosts',
      })
  },
  methods: {
    deleteUser(id){
        this.$store.dispatch('deletePost', id) 
        this.$store.dispatch('setSnackbar', 'Deleted User')
         
    },
    getAllPost(){
       this.$store.dispatch('setLoading', true) 
       apollo.query({
          query: ALLPOST
        })
        .then(response => {
          // this.items = response.data.posts.data 
          this.$store.dispatch('setPosts', response.data.posts.data)
          this.$store.dispatch('setLoading', false)  
         
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
      })
    }
  },
  mounted() {
    this.getAllPost();
  }
}
</script>
