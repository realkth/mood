<template>
  <div class="post-modal" v-if="visible">
    <div class="modal-bg" @click="closeModal()"></div>
    <div class="container">
      <div class="modal-content box col col-d-6 col-d-offset-3 col-m-4">
        <header class="modal-header">
          <h3> {{ targetFullDate}} </h3>
        </header>
        <section class="modal-body">
          <div class="emoji-wrapper">
            <img class="angry">
            <!-- <img src="../assets/emoji-happy.svg" class="happy">
              <img src="../assets/emoji-soso.svg" class="soso">
              <img src="../assets/emoji-sad.svg" class="sad">
              <img src="../assets/emoji-surprised.svg" class="surprised">
              <img src="../assets/emoji-angry.svg" class="angry"> -->
          </div>
          <p class="content" style='white-space: pre-line'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non aspernatur earum archiuscipit. Nesciunt beatae repellat ducimus consectetur eligendi, officia quo et, dicta eos quam tempora, laboriosam voluptatibus velit sed magnam enim voluptates perferendis voluptatibus obcaecati! Aliquam harum perferendis quisquam dolorum deleniti qui nostruue cum temporibus saepe facere, et consectetur molestiae excepturi rem deserunt. Dol</p>
        </section>
        <footer class="modal-footer buttons">
          <button class="modify" v-on:click="modifyPostSubmit()">수정하기</button><button class="cancel" @click="closeModal()">닫기</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['targetFullDate', 'targeturldaylist'],
  data() {
    return {
      visible: this.is_visible,
      write: {
        content: ''
      },
    }
  },
  methods: {
    closeModal() {
      this.write.content = '';
      this.visible = false;
      this.$parent.blur = null;
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
    modifyPostSubmit: function() {
      console.log("수정하기")
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
  background-position: 50%;
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
</style>
