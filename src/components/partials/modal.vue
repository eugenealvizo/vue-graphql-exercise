
<template>
  <v-row justify="center">
    <v-dialog
        v-model="modal"
      persistent
      max-width="650"
    >
      <v-card class="pa-5">
        <v-card-title class="text-h5" style="  text-transform: capitalize;">
            {{ title | capitalize }}
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
    props: ['title'],
    data () {
      return {
          modal: false
      }
    },
    created(){
        this.$store.subscribe((actions, state) => {
            if(actions.type == 'SET_MODAL') {
                if(state.shared.statusModal.form != null)
                    this.modal = true;
                else 
                    this.modal = false;
            }
        })
    },
    filters: {
      capitalize(string){
        return string.replace("_", " ");
      }
    }
  }
</script>