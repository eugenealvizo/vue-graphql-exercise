export const mutations = {
  'SET_USERS' (state, users) {
    state.users= users;
  },
  'ADD_USER' (state, newUser){
    state.users.push(newUser)
  },
  'UPDATE_USER' (state, { id, updatedUser }) {
    state.users.map(user => {
      if(user.id === id) {
        user.name = updatedUser.name
        user.username = updatedUser.username
        user.email = updatedUser.email
      }
    })
  },

  'DELETE_USER' (state, userId) {
    state.users = state.users.filter(user => user.id != userId)
  },

  'SET_POSTS' (state, posts) {
    state.posts= posts;
  },
  'ADD_POST' (state, newPost){
    state.posts.push(newPost)
  },
  'DELETE_POST' (state, postId) {
    state.posts = state.posts.filter(post => post.id != postId)
  },

  'UPDATE_POST' (state, { id, updatedPost }) {
    state.posts.map(post => {
      if(post.id === id) {
        post.title = updatedPost.title
        post.body = updatedPost.body
      }
    })
  },
  
  'SET_LOADING' (state, status) {
    state.isLoading = status
  },
  'SET_SNACKBAR' (state, status) {
    state.statusSnackBar = status
  },
  'SET_MODAL' (state, status) {
    state.statusModal = status
  }
}
