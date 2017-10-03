import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    write: {
      content: ''
    },
    emotion: '',
    item: {
      key: '',
      value: ''
    },
    list: [],
    listkey: [],
    targeturldaylist: '',
  },
  getters: {
    isWrite: (state) => {
      return state.write.content
    },
    isEmotion: (state) => {
      return state.emotion
    },
    isItemKey: (state) => {
      return state.item.key
    },
    isItemValue: (state) => {
      return state.item.value
    },
    isList: (state) => {
      return state.list
    },
    isListkey: (state) => {
      return state.listkey
    },
    isTargeturldaylist: (state) => {
      return state.targeturldaylist
    }
  },
  mutations: {
    m_write: (state, payload) => {
      state.write.content = payload
    },
    m_emotion: (state, payload) => {
      state.emotion = payload
    },
    m_itemkey: (state, payload) => {
      state.item.key = payload
    },
    m_itemvalue: (state, payload) => {
      state.item.value = payload
    },
    m_list: (state, payload) => {
      state.list = payload
    },
    m_listkey: (state, payload) => {
      state.listkey = payload
    },
    m_targeturldaylist: (state, payload) => {
      state.targeturldaylist = payload
    }
  },
  actions: {
    a_write: (context, val) => {
      context.commit('m_write', val)
    },
    a_emotion: (context, val) => {
      context.commit('m_emotion', val)
    },
    a_itemkey: (context, val) => {
      context.commit('m_itemkey', val)
    },
    a_itemvalue: (context, val) => {
      context.commit('m_itemvalue', val)
    },
    a_list: (context, val) => {
      context.commit('m_list', val)
    },
    a_listkey: (context, val) => {
      context.commit('m_listkey', val)
    },
    a_targeturldaylist: (context, val) => {
      context.commit('m_targeturldaylist', val)
    },
    a_writePostSubmit({state, dispatch}) {
      let token = window.localStorage.getItem('token');
      let email = window.localStorage.getItem('email');
      let myAPI = window.localStorage.getItem('myAPI');
      let getAPI = myAPI + '.json'
      let emotion_btn = document.getElementsByName("emotion");
      let emotion_btn_check = 0;
      for (let i = 0; i < emotion_btn.length; i++) {
        if (emotion_btn[i].checked == true) {
          state.emotion = emotion_btn[i].value
          emotion_btn_check++;
        }
      }
      if (emotion_btn_check === 0) {
        let message = '오늘의 감정을 선택해주세요.'
        dispatch('a_setToastMessage', message)
        setTimeout(() => {
          }, 2500);
          return;
      }

      axios.post(state.targeturldaylist, {
        // user: token,
        userEmail: email,
        emotion: state.emotion,
        content: state.write.content
      }
      )
        .then(response => {
          let message = '오늘의 일기를 기록하셨습니다.'
          dispatch('a_setToastMessage', message)
          // setTimeout(() => {
          //   this.closeModal()
          // }, 2500);
          dispatch('a_getAllData')
          console.log('response', response);
        })
        .catch(error => {
          console.log('state.targeturldaylist',state.targeturldaylist);
          console.log(error);
          let message = '로그인 해주세요.'
          dispatch('a_setToastMessage', message)
          // setTimeout(() => {
          //   this.closeModal()
          // }, 2500);
        })
      // console.log(this.targeturldaylist)
    },
    a_getAllData({dispatch}) {
      let myAPI = window.localStorage.getItem('myAPI');
      let getAPI = myAPI + '.json'
      let token = window.localStorage.getItem('token');
      axios.get(getAPI, {
      })
        .then(response => {
          let result = response.data;
          // console.log('result',result);
          let item = {};
          let list = [];
          let listkey = [];
          // console.log('올데이타',result);
          for (var prop in result) {
            // this.$store.dispatch('a_item',result[prop])
            // let thisItem = result[prop]
            item = result[prop]
            item.key = prop
            item.value = Object.values(item)
            // item.value = result[prop].values
            list.push(item)
            listkey.push(item.key)

            dispatch('a_itemkey', item.key)
            dispatch('a_itemvalue', item.value)
            dispatch('a_list', list)
            dispatch('a_listkey', listkey)
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
