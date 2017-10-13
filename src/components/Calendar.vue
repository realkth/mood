<template>
  <main>
    <div class="calendar-heading">
      <doughnut-chart :calMonth="calMonth" :haha="haha" :happy="happy" :soso="soso" :sad="sad" :surprised="surprised" :angry="angry"></doughnut-chart>
      <div class="container buttons">
        <div class="grid">
          <button class="prev-month col col-d-offset-2 col-d-1 col-m-1" @click="prevCalendar"></button>
          <button class="next-month col col-d-offset-6 col-d-1 col-m-1 col-m-offset-2" @click="nextCalendar"></button>
        </div>
      </div>

    </div>
    <table class="grid">
      <caption>
        <h3 class="year"> {{ calYear }} </h3>
        <button class="btn-today" @click="thisMonth">today</button>
      </caption>
      <colgroup>
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
      </colgroup>
      <thead>
        <tr>
          <td class="thead sun">일</td>
          <td class="thead">월</td>
          <td class="thead">화</td>
          <td class="thead">수</td>
          <td class="thead">목</td>
          <td class="thead">금</td>
          <td class="thead sat">토</td>
        </tr>
      </thead>
      <tbody v-for="n in 5">
        <tr>
          <td class="td" :id="moment(arrTargetDate[ (n-1)*7 + m-1 ]).format().split('T')[0].split('-').join('')" :class="[moment(arrTargetDate[ (n-1)*7 + m-1 ]).format().split('T')[0].split('-').join(''), arrThisMonth[ (n-1)*7 + m-1 ]]" v-for="m in 7" @click.prevent="clickTargetDate(moment(arrTargetDate[ (n-1)*7 + m-1 ]))" v-on="setState(moment(arrTargetDate[ (n-1)*7 + m-1 ]).format().split('T')[0].split('-').join(''))">
            <!-- <td class="td" :id="arrTargetDate[ (n-1)*7 + m-1 ].toISOString().split('T')[0].split('-').join('')" :class="[arrTargetDate[ (n-1)*7 + m-1 ].toISOString().split('T')[0].split('-').join(''), arrThisMonth[ (n-1)*7 + m-1 ]]" v-for="m in 7" @click.prevent="clickTargetDate(arrTargetDate[ (n-1)*7 + m-1 ])" v-on="setState(arrTargetDate[ (n-1)*7 + m-1 ].toISOString().split('T')[0].split('-').join(''))"> -->
            <a href="">{{ arrTargetDate[ (n-1)*7 + m-1 ].getDate() }}</a>
          </td>
        </tr>

      </tbody>
    </table>
  </main>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';
