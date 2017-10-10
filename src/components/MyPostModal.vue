<template>
  <div class="post-modal" v-if="visible">
    <div class="modal-bg" @click="closeModal()"></div>
    <div class="container">
      <div class="modal-content box col col-d-6 col-d-offset-3 col-m-4">
        <header class="modal-header">
          <h3> {{ targetFullDate }} </h3>
        </header>
        <section class="modal-body">
          <div class="emoji-wrapper" id="content-emotion">
            <img v-if="targetEmotion === 'emotion-haha'" class="haha">
            <img v-if="targetEmotion === 'emotion-happy'" class="happy">
            <img v-if="targetEmotion === 'emotion-soso'" class="soso">
            <img v-if="targetEmotion === 'emotion-sad'" class="sad">
            <img v-if="targetEmotion === 'emotion-surprised'" class="surprised">
            <img v-if="targetEmotion === 'emotion-angry'" class="angry">
          </div>
          <form class="select-emoji-wrapper" id="edit-emotion" style="display:none">
            <input @change="setEmotion" type="radio" id="haha" value="emotion-haha" name="emotion" :checked="targetEmotion === 'emotion-haha'">
            <label class="select-haha" for="haha"></label>
            <input @change="setEmotion" type="radio" id="happy" value="emotion-happy" name="emotion" :checked="targetEmotion === 'emotion-happy'">
            <label class="select-happy" for="happy"></label>
            <input @change="setEmotion" type="radio" id="soso" value="emotion-soso" name="emotion" :checked="targetEmotion === 'emotion-soso'">
            <label class="select-soso" for="soso"></label>
            <input @change="setEmotion" type="radio" id="sad" value="emotion-sad" name="emotion" :checked="targetEmotion === 'emotion-sad'">
            <label class="select-sad" for="sad"></label>
            <input @change="setEmotion" type="radio" id="surprised" value="emotion-surprised" name="emotion" :checked="targetEmotion === 'emotion-surprised'">
            <label class="select-surprised" for="surprised"></label>
            <input @change="setEmotion" type="radio" id="angry" value="emotion-angry" name="emotion" :checked="targetEmotion === 'emotion-angry'">
            <label class="select-angry" for="angry"></label>
          </form>
          <p class="content" id='content' style='white-space: pre-line'>{{ targetContent }}</p>
          <textarea class="textarea" id='textarea' type="text" @input='setWrite' cols="30" rows="10" :placeholder='placeholder()' style="display:none">{{targetContent}}</textarea>
        </section>
        <footer class="modal-footer buttons">
          <button class="modify" id="modify" v-on:click="modifyPostSubmit()">수정하기</button><button class="modify" id="send" v-on:click="submit()">기록하기</button><button class="cancel" id="cancel" @click="closeModal()">닫기</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import ToastMessage from './ToastMessage.vue'
import { state, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: ['targetFullDate', 'targetEmotion', 'targetContent'],
  computed: {
    ...mapGetters(['isToastMessage', 'isCurrentUser', 'isWrite', 'isEmotion', 'isItem', 'isListKey', 'isUrlDate', 'isTargeturldaylist']),
  },
  data() {
    return {
      visible: this.is_visible,
    }
  },
  methods: {
    ...mapActions(['a_setToastMessage', 'a_writePostSubmit', 'a_write', 'a_emotion', 'a_item', 'a_getAllData']),
    closeModal() {
      this.visible = false;
      this.$parent.blur = null;
    },
    // writePost(target, e) {
    //   let input = e.target.value;
    //   this.write[target] = input;
    // },
    setWrite(e) {
      this.$store.dispatch('a_write', e.target.value)
    },
    setEmotion(e) {
      this.$store.dispatch('a_emotion', e.target.value)
    },
    submit() {

      let email = window.localStorage.getItem('email');
      // 기존꺼 삭제하고 작동하도록 하면 될듯
      axios.patch(this.$store.state.targeturldaylist, {
        userEmail: email,
        emotion: this.$store.state.emotion,
        // content: this.$store.state.write.content
      }).then(response => { console.log(response) }).catch(error => console.error(error))

      this.a_writePostSubmit();
      setTimeout(() => {
        this.closeModal()
      }, 2500);
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
    modifyPostSubmit: function() {
      // document.getElementById('content').contentEditable = 'true';
      document.getElementById('modify').style.display = 'none';
      document.getElementById('content').style.display = 'none';
      document.getElementById('send').style.display = 'inline';
      document.getElementById('textarea').style.display = 'inline';
      document.getElementById('cancel').style.color = '#e4d49e'
      document.getElementById('cancel').style.backgroundColor = '#6f8b78'
      document.getElementById('content-emotion').style.display = 'none'
      document.getElementById('edit-emotion').style.display = 'block'
    },
    placeholder: function() {
      return this.$store.getters.isCurrentUser.displayName + "님, 오늘 하루는 어떠셨나요?"
    },
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
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}

.content {
  padding: 5px 12.5%;
}

.haha {
  background: url(../assets/emoji-haha.svg) no-repeat $color-haha;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%;
}

.happy {
  background: url(../assets/emoji-happy.svg) no-repeat $color-happy;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%;
}

.soso {
  background: url(../assets/emoji-soso.svg) no-repeat $color-soso;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%; // border: none;
}

.sad {
  background: url(../assets/emoji-sad.svg) no-repeat $color-sad;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%;
}

.surprised {
  background: url(../assets/emoji-surprised.svg) no-repeat $color-surprised;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%;
}

.angry {
  background: url(../assets/emoji-angry.svg) no-repeat $color-angry;
  background-size: 80%;
  width: 100%;
  height: 100%;
  background-position: 50%;
}

.modal-bg {
  background: $color-white;
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
  background-color: $color-happy;
  color: $color-haha;
  outline: none;
}

.modify {
  width: 50%;
  height: 50px;
  border: none;
  padding: 0;
  background-color: $color-haha;
  color: $color-happy;
  outline: none;
}

#send {
  width: 50%;
  height: 50px;
  border: none;
  padding: 0;
  background-color: $color-happy;
  color: $color-haha;
  outline: none;
  display: none;
}

.select-emoji-wrapper {
  margin-bottom: 20px;
  display: block;
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
  margin: 40px 4.8px 0 4.8px;
  opacity: 0.3;
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
  transform: translateY(-40px);
}

.select-haha {
  background: url(../assets/emoji-haha.svg) no-repeat $color-haha;
  background-size: 80%;
  background-position: 50%;
}

.select-happy {
  background: url(../assets/emoji-happy.svg) no-repeat $color-happy;
  background-size: 80%;
  background-position: 50%;
}

.select-soso {
  background: url(../assets/emoji-soso.svg) no-repeat $color-soso;
  background-size: 80%;
  background-position: 50%;
}

.select-sad {
  background: url(../assets/emoji-sad.svg) no-repeat $color-sad;
  background-size: 80%;
  background-position: 50%;
}

.select-surprised {
  background: url(../assets/emoji-surprised.svg) no-repeat $color-surprised;
  background-size: 80%;
  background-position: 50%;
}

.select-angry {
  background: url(../assets/emoji-angry.svg) no-repeat $color-angry;
  background-size: 80%;
  background-position: 50%;
}
</style>