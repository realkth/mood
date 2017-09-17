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
          <p>나도 행복하고 싶다..</p>
        </div>
        <div class="col">
          <button v-on:click="signIn">접속하라!</button>
        </div>
        <div class="col">
          <p>You don't have an account ? You can
            <router-link to="/sign-up">회원가입!</router-link>
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
@import "~style";
h3 {
  text-align: center;
  color: $color-mood;
  font-size: 1.6rem;
}

div {
  text-align: center;
}

.box {
  @extend %box-style;
  display: block;
  padding: 20px 0;
}

input {
  @extend %input-style;
}
p{
  text-align: left;
  padding-left: 20%;
}
</style>
