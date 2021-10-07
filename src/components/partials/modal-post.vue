
<template>
  <div>
  <v-container>
    <v-row>
      <v-col
        cols="12"
      >
        <v-text-field
          label="Name"
          required
            outlined
        ></v-text-field>
        <v-text-field
          label="Username"
          required
            outlined
        ></v-text-field>
        <v-text-field
          label="Email"
          required
            outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="cancel()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="Primary darken-1"
            text
            @click="addUser(), cancel()"
          >
            Create
          </v-btn>
        </v-card-actions>
    </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods:{
        addUser(){
            this.$store.dispatch('addUser', {id: 'unique', name: 'title', email: 'body'})
        },
        cancel(){
            this.$store.dispatch('setModal', { form: null });
        }
    },
  }
</script>