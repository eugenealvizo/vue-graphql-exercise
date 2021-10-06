<template>
    <v-card>
      <!--- <modal>
      </modal> --->
      <v-list class="pa-5">
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
                <v-btn icon>
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
// import modal from './partials/modal.vue';
import { apollo } from "../apollo";
import { ALLUSERS } from "../graphql/allusers";

export default {
  name: 'App',
  data() {
      return {
        items:[{
        }]
    }
  },
  components: {
    // modal
  },
  methods: {
    getAllUsers(){
        apollo.query({
            query: ALLUSERS
          })
          .then(response => {
            this.items = response.data.users.data 
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
