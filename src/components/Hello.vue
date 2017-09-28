<template>
  <div>
    <main-header ref="main_header" v-bind:style="blur"></main-header>
    <calendar ref="calendar" v-bind:style="blur"></calendar>
    <div class="hello">
      <br>
      <br>
      <br>
      <br>
      <button v-on:click="logout">Logout</button>
      <button v-on:click="whoamI">난 누구</button>
      <input class="nickTest" type="text" @input="changeUserName('displayName', $event)" @value='currentUser.displayName' placeholder="유저 네임">
      <button v-on:click="changeName">이름 변경</button>
      <button v-on:click="nowTime">오늘 날짜, 현재 시간</button>
    </div>
    <my-setting-modal ref='my_setting_modal'></my-setting-modal>
    <write-modal :targetFullDate = "targetFullDate" :targeturldaylist= "targeturldaylist" ref='write_modal'></write-modal>
    <my-post-modal :targetFullDate = "targetFullDate" :targeturldaylist= " targeturldaylist" ref='my_post_modal'></my-post-modal>
  </div>
</template>

<script>
import firebase from 'firebase';
import MainHeader from './MainHeader.vue';
import Calendar from './Calendar.vue';
import MySettingModal from './MySettingModal.vue';
import WriteModal from './WriteModal.vue';
import MyPostModal from './MyPostModal.vue';
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'hello',
  components: {
    MainHeader,
    Calendar,
    MySettingModal,
    MyPostModal,
    WriteModal
  },
  data() {
    return {
      blur: null,
      currentUser: {
        displayName: ''
      },
      targetFullDate: '',
      targeturldaylist:'',
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    changeUserName(target, e) {
      let input = e.target.value;
      this.currentUser[target] = input;
    },
    whoamI: function() {
      console.log(firebase.auth().currentUser);
      this.currentUser.currentUser = firebase.auth().currentUser.displayName;
      alert(firebase.auth().currentUser.displayName);
    },
    changeName: function() {
      let user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: this.currentUser.displayName
      }).then(function(response) {
        //Success
        console.log(firebase.auth().currentUser.displayName)
      }, function(error) {
        //Error
        console.log(error);
      });
    },
    nowTime: function() {
      var currentdate = new Date();
      if (currentdate.getHours() > 12) {
        var time = "PM " + ((currentdate.getHours() + 24) % 12 || 12) + "시 "
      } else {
        var time = currentdate.getHours() + "시 "
      }
      var datetime = currentdate.getFullYear() + "년 "
        + (currentdate.getMonth() + 1) + "월 "
        + currentdate.getDate() + "일 "
        + time
        + currentdate.getMinutes() + "분"
      console.log(datetime)
    },
    getUserInfo: function() {
      let user = firebase.auth().currentUser;
      let name, email, photoURL, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoURL = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
      }
      console.log(email)
      console.log(uid)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.blur {
  -webkit-filter: blur(30px);
  -moz-filter: blur(30px);
  -o-filter: blur(30px);
  -ms-filter: blur(30px);
  filter: blur(30px);
}
</style>
