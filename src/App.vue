<template>
  <div id="app">
    <div class="container">
      <div class="grid">
        <div class="col">
          <h1>
            <img src="./assets/l-mood.svg" alt="mood 로고" width="200">
          </h1>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "~style";

h1 {
  text-align: center;
  margin-bottom: 20px;
}
body {
  background: #c3c194; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(#c3c194 10%, #6f8b78 60%,#353e45 100%); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#c3c194 10%, #6f8b78 60%,#353e45 100%); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#c3c194 10%, #6f8b78 60%,#353e45 100%); /* For Firefox 3.6 to 15 */
  background: linear-gradient(#c3c194 10%, #6f8b78 60%,#353e45 100%); /* Standard syntax */
  height: 100vh;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  padding-top: 60px;

}
</style>
