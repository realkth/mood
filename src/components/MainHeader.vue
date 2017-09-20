<template>
  <header class="header">
    <div class="grid">
      <div class="col">
        <div class="logo col col-m-2 col-m-offset-1 col-d-4 col-d-offset-4">
          <img src="../assets/l-mood.svg" height="40px">
        </div>
        <div class="dropdown col col-m-1 col-d-offset-3 col-d-1">
          <img class="dropbtn" @click="openMenu" :src="this.photoUrl" height="40px">
          <div id="myDropdown" class="dropdown-content">
            <a href="#">내 설정</a>
            <a href="#" @click="logout">로그아웃</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase';
// import {mapGetters, mapMutations, mapActions} from 'vuex'
import {mapGetters} from 'vuex'

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
export default {
  name: 'MainHeader',
  data() {
    return {
      photoUrl: ''
    }
  },
  created(){
    this.getUserInfo();
  },
  // computed: {
  //   ...mapGetters([
  //     'photoUrl'
  //   ])
  // },
  methods: {
    openMenu: function() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    getUserInfo: function () {
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
      }
      this.photoUrl = photoUrl;
      // console.log('this.photourl',this.photoUrl)
      // console.log(uid)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style";
.header {
  background: $color-white;
  width: 100%;
  height: 50px;
  display: inline-block;
}

.logo {
  text-align: center;
}

img {
  padding: 5px 0 5px 0;
}

.dropdown {
  text-align: right; // display: inline-block;
  position: relative;
  display: inline-block;
}

.dropbtn {
  border-radius: 50%;
  width: 40px;
  cursor: pointer;
  text-align: right;
}

.dropbtn:hover,
.dropbtn:focus {
  opacity: 0.65;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  top: 55px;
  background-color: $color-white;
  color: $color-angry;
  min-width: 120px;
  box-shadow: 5px 5px 13px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  color: $color-black;
  display: block;
  border-radius: 5px;
}

.dropdown-content a:hover {
  background-color: #e5e6d6;
  color: $color-black;
}

.show {
  display: block;
}

.animate {
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -ms-transition: all .3s;
  -ms-transition: all .3s;
  transition: all .3s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  /* Chrome and Safari */
  -moz-backface-visibility: hidden;
  /* Firefox */
  -ms-backface-visibility: hidden;
  /* Internet Explorer */
}
</style>
