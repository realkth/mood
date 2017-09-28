<template>
  <main>
    <div class="grid calendar-heading">
      <doughnut-chart :calMonth="calMonth"></doughnut-chart>
      <div class="container buttons">
        <div class="grid">
          <button class="prev-month col col-d-offset-2 col-d-1 col-m-1" @click="prevCalendar"></button>
          <button class="next-month col col-d-offset-6 col-d-1 col-m-1 col-m-offset-2" @click="nextCalendar"></button>
        </div>
      </div>
      <!-- <div class="grid">
                            <h3 class="col col-d-1">2017년</h3>
                            <button class="col col-d-1" v-on:click="openPostModal">오늘</button>
                          </div> -->
      <!-- <button v-on:click="openWriteModal">글쓰기</button> -->

    </div>
    <table class="grid">
      <caption>
        <h3 class="year"> {{ calYear }} </h3>
        <!-- <span class="today">{{ nowTime(currentMonth)}}</span> -->
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
          <!-- <td class="thead sun">SUN</td>
                                            <td class="thead">MON</td>
                                            <td class="thead">TUE</td>
                                            <td class="thead">WED</td>
                                            <td class="thead">THU</td>
                                            <td class="thead">FRI</td>
                                            <td class="thead">SAT</td> -->
        </tr>
      </thead>
      <tbody v-for="n in 5">
        <tr>
          <td v-for="m in 7" :class="arrThisMonth[ (n-1)*7 + m-1 ]" @click.prevent="clickTargetDate(arrTargetDate[ (n-1)*7 + m-1 ])">
            <a href="" v-if="dataSet && dataSet.has(arrTargetDate[(n-1)*7 + m-1].toISOString().split('T')[0])">
              {{ arrTargetDate[ (n-1)*7 + m-1 ].getDate() }}
            </a>
            <a href="" v-else="dataSet && dataSet.has(arrTargetDate[(n-1)*7 + m-1].toISOString().split('T')[0])">
              {{ arrTargetDate[ (n-1)*7 + m-1 ].getDate() }}
            </a>
          </td>
        </tr>

      </tbody>
      <!-- <tbody>
                            <tr>
                              <td class="state-happy">1</td>
                              <td v-on:click="openWriteModal">2</td>
                              <td v-on:click="openPostModal">3</td>
                              <td class="state-haha">4</td>
                              <td>5</td>
                              <td class="state-angry">6</td>
                              <td class="state-haha">7</td>
                            </tr>
                            <tr>
                              <td>8</td>
                              <td class="state-surprised">9</td>
                              <td class="state-angry">10</td>
                              <td>11</td>
                              <td class="state-angry">12</td>
                              <td class="state-surprised">13</td>
                              <td>14</td>
                            </tr>
                            <tr>
                              <td class="state-soso">15</td>
                              <td>16</td>
                              <td class="state-angry">17</td>
                              <td class="state-soso">18</td>
                              <td>19</td>
                              <td class="state-happy">20</td>
                              <td class="state-happy">21</td>
                            </tr>
                            <tr>
                              <td>22</td>
                              <td>23</td>
                              <td class="state-soso">24</td>
                              <td class="state-sad">25</td>
                              <td class="state-soso">26</td>
                              <td>27</td>
                              <td>28</td>
                            </tr>
                            <tr>
                              <td>29</td>
                              <td class="state-sad">30</td>
                              <td class="state-surprised">31</td>
                              <td>32</td>
                              <td class="state-happy">33</td>
                              <td>34</td>
                              <td>35</td>
                            </tr>
                          </tbody> -->
    </table>
  </main>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';
export default {
  components: {
    DoughnutChart
  },
  created() {
    this.makeCalendar();
    this.myAPI();
  },
  data() {
    return {
      currentMonth: new Date(),
      calYear: '',
      calMonth: '',
      arrThisMonth: [],
      arrTargetDate: [],
      targetFullDate: '',
      dayListUrl: '',
      dataSet: null,
      datedatedate: [],
      hasDate: [],
      todayDate: null,
      targeturldaylist: '',
    }
  },
  methods: {
    myAPI: () => {
      let token = window.localStorage.getItem('token')
      let api = 'https://mood-vuex.firebaseio.com/users/' + `${token}` + '/' + 'post/'
      window.localStorage.setItem('myAPI', api)
      // let displayName = window.localStorage.getItem('displayName')
      // let api = 'https://mood-vuex.firebaseio.com/users/' + `${displayName}` + '/' + 'post/'
      // window.localStorage.setItem('myAPI', api)
    },
    nowTime: () => {
      let currentdate = new Date();
      // if (currentdate.getHours() > 12) {
      //   let time = "PM " + ((currentdate.getHours() + 24) % 12 || 12) + "시 "
      // } else {
      //   let time = currentdate.getHours() + "시 "
      // }
      let datetime =
        (currentdate.getMonth() + 1) + "월 "
        + currentdate.getDate() + "일 "
      // + time
      // + currentdate.getMinutes() + "분"
      return datetime
    },
    openWriteModal() {
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
      let date = this.currentMonth;
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
    },
    thisMonth() {
      let date = new Date();
      let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

      this.calYear = '오늘은 ' + date.getFullYear() + '년 ' +
        (date.getMonth() + 1) + "월 "
        + date.getDate() + "일 "

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
    },
    prevCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() - 1);
      this.makeCalendar();
    },
    nextCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() + 1);
      this.makeCalendar();
    },
    clickTargetDate(target_date) {
      let object_year = target_date.getFullYear();
      let object_month = target_date.getMonth() + 1;
      let object_date = target_date.getDate();
      let string_year = String(object_year);
      if (object_month < 10) {
        object_month = '0' + object_month;
      }
      let string_month = String(object_month);
      if (object_date < 10) {
        object_date = '0' + object_date;
      }
      let string_date = String(object_date);
      let urlDate = string_year + string_month + string_date;
      let fullDate = target_date.getFullYear() + '년 ' + (target_date.getMonth() + 1) + '월 ' + target_date.getDate() + '일';
      this.targetFullDate = fullDate;
      this.$parent.targetFullDate = fullDate;

      let myAPI = window.localStorage.getItem('myAPI')
      let targeturldaylist = myAPI + urlDate + '.json';


      this.$parent.targeturldaylist = targeturldaylist;
      // this.getDayList();
      // this.openPostModal()
      this.openWriteModal()
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~style";

h2 {
  position: absolute;
}

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
  height: 70px;
  border: 5px solid $color-opacity;
  padding: 7px;
  &:hover {
    opacity: 0.5;
  }
}

.not-this-month {
  color: $color-moremoregray;
}

.thead {
  height: 35px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  background: $color-white; // border: 5px solid $color-opacity;
  position: relative; // border: none;
}

.sun {
  color: $color-sunday;
  border-left: 5px solid $color-opacity;
}

.sat {
  border-right: 5px solid $color-opacity;
}

.state-haha {
  background: $color-haha;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-haha.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 100%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.state-angry {
  background: $color-angry;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-angry.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.state-happy {
  background: $color-happy;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-happy.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.state-sad {
  background: $color-sad;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-sad.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.state-soso {
  background: $color-soso;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-soso.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

.state-surprised {
  background: $color-surprised;
  position: relative;
  &::before {
    content: '';
    background: url('../assets/emoji-surprised.svg') no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}
</style>