<template>
      <div>
        <v-card-text>Are you sure you want to delete?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="$emit('close')">
            Cancel
          </v-btn>
          <v-btn
            color="error darken-1"
            text
            @click="$emit('delete')">
            Delete
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
  }
</script>