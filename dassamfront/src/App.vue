<template>
  <v-app  >
     <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>
    <router-view></router-view>
     
  </v-app>
</template>

<script>
import register from './components/register.vue';
import home from './views/Home.vue';
import icons from  'material-design-icons-iconfont'
import axios  from 'axios'
import store from './store/index.js'

export default {
  name: 'App',
   icons: {
    iconfont: 'md',
  },

  data: () => ({
    //
  }),
};
</script>
