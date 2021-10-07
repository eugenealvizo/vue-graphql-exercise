
<template>
  <v-form
      ref="form">
        <v-container>
          <v-row>
            <v-col
              cols="12">

              <v-text-field
                label="Name"
                required
                outlined
                :rules="[v => !!v || 'Name is required']"
                v-model="name">
              </v-text-field>


              <v-text-field
                label="Username"
                required
                outlined
                :disabled="isEdit"
                :rules="[v => !!v || 'Username is required']"
                v-model="username">
              </v-text-field>

              <v-text-field
                label="Email"
                required
                outlined
                :rules="emailRules"
                v-model="email">
              </v-text-field>
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
  import { CREATEUSERS, UPDATEUSERS } from "../../graphql/users";

  export default {
    props: ['user'],
    data () {
      return {
         isEdit: false,
         name: "",
         email: "",
         username: "",
         emailRules: [ 
              v => !!v || 'Email is required',
              v => /.+@.+/.test(v) || 'Invalid Email address' 
          ] 
      }
    },
    mounted(){
      if(this.user){
        this.isEdit = true;
        this.name = this.user.name;
        this.email = this.user.email;
        this.username = this.user.username;
      }
    },
    methods:{
        onSubmit(){
          //Create
          if(!this.user){
            this.addUser();
          }else
            this.updateUser();
        },
        updateUser(){
            if(this.$refs.form.validate()){
              this.$store.dispatch('setLoading', true); 
              let user = {
      
                name: this.name,
                username: this.username,
                email: this.email
              }
              apollo.mutate({
                  mutation: UPDATEUSERS,
                  variables: {
                    id: this.user.id,
                    input: user
                  }
                })
                .then(response => {
                    console.log(response, this.user.id)
                    this.$store.dispatch('updateUser',  { id: this.user.id, updatedUser: response.data.updateUser})
                    this.$store.dispatch('setSnackbar', "Updated user");
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
        addUser(){
            if(this.$refs.form.validate()){
              this.$store.dispatch('setLoading', true); 
              let user = {
                name: this.name,
                username: this.username,
                email: this.email
              }
              apollo.mutate({
                  mutation: CREATEUSERS,
                  variables: {
                    input: user
                  }
                })
                .then(response => {
                    console.log(response)
                    this.$store.dispatch('addUser', response.data.createUser)
                    this.$store.dispatch('setSnackbar', "Added new user");
                    this.$store.dispatch('setModal', { form: null}); 
                    this.$store.dispatch('setLoading', false); 
                })
                .catch(err => {
                    console.log(err)
                    this.$store.dispatch('setLoading', false);
                    this.$store.dispatch('setSnackbar', "Failed to add");
                })
            }
        },
    },
     created(){
    }
  }
</script>