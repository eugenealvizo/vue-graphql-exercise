
// TODO
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="650"
    >
   
      <v-card>
        <v-card-title class="text-h5">
          Create Post
        </v-card-title>
        <v-card-text>
           <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Title"
                  required
                    outlined
                ></v-text-field>
     <v-textarea
            label="Body"
            outlined
            required>
          </v-textarea>
              </v-col>
            </v-row>
          </v-container>
        
        
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error darken-1"
            text
            @click="dialog = false"
          >
            Delete
          </v-btn>
        </v-card-actions>
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