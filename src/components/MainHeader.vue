<template>
  <header class="header">
    <div class="grid">
      <div class="col">
        <div class="logo col col-m-2 col-m-offset-1 col-d-4 col-d-offset-4">
          <img src="../assets/l-mood.svg" height="40px">
        </div>
        <div class="dropdown col col-m-1 col-d-offset-3 col-d-1">
          <div class="img-wrapper">
            <img class="dropbtn" alt="회원 이미지" @click="openMenu" :src="isCurrentUser.photoURL" v-if="isCurrentUser.photoURL !== null" height="40px">
            <span class="dropbtn user-icon" @click="openMenu" v-else></span>
          </div>
          <div id="myDropdown" class="dropdown-content">
            <a href="" @click.prevent="openMySettingModal">내 설정</a>
            <a href="" @click.prevent="logout">로그아웃</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    <!-- <my-setting-modal ref='my_setting_modal'></my-setting-modal> -->
  </header>
</template>

<script>
import firebase from 'firebase';
import { state, mapGetters, mapMutations, mapActions } from 'vuex'
// import MySettingModal from './MySettingModal';

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
  components:{
    // MySettingModal
  },
  mounted() {
    this.a_getUserInfo()
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['isCurrentUser'])
  },
  methods: {
    openMenu: function() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('photoURL')
        window.localStorage.removeItem('myAPI')
        this.$router.replace('login')
      })
    },
    ...mapActions(['a_getUserInfo']),
    // getUserInfo: function() {
    //   var user = firebase.auth().currentUser;
    //   var name, email, photoURL, uid, emailVerified;

    //   if (user != null) {
    //     name = user.displayName;
    //     email = user.email;
    //     photoURL = user.photoURL;
    //     emailVerified = user.emailVerified;
    //     uid = user.uid;
    //   }
    //   this.photoURL = photoURL
    // },
    openMySettingModal() {
      this.$parent.$refs.my_setting_modal.visible = true;
      this.$parent.blur = {
        '-webkit-filter': 'blur(30px)',
        '-moz-filter': 'blur(30px)',
        '-o-filter': 'blur(30px)',
        '-ms-filter': 'blur(30px)',
        'filter': 'blur(30px)'
      }
    },
  },
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

// img {
//   padding: 5px 0 5px 0;
// }

.img-wrapper {
  background: $color-moregray;
  display: inline-block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 5px;
  cursor: pointer;
}
.dropdown {
  text-align: right; // display: inline-block;
  position: relative;
  display: inline-block;
}

.user-icon {
  display: block;
  width: 40px;
  height: 40px;
  background: $color-moregray url('../assets/mood-icon-profile.svg');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 50% 50%;
  // margin-top: 50px;
}

.dropbtn {
  // border-radius: 50%;
  // width: 40px;
  // cursor: pointer;
  // text-align: right;
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
