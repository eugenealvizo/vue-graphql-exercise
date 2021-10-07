<template>
    <div>
        <nav class="top-header">
            <h1>{{setTitleHeader}}</h1>
        </nav>
          <v-progress-linear
                :active="isLoading"
                :indeterminate="isLoading"
                color="accent"
                height="5"
            ></v-progress-linear>

          <v-snackbar
          light
          fixed
          top
      v-model="isVisible"
    >
        {{msg}}
    </v-snackbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

 export default {
      data() {
      return {
          isVisible: false,
          msg: "" 
    }
  },
    computed: {
          ...mapGetters({
            isLoading: 'isLoading',
        }),

        setTitleHeader() {
            return this.$route.name;
        }
    },
    created(){
         this.$store.subscribe((actions, state) => {
            if(actions.type == 'SET_SNACKBAR') {
                this.isVisible = true
                this.msg = state.shared.statusSnackBar
            }
        })
    }
 }
</script>