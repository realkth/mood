<template>
  <header class="header">
    <div class="grid">
      <div class="col">
        <div class="logo col col-m-2 col-m-offset-1 col-d-4 col-d-offset-4">
          <a href="" class="tabfocus">
            <img alt="mood 로고" class="logo-mood" src="../assets/l-mood.svg" height="40px">
          </a>
        </div>
        <div class="dropdown col col-m-1 col-d-offset-3 col-d-1">
          <a class="img-wrapper tabfocus" tabindex="0" @click="openMenu" @keyup.enter="openMenu">
            <img class="dropbtn" alt="회원 이미지" :src="isCurrentUser.photoURL" v-if="isCurrentUser.photoURL !== null" width= "40px" height="40px">
            <span class="dropbtn user-icon" v-else></span>
          </a>
          <div id="myDropdown" class="dropdown-content">
            <a class="tabfocus" href="" @click.prevent="openMySettingModal">내 설정</a>
            <a class="tabfocus" href="" @click.prevent="logout">로그아웃</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase';
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

// 드롭다운 메뉴 외 영역 클릭시 닫히게.
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
  mounted() {
    this.a_getUserInfo()
  },
  computed: {
    ...mapGetters(['isCurrentUser'])
  },
  methods: {
    openMenu: () => {
      if (!document.getElementById("myDropdown").classList.contains("show")) {
        document.getElementById("myDropdown").classList.add("show");
      } else {
        document.getElementById("myDropdown").classList.remove("show")
      }
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('photoURL')
        window.localStorage.removeItem('myAPI')
        window.localStorage.removeItem('signup')
        this.$store.dispatch('a_setFirstPhoto', '')
        this.$router.replace('login')
        window.location.reload(true);
      })
    },
    ...mapActions(['a_getUserInfo', 'a_setFirstPhoto']),

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

.tabfocus {
  &:focus {
    outline-color: rgb(77, 144, 254); // #4D90FE
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
}

.logo-mood {
  padding: 5px 0 5px 0;
}

.tabfocus {
  &:focus {
    outline-color: rgb(77, 144, 254); // #4D90FE
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
  }
}

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
  text-align: right;
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
