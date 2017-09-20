<template>
  <div class="write-modal-container is-active" v-if="visible">
    <div class="write-modal-background" @click="closeModal">
      <div class="grid">
        <div class="box col col-d-6 col-d-offset-3 col-m-4">
          <header class="modal-header"> {{ nowTime(new Date()) }}</header>
          <main class="modal-body">
            <img src="../assets/emoji-angry.svg" alt="" height="40px">
            <img src="../assets/emoji-haha.svg" alt="" height="40px">
            <img src="../assets/emoji-sad.svg" alt="" height="40px">
            <img src="../assets/emoji-happy.svg" alt="" height="40px">
            <img src="../assets/emoji-soso.svg" alt="" height="40px">
            <img src="../assets/emoji-surprised.svg" alt="" height="40px">
            <textarea class="textarea" type="text" placeholder='하루 일기 써봐.' @input="writePost('content', $event)" @value='write.content' v-focus="true" cols="30" rows="10"></textarea>
          </main>
          <footer class="modal-footer">
            <button type="submit" class="submit"> 작성 </button>
            <button class="cancel"> 취소 </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      default: true,
    },
  },
  data() {
    return {
      visible: this.is_visible,
      write: {
        content: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.write.content = '';
      // this.visible = false;
    },
    writePost(target, e) {
      let input = e.target.value;
      this.write[target] = input;
    },
    writePostSubmit() {
      console.log("작동!")
    },
    calcDate(content) {
      return content.toString()
      // return content
    },
    nowTime: function(date) {
      var datetime = date.getFullYear() + "년 "
        + (date.getMonth() + 1) + "월 "
        + date.getDate() + "일 "
      return datetime
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~style";
.box {
  @extend %box-style;
  display: block;
  padding: 60px 0;
  margin-bottom: 50px;
}
img{
  background: royalblue
}
</style>
