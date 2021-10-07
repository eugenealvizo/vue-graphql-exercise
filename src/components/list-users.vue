<template>
    <v-card>
      <!-- MODAL -->
      <modal>
        <modal-user></modal-user> 
      </modal>


      <!-- SCREEN -->
      <v-list class="pa-5"  v-if="items.length > 0">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1 ">
                mdi-account
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle>{{ item.email }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">
                  mdi-pencil
                </v-icon>
              </v-btn>
                <v-btn icon @click="deleteUser(item)">
                <v-icon color="grey lighten-1">
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
import modal from './partials/modal.vue';
import modalUser from './partials/modal-user.vue';
import { mapGetters } from 'vuex';
import { apollo } from "../apollo";
import { ALLUSERS, DELETEUSERS } from "../graphql/users";

export default {
  name: 'App',
  data() {
      return {
        // items:[{
        // }]
    }
  },
  computed: {
        ...mapGetters({
            items: 'getUsers',
        })
  },
  components: {
    modal,
    modalUser
  },
  methods: {
    deleteUser(userData){
        this.$store.dispatch('setLoading', true); 
        apollo.mutate({
          mutation: DELETEUSERS,
            variables: { 
              id: userData.id
            }
        })
        .then(response => {
           console.log(response)
            this.$store.dispatch('setLoading', false) 
            this.$store.dispatch('setSnackbar', `Deleted ${userData.name} user`)
            this.$store.dispatch('deleteUser', userData.id) 
        })
        .catch(err => {
           console.log(err)
           this.$store.dispatch('setLoading', false) 
            this.$store.dispatch('setSnackbar', "Failed to Delete")
        })
    },
    getAllUsers(){
        this.$store.dispatch('setLoading', true) 
        apollo.query({
            query: ALLUSERS
          })
          .then(response => {
            this.$store.dispatch('setUsers', response.data.users.data)
            this.$store.dispatch('setLoading', false) 
          })
          .catch(err => {
            console.log(err)
        })
    },
  },
  created(){
    this.getAllUsers();
  }
}
</script>
