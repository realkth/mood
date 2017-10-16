<template>
  <div class="sign-up container">
    <home-header></home-header>
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>회원가입</h3>
        </div>
        <div class="form col">
          <input type="text" @input="sign_email" placeholder="Email" v-focus="true">
          <p class="ok-msg" v-show="validateEmail.sign_email">사용가능한 이메일입니다.</p>
          <p class="msg" id="email_msg" v-show="!validateEmail.sign_email">{{ isSignup_err_email_msg }}</p>
        </div>
        <div class="form form-password col">
          <input type="password" @input="sign_pw" v-model="password" placeholder="Password" @keyup.enter="a_signUp({e: sign_email, p: sign_pw})">
          <p class="ok-msg" v-if="this.password.length >= 6">사용가능한 비밀번호입니다.</p>
          <p class="msg" id="pw_msg" v-else>{{ isSignup_err_pw_msg }}</p>
        </div>
        <div class="buttons col">
          <button class="signup" v-on:click="a_signUp({e: sign_email, p: sign_pw})">회원가입!</button>
          <router-link to="/login">
            <button class="cancel">취소</button>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import HomeHeader from './HomeHeader.vue'
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

const focus = {
  inserted(el) {
    el.focus()
  },
}

export default {
  name: 'signUp',
  components: {
    HomeHeader
  },
  directives: { focus },
  data: function() {
    return {
      password: '',
    }
  },
  computed: {
    ...mapGetters(['isSignup_err_pw_msg', 'isSignup_err_email_msg', 'validateEmail'])
  },
  methods: {
    ...mapActions(['a_signUp', 'a_authStateObserver',
      'a_setEmail', 'a_setPw']),
    sign_email(e) {
      this.$store.dispatch('a_setEmail', e.target.value)
    },
    sign_pw(e) {
      this.$store.dispatch('a_setPw', e.target.value)
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

.ok-msg {
  text-align: left;
  padding-left: 20%;
  margin-top: 10px;
  font-size: 0.8rem;
  color: green;
}

.buttons {
  margin-top: 50px;
  text-align: center;
}

.cancel {
  margin-left: 5%;
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $color-moregray;
  color: $color-black;
}

.signup {
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