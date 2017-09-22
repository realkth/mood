<template>
<div class="my-setting-modal" v-if="visible">
  <div class="modal-bg glass" @click="closeModal()"></div>
  <div class="container">
    <div class="modal-content box col col-d-6 col-d-offset-3 col-m-4">
      <button class="modal-close" alt="모달창 닫기" @click="closeModal()"></button>
      <header class="col">
        <h3>프로필 설정</h3>
      </header>
      <section>
        <div class="user-img-wrapper col">
          <div class="info-wrapper">
            <div class="radius">
              <span class="user-img-icon" v-if="!currentUser.photoURL"></span>
              <img class="user-img" alt="회원 이미지 등록" :src="uploadMyImg" v-if="currentUser.photoURL">
            </div>
            <form class="file-input-wrapper" action="javascript:void(0);" id="uploadImg" name="uploadImg" method="PATCH" enctype="multipart/form-data">
              <input type="file" class="user-img-input" id="upload" ref="file_input" @change="previewFile">
              <label for="upload"></label>
            </form>
          </div>
        </div>
        <div class="form col">
          <input class="nickTest" type="text" @input="changeUserName('displayName', $event)" @value='currentUser.displayName' placeholder="유저 네임" v-focus="true">
          <p class="errmsg" id="pw_msg">{{ this.err_msg }}</p>
        </div>
      </section>
      <footer class="buttons col">
        <button v-on:click="changeProfile" class="resister">등록!</button>
      </footer>
      <!-- <button v-on:click="whoamI">난 누구</button> -->
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
  name: 'mysettngmodal',
  directives: { focus },
  components: {
  },
  props: {
    is_visible: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      visible: this.is_visible,
      uploadMyImg: '',
      currentUser: {
        photoURL: '',
        displayName: ''
      },
      err_msg: ''
    }
  },
  methods: {
    closeModal(){
      this.visible = false;
      this.$parent.blur = null
      // console.log('부모',this.$parent.blur);
    },
    checkImage(file) {
      if (/.*\.(gif)|(jpeg)|(jpg)|(png)$/.test(file.name.toLowerCase())) {
        return true;
      }
    },
    previewFile(e) {
      let _this = this;
      let file = e.target.files[0];
      this.currentUser.photoURL = file;
      let reader = new FileReader();
      if (this.checkImage(file)) {
        this.file = file;
        reader.readAsDataURL(file);
        reader.onload = data => {
          this.uploadMyImg = data.srcElement.result;
          this.currentUser.photoURL = data.srcElement.result;
          _this.file_url = reader.result;
        }
      } else { alert('이미지 파일만 선택 가능합니다.') }
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
    changeProfile: function() {
      let user = firebase.auth().currentUser;
      if (this.currentUser.displayName.trim() !== '') {
        user.updateProfile({
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL
        }).then(function(response) {
          //Success
          // this.$router.replace('hello')
          // console.log(firebase.auth().currentUser.displayName)
          // console.log(firebase.auth().currentUser.photoURL)
        }, function(error) {
          //Error
          console.log(error);
        });
        // this.$router.replace('second-setting')
        this.closeModal();
        // console.log('성공');
      }
      else {
        this.err_msg = '유저 네임을 설정해주세요.';
      }
      // this.currentUser.displayName = '';
      // this.closeModal();
      // this.visible = false;
      
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~style";

.modal-bg{
  background: #fff;
  // background: $color-black;
  min-height: 100vh;
  width: 100%;
  top: 0;
  opacity: 0;
  position: absolute;
  z-index: 2;
}
.modal-content {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 3;
}

.modal-close {
  background: url('../assets/mood-icon-close.svg') no-repeat;
  background-size: 10px;
  background-position: 50%;
  position: absolute;
  z-index: 4;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border: none;
}

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
  padding: 40px 0;
  // margin-bottom: 50px;
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

.errmsg {
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
