<template>
  <div class="login container">
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>로그인</h3>
        </div>
        <div class="col">
          <input type="text" v-model="email" placeholder="Email">
        </div>
        <div class="col">
          <input type="password" v-model="password" placeholder="Password">
        </div>
        <div class="col">
          <button v-on:click="signIn">Connection</button>
        </div>
        <div class="col">
          <p>You don't have an account ? You can
            <router-link to="/sign-up">create one</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('hello')
        },
        (err) => {
          console.log(error)
          alert('Oops. ' + err.message)
        }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
  /* "scoped" attribute limit the CSS to this component only */

  @import "~style";
  div {
    text-align: center
  }
  .box {
    @extend %box-style; // width: 500px;
    // height: 500px;
    display: block;
  } // .login {
  //   margin-top: 40px;
  // }
  // input {
  //   margin: 10px 0;
  //   width: 20%;
  //   padding: 15px;
  // }
  // button {
  //   margin-top: 20px;
  //   width: 10%;
  //   cursor: pointer;
  // }
  // p {
  //   margin-top: 40px;
  //   font-size: 13px;
  // }
  // p a {
  //   text-decoration: underline;
  //   cursor: pointer;
  // }
</style>
