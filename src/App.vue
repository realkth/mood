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
  created () {
    this.checkBrowser()
  },
  methods: {
    checkBrowser:() => {
      var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser;

      // MS 계열 브라우저를 구분하기 위함.
      if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if (name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
          agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
          browser += parseInt(agent[1]);
        } else { // IE 11+
          if (agent.indexOf('trident') > -1) { // IE 11 
            browser += 11;
          } else if (agent.indexOf('edge/') > -1) { // Edge
            browser = 'edge';
          }
        }
      } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
        if (agent.indexOf('opr') > -1) { // Opera
          browser = 'opera';
        } else if (agent.indexOf('chrome') > -1) { // Chrome
          browser = 'chrome';
        } else { // Safari
          browser = 'safari';
        }
      } else if (agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
      }

      document.getElementsByTagName('html')[0].className = browser;
      if (browser.indexOf("Microsoft Internet Explorer") > -1 || agent.indexOf('trident') > -1){
      alert('브라우저 바꾸세여..')
      }
    },
    
  }
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
  min-height: 100vh; // max-height: 100%;
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
