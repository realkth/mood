<template>
  <div class="write-modal" v-if="visible">
    <div class="modal-bg" @click="closeModal()"></div>
    <div class="container">
      <div class="modal-content box col col-d-6 col-d-offset-3 col-m-4">
        <header class="modal-header">
          <h3> {{ targetFullDate }} </h3>
        </header>
        <section class="modal-body">
          <form class="emoji-wrapper">
            <input @change="setEmotion" type="radio" id="haha" value="emotion-haha" name="emotion">
            <label class="haha" for="haha"></label>
            <input @change="setEmotion" type="radio" id="happy" value="emotion-happy" name="emotion">
            <label class="happy" for="happy"></label>
            <input @change="setEmotion" type="radio" id="soso" value="emotion-soso" name="emotion">
            <label class="soso" for="soso"></label>
            <input @change="setEmotion" type="radio" id="sad" value="emotion-sad" name="emotion">
            <label class="sad" for="sad"></label>
            <input @change="setEmotion" type="radio" id="surprised" value="emotion-surprised" name="emotion">
            <label class="surprised" for="surprised"></label>
            <input @change="setEmotion" type="radio" id="angry" value="emotion-angry" name="emotion">
            <label class="angry" for="angry"></label>
          </form>
          <textarea class="textarea" type="text" @input='setWrite' v-focus="true" cols="30" rows="10" :placeholder='placeholder()'></textarea>
          <!-- <toast-message v-show="isToastMessage"></toast-message> -->
        </section>
        <footer class="modal-footer buttons">
          <button class="write" v-on:click="submit()">기록 남기기</button><button class="cancel" @click="closeModal()">취소</button>
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

const focus = {
  inserted(el) {
    el.focus()
  },
}
export default {
  directives: { focus },
  props: ['targetFullDate'],
  // created() {
  //   this.getUserInfo()
  // },
  computed: {
    ...mapGetters(['isToastMessage', 'isCurrentUser', 'isWrite', 'isEmotion', 'isItem'])
  },
  components: {
    ToastMessage
  },
  data() {
    return {
      visible: this.is_visible,
      // write: {
      //   content: ''
      // },
      // email: '',
      // emotion: '',
      // list: [],
      // item: {},
      // listkey: []

    }
  },
  methods: {
    ...mapActions(['a_setToastMessage', 'a_writePostSubmit', 'a_write', 'a_emotion','a_item','a_getAllData']),
    closeModal() {
      // this.write.content = '';
      this.visible = false;
      this.$parent.blur = null;
    },
    // writePost(target, e) {
    //   let input = e.target.value;
    //   this.write[target] = input;
    // },
    setWrite(e){
      this.$store.dispatch('a_write', e.target.value)
    },
    setEmotion(e){
      this.$store.dispatch('a_emotion', e.target.value)
    },
    submit(){
      this.a_writePostSubmit();
      setTimeout(() => {
        this.closeModal()
      }, 2500);
      // this.$parent.$refs.calendar.makeCalendar();
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
    placeholder: function() {
      return this.$store.getters.isCurrentUser.displayName + "님, 오늘 하루는 어떠셨나요?"
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
  text-align: center; // z-index: 3;
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

.write {
  width: 50%;
  height: 50px;
  border: none;
  padding: 0;
  background-color: $color-haha;
  color: $color-happy;
  outline: none;
}
</style>