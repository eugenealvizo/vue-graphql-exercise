<template>
  <div>
       <!-- MODAL -->
      <modal v-if="modal">
        <modal-post></modal-post>
      </modal>
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
                <v-icon color="grey lighten-1" @click="deletePost(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import modal from './partials/modal.vue';
import modalPost from './partials/modal-post.vue';
import { mapGetters } from 'vuex';
import { apollo } from "../apollo";
import { ALLPOST, DELETEPOST } from "../graphql/posts"

export default {
  name: 'App',
  data() {
      return {
        modal: false
        // items:[]
    }
  },
  components: {
    modal,
    modalPost
  },
  computed: {
      ...mapGetters({
          items: 'getPosts',
      })
  },
  methods: {

    deletePost(postData){
        this.$store.dispatch('setLoading', true); 
        apollo.mutate({
          mutation: DELETEPOST,
            variables: { 
              id: postData.id
            }
        })
        .then(response => {
           console.log(response)
            this.$store.dispatch('setLoading', false) 
            this.$store.dispatch('setSnackbar', `Deleted ${postData.title} user`)
            this.$store.dispatch('deletePost', postData.id) 
        })
        .catch(err => {
           console.log(err)
        })
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
    this.$store.subscribe((actions, state) => {
        console.log(actions.type, state)
          if(actions.type == 'SET_MODAL') {
              if(state.shared.statusModal.form == "create_posts")
                  this.modal = true;
              else 
                  this.modal = false;
          }
      })
  }
}
</script>
