
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="650"
    >
      <v-card class="pa-5">
        <v-card-title class="text-h5">
          Create Post
        </v-card-title>
        <v-card-text>
        </v-card-text>
            <slot></slot>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        dialog: true,
      }
    },
  }
</script>