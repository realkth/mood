<template>
  <main>
    <div class="grid calendar-heading">
      <doughnut-chart></doughnut-chart>
      <div class="container buttons">
        <div class="grid">
          <button class="prev-month col col-d-offset-2 col-d-1 col-m-1" @click="clickPrevCalendar"></button>
          <button class="next-month col col-d-offset-6 col-d-1 col-m-1 col-m-offset-2" @click="clickNextCalendar"></button>
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
        <h3 class="year"> {{ calHeader }} </h3>
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
          <td v-for="m in 7" :class="arrIsThisMonth[ (n-1)*7 + m-1 ]">
            <a href="" v-if="dataSet && dataSet.has(arrTargetDate[(n-1)*7 + m-1].toISOString().split('T')[0])" @click.prevent="clickTargetDate(arrTargetDate[ (n-1)*7 + m-1 ])">
              {{ arrTargetDate[ (n-1)*7 + m-1 ].getDate() }}
            </a>
            <a href="" v-else="dataSet && dataSet.has(arrTargetDate[(n-1)*7 + m-1].toISOString().split('T')[0])" @click.prevent="clickTargetDate(arrTargetDate[ (n-1)*7 + m-1 ])">
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
    this.getAllData();
    this.makeCalendar();
  },
  data() {
    return {
      currentMonth: new Date(),
      calHeader: '',
      arrIsThisMonth: [],
      arrTargetDate: [],
      targetFullDate: '',
      dayListUrl: '',
      dataSet: null,
      datedatedate: [],
      hasDate: [],
      todayDate: null,
    }
  },
  methods: {
    nowTime: function() {
      var currentdate = new Date();
      // if (currentdate.getHours() > 12) {
      //   var time = "PM " + ((currentdate.getHours() + 24) % 12 || 12) + "시 "
      // } else {
      //   var time = currentdate.getHours() + "시 "
      // }
      var datetime =
        //  '오늘은 ' + 
        (currentdate.getMonth() + 1) + "월 "
        + currentdate.getDate() + "일 "
      // + time
      // + currentdate.getMinutes() + "분"
      return datetime
    },
    setCurrentMonth(date) {
      const tempDate = new Date();
      this.currentDate = date || new Date(tempDate.getCurrentYear(), tempDate.getMonth() + 1, 0);
      this.currentMonth = this.getCurrentMonth();
      this.currentYear = this.getCurrentYear();
      this.makeCalendar();
      // this.currentDate = date || new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0);
      // this.currentMonthName = this.getCurrentMonthName();
      // this.currentYear = this.getCurrentYear();
      // this.generateTable();
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
    // 매달의 달력 생성 함수
    makeCalendar() {
      // 기준 일
      let date = this.currentMonth;
      let arrMonth = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

      // 달력 헤더 (현재 월, 년) 
      this.calHeader = date.getFullYear() + '년';
      // this.calHeader = arrMonth[date.getMonth()] + ' ' + date.getFullYear();

      // 기준 월의 1일로 초기화
      date.setDate(1);

      // 달력의 첫 칸에 들어가는 날짜
      // cf. 2017년 8월의 달력의 경우, 7월 30일
      // 기준 월의 1일 날짜에서 1일의 요일 index를 빼준다
      let targetDate = new Date(date.getTime());
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      // 데이터 속성 중 arrIsThisMonth, arrTargetDate 초기화
      this.arrIsThisMonth = [];
      // this.arrTargetDate = [];

      this.arrTargetDate = [];

      // 달력 셀에 삽입되는 targetDate와 클래스 지정 반복문
      // 달력 셀의 max값은 42(6*7)
      for (let i = 0; i < 42; i++) {
        // 기준 월 날짜 여부에 따른 클래스 지정
        // 이전달, 다음달 : not-this-month / 이번달: this-month
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = 'not-this-month';
        } else {
          isThisMonth = 'this-month';
        };

        // 기준 월 여부 클래스를 배열 arrIsThisMonth에 푸시()
        this.arrIsThisMonth.push(isThisMonth);

        // 달력 셀에 삽입되는 target date를 배열 arrTargetDate에 푸시
        this.arrTargetDate.push(new Date(targetDate));

        // 다음 날 계산 (+1일)
        targetDate.setDate(targetDate.getDate() + 1);

        // 달력 종료
        // 토요일이면서 기준월이 아닐 경우 반복문 종료
        if (i % 7 == 6) {
          if (date.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }
    },
    thisMonth() {
      let date = new Date();
      let arrMonth = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      this.calHeader = '오늘은 ' + date.getFullYear() + '년 ' +
        (date.getMonth() + 1) + "월 "
        + date.getDate() + "일 "
      date.setDate(1);
      let targetDate = new Date(date.getTime());
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());
      this.arrIsThisMonth = [];
      this.arrTargetDate = [];
      for (let i = 0; i < 42; i++) {
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = 'not-this-month';
        } else {
          isThisMonth = 'this-month';
        };
        this.arrIsThisMonth.push(isThisMonth);
        this.arrTargetDate.push(new Date(targetDate));
        targetDate.setDate(targetDate.getDate() + 1);
        if (i % 7 == 6) {
          if (date.getMonth() != targetDate.getMonth()) {
            break;
          }
        }
      }
    },
    // 이전달 달력 생성 함수
    clickPrevCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() - 1);
      this.makeCalendar();
    },
    // 다음달 달력 생성 함수
    clickNextCalendar() {
      let date = this.currentMonth;
      date.setMonth(date.getMonth() + 1);
      this.makeCalendar();
    },
    // 타겟 날짜 객체를 YYYYMMDD 형식의 문자열로 변환 후 URL 형식으로 변경하는 함수
    clickTargetDate(target_date) {
      // 1. 클릭한 타겟 날짜를 YYYYMMDD 형식으로 변환
      // 타겟 날짜의 연도, 월, 일을 각각 변수 선언
      let object_year = target_date.getFullYear();
      let object_month = target_date.getMonth() + 1;
      let object_date = target_date.getDate();
      // Year (문자열로 형 변환)
      let string_year = String(object_year);
      // Month (한자리수는 앞에 0을 붙이고 문자열로 형 변환)
      if (object_month < 10) {
        object_month = '0' + object_month;
      }
      let string_month = String(object_month);
      // Date (한자리수는 앞에 0을 붙이고 문자열로 형 변환)
      if (object_date < 10) {
        object_date = '0' + object_date;
      }
      let string_date = String(object_date);
      // YYYYMMDD 형식으로 완성된 fullDate
      let fullDate = string_year + string_month + string_date;
      this.targetFullDate = fullDate;

      // 2. 타겟 날짜에 해당되는 daylist url로 만들어 줌
      let target_url_daylist = this.$store.state.url_daylist + fullDate + '/';
      // data에 해당 daylist url 보관
      this.dayListUrl = target_url_daylist;

      // this.getDayList();
    },
    // Post 페이지로 라우팅(유저 토큰값을 헤더로 전송)
    // 라우팅 시 params로 targetFullDate 전달 (클릭한 날짜의 YYYYMMDD 형식의 문자열)
    // getDayList() {
    //   let user_token = window.localStorage.getItem('token');

    //   this.$http.get(this.dayListUrl, {
    //     headers: { 'Authorization' : `Token ${user_token}` }  
    //   })
    //   .then(response => {
    //     this.$router.push({
    //       name: 'Post',
    //       params: {
    //         date: this.targetFullDate
    //       }
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    // },
    getAllData() {
      let list_url = this.$store.state.url_post;
      let user_token = window.localStorage.getItem('token');
      this.$http.get(list_url, {
        headers: { 'Authorization': `Token ${user_token}` }
      })
        .then(response => {
          let all_data = response.data;
          this.dataSet = new Set();
          all_data.forEach((item) => {
            this.dataSet.add(item.date.split(' ')[0]);
          });
        })
        .catch(error => {
          console.log(error);
        })
    }
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
  &:hover {
    opacity: 0.5;
  }
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

tbody td {
  height: 70px;
  border: 5px solid $color-opacity;
  padding: 7px;
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