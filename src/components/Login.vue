<template>
  <div class="login container">
    <home-header></home-header>
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>로그인</h3>
        </div>
        <div class="form col">
          <input type="text" v-model="email" placeholder="Email" autofocus>
          <p class="errmsg" id="email_msg">{{ this.err_email_msg }}</p>
        </div>
        <div class="form col">
          <input type="password" v-model="password" placeholder="Password" class="form-password">
          <p class="errmsg" id="pw_msg">{{ this.err_pw_msg }}</p>
        </div>
        <div class="buttons col">
          <button class="signin" v-on:click="signIn">접속하라!</button>
          <router-link to="/sign-up">
            <button class="signup">회원가입!</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import HomeHeader from './HomeHeader.vue'

export default {
  name: 'login',
  components: {
    HomeHeader
  },
  data: function() {
    return {
      email: '',
      password: '',
      err_email_msg: '',
      err_pw_msg: '',
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('hello')
        },
        (err) => {
          if (err.code === 'auth/user-not-found') {
            this.err_email_msg = '등록되지 않은 이메일입니다.';
          }
          else if (err.code === 'auth/invalid-email') {
            this.err_email_msg = '이메일 형식이 유효하지 않습니다.';
          }
          else {
            this.err_pw_msg = '비밀번호가 틀렸습니다.';
            this.err_email_msg = '';
          }
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
  margin-bottom: 30px;
}

input {
  @extend %input-style;
}

.form {
  text-align: center;
}

.form-password {
  margin-top: 20px;
}

.box {
  @extend %box-style;
  display: block;
  padding: 60px 0;
  margin-bottom: 50px;
}


.msg {
  text-align: left;
  padding-left: 20%;
  margin-top: 10px;
  font-size: 0.8rem;
  color: $color-gray;
}

.errmsg {
  text-align: left;
  padding-left: 20%;
  margin-top: 10px;
  font-size: 0.8rem;
  color: $color-alert;
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
  margin-left: 5%;
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $color-happy;
  color: $color-haha;
}

::-webkit-input-placeholder {
  /* Chrome */
  color: $color-moregray;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: $color-moregray;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: $color-moregray;
  opacity: 1;
}

:-moz-placeholder {
  /* Firefox 4 - 18 */
  color: $color-moregray;
  opacity: 1;
}
</style>
