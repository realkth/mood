<template>
  <div>
    <main-header ref="main_header" v-bind:style="blur"></main-header>
    <calendar ref="calendar" v-bind:style="blur"></calendar>
    <my-setting-modal ref='my_setting_modal'></my-setting-modal>
    <write-modal :targetFullDate="targetFullDate" ref='write_modal'></write-modal>
    <my-post-modal :targetFullDate="targetFullDate" :urlDate="urlDate" :targetEmotion="targetEmotion" :targetContent="targetContent" ref='my_post_modal'></my-post-modal>
  </div>
</template>

<script>
import firebase from 'firebase';
import MainHeader from './MainHeader.vue';
import Calendar from './Calendar.vue';
import MySettingModal from './MySettingModal.vue';
import WriteModal from './WriteModal.vue';
import MyPostModal from './MyPostModal.vue';
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'hello',
  components: {
    MainHeader,
    Calendar,
    MySettingModal,
    MyPostModal,
    WriteModal
  },
  data() {
    return {
      blur: null,
      currentUser: {
        displayName: ''
      },
      targetFullDate: '',
      urlDate: '',
      targetEmotion: '',
      targetContent: '',
    }
  },
}
</script>

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

.blur {
  -webkit-filter: blur(30px);
  -moz-filter: blur(30px);
  -o-filter: blur(30px);
  -ms-filter: blur(30px);
  filter: blur(30px);
}
</style>
