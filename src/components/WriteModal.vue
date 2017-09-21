<template>
  <div class="write-modal" v-if="visible">
    <div class="modal-bg" @click="closeModal()"></div>
    <div class="container">
      <div class="modal-content box col col-d-6 col-d-offset-3 col-m-4">
        <header class="modal-header">
          <h3> {{ nowTime(new Date()) }} </h3>
        </header>
        <section class="modal-body">
          <form class="emoji-wrapper">
            <input type="radio" id="haha" name="emotion">
            <label class="haha" for="haha"></label>
            <input type="radio" id="happy" name="emotion">
            <label class="happy" for="happy"></label>
            <input type="radio" id="soso" name="emotion">
            <label class="soso" for="soso"></label>
            <input type="radio" id="sad" name="emotion">
            <label class="sad" for="sad"></label>
            <input type="radio" id="surprised" name="emotion">
            <label class="surprised" for="surprised"></label>
            <input type="radio" id="angry" name="emotion">
            <label class="angry" for="angry"></label>
          </form>
          <textarea class="textarea" type="text" @input="writePost('content', $event)" @value='write.content' v-focus="true" cols="30" rows="10" :placeholder='placeholder()'></textarea>
        </section>
        <footer class="modal-footer buttons">
          <button class="write" v-on:click="writePostSubmit()">기록 남기기</button><button class="cancel" @click="closeModal()">취소</button>
        </footer>
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
  directives: { focus },
  props: {
    close_message: {
      type: String,
      default: 'Close Modal'
    },
    is_visible: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      visible: this.is_visible,
      write: {
        content: ''
      },
      name: ''
    }
  },
  methods: {
    closeModal() {
      this.write.content = '';
      this.visible = false;
    },
    writePost(target, e) {
      let input = e.target.value;
      this.write[target] = input;
    },
    writePostSubmit() {
      console.log("작동!");
      this.visible = false;
    },
    nowTime: function(date) {
      if (date.getHours() > 12) {
        var time = "PM " + ((date.getHours() + 24) % 12 || 12) + "시 "
      } else {
        var time = date.getHours() + "시 "
      }
      var datetime = date.getFullYear() + "년 "
        + (date.getMonth() + 1) + "월 "
        + date.getDate() + "일 "
        + time
        + date.getMinutes() + "분"
      return datetime
    },
    getUserInfo: function() {
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
      }
      this.name = name
    },
    placeholder: function() {
      return this.name + "님, 오늘 하루는 어떠셨나요?"
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style";
.box {
  @extend %box-style;
  display: block;
  padding: 40px 0 0 0;
  overflow: hidden;
  text-align: center;
}

h3 {
  text-align: center;
  color: $color-mood;
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.emoji-wrapper {
  margin-bottom: 20px;
}

input {
  display: none;
}

input[type="radio"]+label {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 0px;
  opacity: 0.3;
  margin: 0 4.8px;
  &:active,
  &:focus,
  &:hover,
  &::selection {
    opacity: 1;
  }
}

input[type="radio"]:checked+label {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 0px;
  opacity: 1;
  border: 0.7px dashed $color-mood;
}

.haha {
  background: url(../assets/emoji-haha.svg) no-repeat $color-haha;
  background-size: 80%;
  background-position: 50%;
}

.happy {
  background: url(../assets/emoji-happy.svg) no-repeat $color-happy;
  background-size: 80%;
  background-position: 50%;
}

.soso {
  background: url(../assets/emoji-soso.svg) no-repeat $color-soso;
  background-size: 80%;
  background-position: 50%;
}

.sad {
  background: url(../assets/emoji-sad.svg) no-repeat $color-sad;
  background-size: 80%;
  background-position: 50%;
}

.surprised {
  background: url(../assets/emoji-surprised.svg) no-repeat $color-surprised;
  background-size: 80%;
  background-position: 50%;
}

.angry {
  background: url(../assets/emoji-angry.svg) no-repeat $color-angry;
  background-size: 80%;
  background-position: 50%;
}

.modal-bg {
  background: $color-black;
  min-height: 100vh;
  width: 100%;
  top: 0;
  opacity: 0.8;
  position: absolute;
  z-index: 2;
}

.modal-content {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 3;
}

.textarea {
  width: 85%;
  padding: 0;
  border-radius: 5px;
  border: 1px solid $color-mood;
  padding: 5px;
}

.buttons {
  margin-top: 50px;
}

.cancel {
  width: 50%;
  height: 50px;
  border: none;
  padding: 0;
  background-color: $color-haha;
  color: $color-happy;
  outline: none;
}

.write {
  width: 50%;
  height: 50px;
  border: none;
  padding: 0;
  background-color: $color-happy;
  color: $color-haha;
  outline: none;
}
</style>
