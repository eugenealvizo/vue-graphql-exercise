
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
              @click="cancel()">
              Cancel
            </v-btn>
            <v-btn
              color="Primary darken-1"
              text
              @click="addUser()">
              Create
            </v-btn>
          </v-card-actions>
    </v-form>
</template>
<script>
  import { apollo } from "../../apollo";
  import { CREATEUSERS } from "../../graphql/users";

  export default {

    data () {
      return {
         emailRules: [ 
              v => !!v || 'Email is required',
              v => /.+@.+/.test(v) || 'Invalid Email address' 
          ] 
      }
    },
    methods:{
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
                    this.cancel();
                    this.$store.dispatch('setLoading', false); 
                })
                .catch(err => {
                    console.log(err)
                    this.$store.dispatch('setLoading', false);
                    this.$store.dispatch('setSnackbar', "Failed to add");
                })
            }
        },
        cancel(){
            this.$store.dispatch('setModal', { form: null });
        }
    },
     created(){
    }
  }
</script>