import { state, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    DoughnutChart
  },
  created() {
    this.makeCalendar();
    this.myAPI();
    this.a_getAllData();
    this.setState();
    this.$store.watch(
      (state) => {
        return this.$store.getters.isList
      },
      (val) => {
        this.makeCalendar();
        this.setState();
      },
      {
        deep: true
      }
    );
  },
  data() {
    return {
      currentMonth: new Date(),
      calYear: '',
      calMonth: '',
      arrThisMonth: [],
      arrTargetDate: [],
      targetFullDate: '',
      urlDate: '',
      haha: 0,
      happy: 0,
      soso: 0,
      sad: 0,
      surprised: 0,
      angry: 0
    }
  },
  computed: {
    ...mapGetters(['isItemKey', 'isItemValue', 'isList', 'isListkey']),
  },
  methods: {
    ...mapActions(['a_setToastMessage', 'a_itemkey', 'a_itemvalue', 'a_list', 'a_listkey', 'a_getAllData', 'a_targeturldaylist']),
    myAPI: () => {
      let token = window.localStorage.getItem('token')
      let api = 'https://mood-vuex.firebaseio.com/users/' + `${token}` + '/' + 'post/'
      window.localStorage.setItem('myAPI', api)
    },
    nowTime: () => {
      let currentdate = new Date();
      let datetime =
        (currentdate.getMonth() + 1) + "월 "
        + currentdate.getDate() + "일 "
      return datetime
    },
    openWriteModal() {
      window.scrollTo(0, 0)
      this.$parent.$refs.write_modal.visible = true;
      this.$parent.blur = {
        '-webkit-filter': 'blur(30px)',
        '-moz-filter': 'blur(30px)',
        '-o-filter': 'blur(30px)',
        '-ms-filter': 'blur(30px)',
        'filter': 'blur(30px)'
      }
    },
    openPostModal() {
      window.scrollTo(0, 0)
      this.$parent.$refs.my_post_modal.visible = true;
      this.$parent.blur = {
        '-webkit-filter': 'blur(30px)',
        '-moz-filter': 'blur(30px)',
        '-o-filter': 'blur(30px)',
        '-ms-filter': 'blur(30px)',
        'filter': 'blur(30px)'
      }
    },
    setCurrentMonth(date) {
      let currentdate = new Date();
      this.currentDate = date || new Date(currentdate.getCurrentYear(), currentdate.getMonth() + 1, 0);
      this.currentMonth = this.getCurrentMonth();
      this.currentYear = this.getCurrentYear();
      this.makeCalendar();
    },
    makeCalendar() {
      this.haha = 0;
      this.happy = 0;
      this.soso = 0;
      this.sad = 0;
      this.surprised = 0;
      this.angry = 0;
      let date = this.currentMonth;
      let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

      this.calYear = date.getFullYear() + '년';
      this.calMonth = date.getMonth() + 1;

      date.setDate(1);

      let targetDate = new Date(date.getTime());
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      this.arrThisMonth = [];

      this.arrTargetDate = [];
      let month = moment(date).format().slice(0, 7).split('-').join('')
      for (let i = 0; i < this.$store.getters.isList.length; i++) {
        if (this.$store.getters.isList[i].key.includes(month)) {
          switch (this.$store.getters.isList[i].value[0].emotion) {
            case 'emotion-haha':
              this.haha++;
              break;
            case 'emotion-happy':
              this.happy++;
              break;
            case 'emotion-soso':
              this.soso++;
              break;
            case 'emotion-sad':
              this.sad++;
              break;
            case 'emotion-surprised':
              this.surprised++;
              break;
            case 'emotion-angry':
              this.angry++;
              break;
          }
        }
      }
      for (let i = 0; i < 42; i++) {
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = 'not-this-month';
        } else {
          isThisMonth = 'this-month';
        };

        this.arrThisMonth.push(isThisMonth);

        this.arrTargetDate.push(new Date(targetDate));

        targetDate.setDate(targetDate.getDate() + 1);

        if (i % 7 == 6) {
          if (date.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }
    },
    thisMonth() {
      let date = new Date();
      let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

      this.calYear = date.getFullYear() + '년';
      this.calMonth = date.getMonth() + 1;
      date.setDate(1);

      let targetDate = new Date(date.getTime());

      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      this.arrThisMonth = [];
      this.arrTargetDate = [];

      for (let i = 0; i < 42; i++) {
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = 'not-this-month';
        } else {
          isThisMonth = 'this-month';
        };

        this.arrThisMonth.push(isThisMonth);
        this.arrTargetDate.push(new Date(targetDate));
        targetDate.setDate(targetDate.getDate() + 1);

        if (i % 7 == 6) {
          if (date.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }
      this.currentMonth = new Date();
      let message = '오늘은 ' + date.getFullYear() + '년 ' +
        (this.currentMonth.getMonth() + 1) + "월 "
        + this.currentMonth.getDate() + "일" + "입니다."
      this.a_getAllData();
      this.$store.dispatch('a_setToastMessage', message)
    },
    prevCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() - 1);
      this.makeCalendar();
      this.a_getAllData();
    },
    nextCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() + 1);
      this.makeCalendar();
      this.a_getAllData();
    },
    setState(date) {
      let myAPI = window.localStorage.getItem('myAPI');
      let dateGetAPI = myAPI + `${date}` + '.json'
      let token = window.localStorage.getItem('token');
      axios.get(dateGetAPI, {
      }).then(response => {
        let result = response.data;
        if (result !== null) {
          let dateId = document.getElementById(date);
          let content = Object.values(result)[0].emotion
          dateId.classList.add(content);
        }
      })
    },
    clickTargetDate(target_date) {
      let object_year = moment(target_date).format().split('T')[0].split('-').join('').slice(0, 4);
      let object_month = moment(target_date).format().split('T')[0].split('-').join('').slice(4, 6);
      let object_date = moment(target_date).format().split('T')[0].split('-').join('').slice(6, 8);
      let urlDate = object_year + object_month + object_date;
      let fullDate = object_year + '년 ' + object_month + '월 ' + object_date + '일';

      this.targetFullDate = fullDate;
      this.urlDate = urlDate;
      this.$parent.targetFullDate = fullDate;
      this.$parent.urlDate = urlDate;
      let myAPI = window.localStorage.getItem('myAPI')
      let targeturldaylist = myAPI + urlDate + '.json';
      this.$store.dispatch('a_targeturldaylist', targeturldaylist)

      let getAPI = myAPI + '.json'
      let token = window.localStorage.getItem('token');
      axios.get(targeturldaylist, {})
        .then(response => {
          let data = response.data;
          let item = Object.values(data);
          this.$parent.targetEmotion = item[0].emotion
          this.$parent.targetContent = item[0].content
        }).catch(error => { })

      if (this.isListkey.includes(urlDate)) {
        this.openPostModal();
      } else {
        this.openWriteModal();
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "~style";


@media screen and (min-width: 0px) and (max-width: 767px) {
  .buttons {
    transform: translateY(-280%);
  }
  .prev-month {
    background: url('../assets/mood-icon-prev.svg') no-repeat;
    background-size: 10px;
    background-position: 30% 50%;
    border: none;
  }

  .next-month {
    background: url('../assets/mood-icon-next.svg') no-repeat;
    background-size: 10px;
    background-position: 70% 50%;
    border: none;
  }
}

@media screen and (min-width: 768px) {
  .buttons {
    transform: translateY(-280%);
  }
  .prev-month {
    background: url('../assets/mood-icon-prev.svg') no-repeat;
    background-position: 50% 50%;
    border: none;
  }

  .next-month {
    background: url('../assets/mood-icon-next.svg') no-repeat;
    background-position: 50% 50%;
    border: none;
  }
}

caption {
  position: relative;
}

.year {
  display: inline;
  font-weight: 900;
  font-size: 1.6rem;
  color: $color-mood;
  position: absolute;
  top: -40px;
  left: 4px;
}

.btn-today {
  display: inline;
  right: 4px;
  position: absolute;
  top: -40px;
  background: $color-mood;
  color: $color-happy;
  font-weight: 600;
  border: none;
  border-radius: 3px;
  padding: 7px 20px;
}

tbody td {
  color: $color-white;
  cursor: pointer;
  height: 73px;
  // border: 5px solid $color-opacity;
  padding: 7px;
  &:hover {
    opacity: 0.5;
  }
}

.not-this-month {
  color: $color-moregray;
  opacity: 0.6;
}

.thead {
  height: 35px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  background: $color-white;
  position: relative;
}

.sun {
  color: $color-sunday;
  // border-left: 5px solid $color-opacity;
}

.sat {
  // border-right: 5px solid $color-opacity;
}

.emotion-haha {
  background: $color-haha;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-haha.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 100%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.emotion-angry {
  background: $color-angry;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-angry.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.emotion-happy {
  background: $color-happy;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-happy.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.emotion-sad {
  background: $color-sad;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-sad.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.emotion-soso {
  background: $color-soso;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-soso.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.emotion-surprised {
  background: $color-surprised;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-surprised.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    -ms-background-size: 60%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

main {
  margin-bottom: 50px;
}
</style>