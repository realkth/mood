<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
  height: 100vh;
}

// 모든 요소에 적용될 사항은 app.vue 스타일에 적용하기로 결정
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; // text-align: center;
  // margin-top: 60px;
}

body {
  padding: 0;
  margin: 0;
}

// h1 {
//   text-align: center;
//   margin-bottom: 50px;
// }
</style>
