export const getters = {
  getUsers: state => {
    return state.users
  },
  getPosts: state => {
    return state.posts
  },
  getSnackbar: state =>{
    return state.statusSnackbar
  },

  isLoading: state =>{
    return state.isLoading
  },
 
}
