
<template>
  <v-form 
    ref="form">
  <v-container>
    <v-row>
      <v-col
        cols="12">

        <v-text-field
          label="Title"
          required
          outlined
          :rules="[v => !!v || 'title is required']"
          v-model="title">
        </v-text-field>
        <v-textarea
          label="Body"
          required
          outlined
          :rules="[v => !!v || 'Body is required']"
          v-model="body">
        </v-textarea>

      </v-col>
    </v-row>
  </v-container>
    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="cancel()">
            Cancel
          </v-btn>
          <v-btn
            color="Primary darken-1"
            text
            @click="addPost()">
            Create
          </v-btn>
        </v-card-actions>
  </v-form>
</template>
<script>
  import { apollo } from "../../apollo";
  import { CREATEPOST } from "../../graphql/posts";

  export default {
    data () {
      return {
      }
    },
    methods:{
        addPost(){
            if(this.$refs.form.validate()){
              this.$store.dispatch('setLoading', true);
              let post = {
                title: this.title,
                body: this.body
              }
              apollo.mutate({
                mutation: CREATEPOST,
                variables: {
                  input: post 
                }
              })
              .then(response => {
                  console.log(response)
                  this.$store.dispatch('addPost', response.data.createPost)
                  this.$store.dispatch('setSnackbar', "Added new post");
                  this.cancel();
                  this.$store.dispatch('setLoading', false); 
              })
              .catch(err => {
                  console.log(err)
                  this.$store.dispatch('setLoading', false); 
                  this.$store.dispatch('setSnackbar', "Failed to add")
              })
            }
        },
        cancel(){
            this.$store.dispatch('setModal', { form: null });
        }
    },
  }
</script>