<template>
  <div class="login container">
    <home-header></home-header>
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>로그인</h3>
        </div>
        <div class="form col">
          <input type="text" @input="email" placeholder="Email" autofocus>
          <p class="errmsg" id="email_msg">{{ isErrEmailMsg }}</p>
        </div>
        <div class="form col">
          <input type="password" @input="password" placeholder="Password" class="form-password" @keyup.enter="a_logInUser({e: email, p: input_pw})">
          <p class="errmsg" id="pw_msg">{{ isErrPwMsg }}</p>
        </div>
        <div class="buttons col">
          <button class="signin" v-on:click="a_logInUser({e: email, p: input_pw})">접속하라!</button>
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
import { state, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'login',
  components: {
    HomeHeader
  },
  computed: {
    ...mapGetters(['isEmail', 'isErrEmailMsg', 'isErrPwMsg'])
  },
  created() {
    this.logout()
  },
  data: function() {
    return {
      input_pw: '',
      err_email_msg: '',
      err_pw_msg: '',
    }
  },
  methods: {
    ...mapActions([
      'a_logInUser', 'a_signInAuthState', 'a_email', 'a_password','a_setFirstPhoto'
    ]),
    email(e) {
      this.$store.dispatch('a_email', e.target.value)
    },
    password(e) {
      this.$store.dispatch('a_password', e.target.value)
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('photoURL')
        window.localStorage.removeItem('myAPI')
        window.localStorage.removeItem('signup')
        this.$store.dispatch('a_setFirstPhoto', '')
      })
    },
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