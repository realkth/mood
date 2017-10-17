<template>
  <div id="app">
    <div class="browser" id="browser">
      <p>보다 만족스러운 사용자경험을 위해 최신 브라우저를 이용해주세요.</p>
      <button class="btn-close" @click="closeInfoMessage">닫기</button>
    </div>
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
  mounted() {
    this.checkBrowser()
  },
  computed: {
    ...mapGetters(['isToastMessage']),
  },
  methods: {
    closeInfoMessage: () => {
      document.getElementById('browser').style.display = 'none';
    },
    checkBrowser: () => {
      let agent = navigator.userAgent.toLowerCase(),
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
      if (browser.indexOf("Microsoft Internet Explorer") > -1 || agent.indexOf('trident') > -1) {
        document.getElementById('browser').style.display = 'block';
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
  padding: 0;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.browser {
  display: none;
  background: #435353;
  color: #fff;
  padding: 15px;
  text-align: center;
  position: relative;
  p {
    margin: 0;
  }
}

.btn-close {
  background-color: #e4d49e;
  color: #435353;
  border-style: none;
  border-radius: 5px;
  padding: 8px 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20%;
  cursor: pointer;
  font-size: 0.8rem;
}
</style>
