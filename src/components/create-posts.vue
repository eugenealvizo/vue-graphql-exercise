<template>
    <v-form
        class="pa-5 form"
        ref="form"
        lazy-validation>
          <v-text-field
            label="Title"
            required>
          </v-text-field>
    
          <v-text-field
            label="Body"
            required>
          </v-text-field>

          <v-btn
            class="mt-4">Create Post</v-btn>
      </v-form>
</template>