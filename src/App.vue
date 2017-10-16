<template>
  <div id="app">
    <router-view></router-view>
    <toast-message></toast-message>
  </div>
</template>

<script>
import ToastMessage from './components/ToastMessage.vue'
import { state, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    ToastMessage
  },
  computed: {
    ...mapGetters(['isToastMessage']),
  },
}
</script>

<style lang="scss">
body {
  background: #c3c194;
  /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(#c3c194 10%, #6f8b78 60%, #353e45 100%);
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#c3c194 10%, #6f8b78 60%, #353e45 100%);
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#c3c194 10%, #6f8b78 60%, #353e45 100%);
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(#c3c194 10%, #6f8b78 60%, #353e45 100%);
  /* Standard syntax */
  min-height: 100vh;
}

// @media screen and (min-width: 0px) and (max-width: 767px) {
//   // body {
//   //   min-height: 100vh;
//   //   max-height: 160vh;
//   // }
// }

// @media screen and (min-width: 768px) and (max-width: 1200px) {
//   body {
//     min-height: 100vh;
//     max-height: 130vh;
//   }
// }
// @media screen and (min-width: 768px) {
//   body {
//     // min-height: 100vh;
//     // max-height: 130vh;
//     height: 100%;
//   }
// }

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  padding: 0;
  margin: 0;
}
</style>
