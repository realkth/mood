<template>
  <div class="second-setting container">
    <home-header></home-header>
    <div class="grid">
      <div class="box col col-d-6 col-d-offset-3 col-m-4">
        <div class="col">
          <h3>이메일 인증</h3>
        </div>
        <div class="user-img-wrapper col">
          <div class="info-wrapper">
            <div class="radius">
              <span class="user-img-icon" v-if="(this.photoURL === null)"></span>
              <img class="user-img" alt="회원 이미지" :src="this.photoURL" v-if="(this.photoURL !== null)">
            </div>
          </div>
        </div>
        <div class="form col">
          <input class="nickTest" type="email" :placeholder="email" disabled>
          <p class="infomsg">이메일 인증을 하셔야 정상적인 서비스 이용이 가능합니다.</p>
        </div>
        <div class="buttons col">
          <button v-on:click="verfification" class="resister">인증하기!</button>
        </div>
        <button v-on:click="whoamI">난 누구</button>
      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import HomeHeader from './HomeHeader.vue'

export default {
  name: 'secondSetting',
  components: {
    HomeHeader
  },
  created() {
    this.getUserInfo()
  },
  data: function() {
    return {
      uploadMyImg: '',
      currentUser: {
        photoURL: '',
        displayName: ''
      },
      err_msg: '',
      photoURL: '',
      email:''
    }
  },
  methods: {
    whoamI: function() {
      console.log(firebase.auth().currentUser);
      this.currentUser.currentUser = firebase.auth().currentUser.displayName;
      alert(firebase.auth().currentUser.displayName);
    },
    verfification: function() {
      let user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {
        // Email sent.
      }, function(error) {
        // An error happened.
      });
      this.$router.replace('hello')
    },
    getUserInfo: function() {
      var user = firebase.auth().currentUser;
      var name, email, photoURL, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoURL = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
      }
      this.photoURL = photoURL
      this.email = email
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
  margin-bottom: 20px;
}

.user-img-wrapper {
  text-align: center;
}

.info-wrapper {
  position: relative;
  width: 155px;
  height: 128px;
  display: inline-block;
  margin-bottom: 20px;
}

.radius {
  background: $color-moregray;
  display: inline-block;
  width: 128px;
  height: 128px;
  overflow: hidden;
  border-radius: 50%;
}

.user-img-icon {
  width: 128px;
  height: 128px;
  display: block;
  background: url('../assets/mood-icon-profile.svg');
  background-repeat: no-repeat;
  background-size: 50px auto;
  background-position: 50% 40%;
}

.user-img {
  width: 100%;
  height: 100%;
}


input {
  @extend %input-style;
}

.form {
  text-align: center;
}

.user-img-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.user-img-input+label {
  font-size: 1.25em;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  border: 4px solid $color-white;
  background: $color-moregray url('../assets/setting-02.svg');
  background-repeat: no-repeat;
  background-size: 20px auto;
  background-position: 50% 50%;
}

.user-img-input:focus+label,
.user-img-input+label:hover {
  background-color: $color-haha;
}

.box {
  @extend %box-style;
  display: block;
  padding: 60px 0;
  margin-bottom: 50px;
}

.buttons {
  margin-top: 50px;
  text-align: center;
}

.resister {
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $color-haha;
  color: $color-happy;
}

.infomsg {
  text-align: left;
  padding-left: 20%;
  margin-top: 10px;
  font-size: 0.8rem;
  color: $color-alert;
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
