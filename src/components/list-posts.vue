<template>
  <div>
       <!-- MODAL -->
      <modal :title="`${modal.form }`">
        <modal-post :post="selectedPost" @close="close" v-if="modal.form != null && (modal.form == 'create_posts' || modal.form == 'edit_post') "></modal-post>
        <modal-delete @close="close" @delete="deletePost(), close()" v-if="modal.form != null && modal.form == 'delete_post'"></modal-delete> 
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
              <v-btn @click="openModalEdit(item)" icon>
                <v-icon color="grey lighten-1">
                  mdi-pencil
                </v-icon>
              </v-btn>
                <v-btn icon>
                <v-icon color="grey lighten-1" @click="openModalDelete(item)">
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
import modalDelete from './partials/modal-delete.vue'

import { mapGetters } from 'vuex';
import { apollo } from "../apollo";
import { ALLPOST, DELETEPOST } from "../graphql/posts"

export default {
  name: 'App',
  data() {
    return {
        selectedPost: null
    }
  },
  components: {
    modal,
    modalPost,
    modalDelete
  },
  computed: {
      ...mapGetters({
          items: 'getPosts',
          modal: 'getModal'
      })
  },
  methods: {
     openModalDelete(postData){
        this.selectedPost = postData;
        this.$store.dispatch('setModal', { form: 'delete_post'});
    },
    openModalEdit(postData){
        this.selectedPost = postData;
        this.$store.dispatch('setModal', { form: 'edit_post'});
    },
    close(){
        this.selectedPost = null;
        this.$store.dispatch('setModal', { form: null}); 
    },

    deletePost(){
         let postData = this.selectedPost;
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
            this.$store.dispatch('setSnackbar', `Deleted ${postData.title} post`)
            this.$store.dispatch('deletePost', postData.id) 
        })
        .catch(err => {
           console.log(err)
          this.$store.dispatch('setLoading', false) 
          this.$store.dispatch('setSnackbar', "Failed to Delete")
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
  },
  created(){
  },
}
</script>
