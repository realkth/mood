<template>
  <div>
  <main-header></main-header>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <button v-on:click="logout">Logout</button>
    <button v-on:click="whoamI">난 누구</button>
    <input class="nickTest" type="text" @input="changeUserName('displayName', $event)" @value='currentUser.displayName' placeholder="유저 네임">
    <button v-on:click="changeName">이름 변경</button>
    <button v-on:click="nowTime">오늘 날짜, 현재 시간</button>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import MainHeader from './MainHeader.vue';

export default {
  name: 'hello',
  components: {
    MainHeader,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentUser: {
        displayName: ''
      }
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
    // changeName: function() {
    //   this.currentUser.currentUser = firebase.auth().currentUser.displayName
    //   console.log(this.currentUser.currentUser)
    //   this.currentUser.currentUser = ''
    //   // firebase.auth().currentUser.displayName
    // },
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
      let name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
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
</style>
