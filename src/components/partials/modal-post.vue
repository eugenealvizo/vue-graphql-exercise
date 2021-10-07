
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
            @click="$emit('close')">
            Cancel
          </v-btn>
          <v-btn
            color="Primary darken-1"
            text
            @click="onSubmit()">
            Confirm
          </v-btn>
        </v-card-actions>
  </v-form>
</template>
<script>
  import { apollo } from "../../apollo";
  import { CREATEPOST, UPDATEPOST } from "../../graphql/posts";

  export default {
    props: ['post'],
    data () {
      return {
        title: "",
        body: "",
      }
    },
    mounted(){
      if(this.post){
        this.title = this.post.title,
        this.body = this.post.body
      }
    },
    methods:{
       onSubmit(){
          //Create
          if(!this.post){
            this.addPost();
          }else
            this.updatePost();
        },
        updatePost(){
            if(this.$refs.form.validate()){
              this.$store.dispatch('setLoading', true); 
              let post = {
                title: this.title,
                body: this.body
              }
              apollo.mutate({
                  mutation: UPDATEPOST,
                  variables: {
                    id: this.post.id,
                    input: post
                  }
                })
                .then(response => {
                    console.log(response, this.post.id)
                    this.$store.dispatch('updatePost',  { id: this.post.id, updatedPost: response.data.updatePost})
                    this.$store.dispatch('setSnackbar', "Updated post");
                    this.$store.dispatch('setModal', { form: null}); 
                    this.$store.dispatch('setLoading', false); 
                })
                .catch(err => {
                    console.log(err)
                    this.$store.dispatch('setLoading', false);
                    this.$store.dispatch('setSnackbar', "Failed to update");
                })
            }
        },
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
                  this.$store.dispatch('setModal', { form: null}); 
                  this.$store.dispatch('setLoading', false); 
              })
              .catch(err => {
                  console.log(err)
                  this.$store.dispatch('setLoading', false); 
                  this.$store.dispatch('setSnackbar', "Failed to add")
              })
            }
        },
    },
  }
</script>