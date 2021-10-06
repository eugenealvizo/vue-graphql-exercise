import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store/store'
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css'
import './scss/overides.scss'

Vue.use(Vuetify);

const theme = {
  primary: '#2196F3',
  secondary: '#1976D2',
  accent: '#26C6DA',
  success: '#1976D2',
  error: '#EF5350'
}

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    }
  }
});

new Vue({
  router,
  store,
  vuetify : new Vuetify(),
  render: h => h(App),
}).$mount('#app')

