<template>
  <div class="login container">
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>로그인</h3>
        </div>
        <div class="form col">
          <input type="text" v-model="email" placeholder="Email">
        </div>
        <div class="form col">
          <input type="password" v-model="password" placeholder="Password">
          <p class="msg">나도 행복하고 싶다..</p>
        </div>
        <div class="buttons col">
          <button class="signin" v-on:click="signIn">접속하라!</button>
          <!-- <p>You don't have an account ? You can -->
          <button class="signup">
            <router-link to="/sign-up">회원가입!</router-link>
          </button>
          <!-- </p> -->
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

input {
  @extend %input-style;
}

.form {
  text-align: center;
}

.box {
  @extend %box-style;
  display: block;
  padding: 20px 0;
}


.msg {
  text-align: left;
  padding-left: 20%;
  margin-top: 10px;
}

.buttons {
  margin-top: 50px;
  text-align: center;
}

.signin {
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $color-haha;
  color: $color-happy;
}

.signup {
  margin-left: 10%;
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $color-happy;
  color: $color-haha;
}

 ::-webkit-input-placeholder {
  /* Chrome */
  color: red;
}

 :-ms-input-placeholder {
  /* IE 10+ */
  color: red;
}

 ::-moz-placeholder {
  /* Firefox 19+ */
  color: red;
  opacity: 1;
}

 :-moz-placeholder {
  /* Firefox 4 - 18 */
  color: red;
  opacity: 1;
}
</style>
