<template>
  <div id="app">
    <div class="container main-logo">
      <div class="grid">
        <div class="col">
          <h1>
            <img src="./assets/l-mood.svg" width="200">
          </h1>
        </div>
      </div>
      <router-view></router-view>
    </div>
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
  min-height: 100vh;
  max-height: 130vh;
  // padding-bottom: 50px;
}

// 모든 요소에 적용될 사항은 app.vue 스타일에 적용하기로 결정
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; // text-align: center;
  padding-top: 60px;
}

h1 {
  text-align: center;
  margin-bottom: 50px;
}
</style>
