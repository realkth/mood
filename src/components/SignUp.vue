<template>
  <div class="sign-up container">
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>회원가입</h3>
        </div>
        <div class="form col">
          <input type="text" v-model="email" placeholder="Email" v-focus="true">
          <p class="ok-msg" v-show="validateEmail.email">사용가능한 이메일입니다.</p>
          <p class="msg" id="email_msg" v-show="!validateEmail.email">{{ err_email_msg }}</p>
        </div>
        <div class="form form-password col">
          <input type="password" v-model="password" placeholder="Password">
          <p class="ok-msg" v-if="this.password.length >= 6">사용가능한 비밀번호입니다.</p>
          <p class="msg" id="pw_msg" v-else>{{ err_pw_msg }}</p>
        </div>
        <div class="buttons col">
          <button class="signup" v-on:click="signUp">회원가입!</button>
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

const focus = {
  inserted(el) {
    el.focus()
  },
}

export default {
  name: 'signUp',
  directives: { focus },
  data: function() {
    return {
      email: '',
      password: '',
      err_email_msg: '',
      err_pw_msg: '비밀번호는 6자 이상이어야 합니다.',
    }
  },
  computed: {
    validateEmail: function() {
      let emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return {
        email: emailRE.test(this.email)
      }
    },
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('first-setting')
        },
        (err) => {
          console.log('Oops. ' + err.message);
          if (err.message === 'Password should be at least 6 characters') {
            this.err_pw_msg = '비밀번호가 유효하지 않습니다.';
            let msg_element = document.getElementById('pw_msg');
            msg_element.classList.remove('msg');
            msg_element.classList.add('errmsg');
          }
          else if (err.message === 'The email address is already in use by another account.') {
            this.err_email_msg = '이미 가입된 이메일입니다.';
            let msg_element = document.getElementById('email_msg');
            msg_element.classList.remove('msg');
            msg_element.classList.add('errmsg');
            this.email = this.email + '  ';
          }
          else if (err.message === 'The email address is badly formatted.') {
            if (this.email === '' && this.password === '') {
              this.err_pw_msg = '비밀번호를 입력해주세요.';
              this.err_email_msg = '이메일을 입력해주세요.';
              let msg_email_element = document.getElementById('email_msg');
              let msg_pw_element = document.getElementById('pw_msg');
              msg_email_element.classList.remove('msg');
              msg_email_element.classList.add('errmsg');
              msg_pw_element.classList.remove('msg');
              msg_pw_element.classList.add('errmsg');
            }
            else {
              this.err_email_msg = '이메일 형식이 유효하지 않습니다.';
              let msg_element = document.getElementById('email_msg');
              msg_element.classList.remove('msg');
              msg_element.classList.add('errmsg');
            }
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