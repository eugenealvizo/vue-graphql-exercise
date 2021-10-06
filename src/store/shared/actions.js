export const actions = {

  // USERS
  setUsers({ commit }, val) {
    commit('SET_USERS', val)
  },

  addUser({ commit }, val) {
    commit('ADD_USER', val)
  },

  updateUser({ commit }, val) {
    commit('UPDATE_USER', val)
  },

  deleteUser({ commit }, val) {
    commit('DELETE_USER', val)
  },

  // POSTS

  setPosts({ commit }, val) {
    commit('SET_POSTS', val)
  },

  addPost({ commit }, val) {
    commit('ADD_POST', val)
  },
  updatePost({ commit }, val) {
    commit('UPDATE_POST', val)
  },

  deletePost({ commit }, val) {
    commit('DELETE_POST', val)
  },

  setLoading({commit}, val){
    commit('SET_LOADING', val)
  },
  setSnackbar({commit}, val){
    commit('SET_SNACKBAR', val)
  }
}
