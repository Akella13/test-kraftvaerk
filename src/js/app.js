import Vue from 'vue';
import app from './vue/app';
import store from './vue/store';

new Vue({
  el: '#app',
  store,
  components: {
    app,
  }
})