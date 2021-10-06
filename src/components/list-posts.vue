<template>
    <v-card>
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
import { apollo } from "../apollo";
import { ALLPOST } from "../graphql/allposts"

export default {
  name: 'App',
  data() {
      return {
        items:[]
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    getAllPost(){
       apollo.query({
          query: ALLPOST
        })
        .then(response => {
          this.items = response.data.posts.data 
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
      })
    }
  },
  created() {
    this.getAllPost();
  }
}
</script>
