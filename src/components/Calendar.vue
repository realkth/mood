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
    <table class="grid" v-touch:swipe.left="swipeHandler" v-touch-class="'active'" v-touch:swipe.right="swipeHandler">
      <!-- table의 caption은 필수 요소로써 table의 제목을 알려주는 것. 무드의 경우 해당 연도만 알려주기 때문에, 이는 연도와 해당 달을 알려주는 것으로 개선되어야 함 -->
      <!-- table tag에 summary는 선택사항 -->
      <caption>
        <h3 class="year"> {{ calYear }} </h3>
        <button class="btn-today" @click="thisMonth">today</button>
      </caption>
      <!-- colgroup은 HTML5에서 지원 안함.
      CSS스타일로 width 설정 : col에서 width값이랑 td CSS width값이랑 작동 방식이 다름. 전자는 패딩값 포함한 총 width, 후자는 제외한 td의 width값만  -->
      <!-- <colgroup>
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
        <col width="100">
      </colgroup> -->
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
      <tbody v-for="w in this.calRows">
        <tr>
          <td class="td"
           v-for="d in 7"
           v-on="setState(moment(arrTargetDate[ (w-1)*7 + d-1 ]).format().split('T')[0].split('-').join(''))" :id="moment(arrTargetDate[ (w-1)*7 + d-1 ]).format().split('T')[0].split('-').join('')"
           :class="[moment(arrTargetDate[ (w-1)*7 + d-1 ]).format().split('T')[0].split('-').join(''), arrThisMonth[ (w-1)*7 + d-1 ]]"
           @click.prevent="clickTargetDate(moment(arrTargetDate[ (w-1)*7 + d-1 ]))">
            <a class="tabfocus" href="">{{ arrTargetDate[ (w-1)*7 + d-1 ].getDate() }}</a>
          </td>
        </tr>

      </tbody>
    </table>
  </main>
</template>

<script>
import DoughnutChart from "./DoughnutChart.vue";
import { state, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    DoughnutChart
  },
  created() {
    this.myAPI();
    this.a_getAllData();
    this.setState();
    this.makeCalendar();
    this.$store.watch(
      state => {
        return this.$store.getters.isList;
      },
      val => {
        this.setState();
        this.makeCalendar();
      },
      {
        deep: true
      }
    );
  },
  data() {
    return {
      calRows: 5,
      currentMonth: new Date(),
      calYear: "",
      calMonth: "",
      arrThisMonth: [],
      arrTargetDate: [],
      targetFullDate: "",
      urlDate: "",
      haha: 0,
      happy: 0,
      soso: 0,
      sad: 0,
      surprised: 0,
      angry: 0
    };
  },

  computed: {
    ...mapGetters(["isItemKey", "isItemValue", "isList", "isListkey"])
  },
  methods: {
    ...mapActions([
      "a_setToastMessage",
      "a_itemkey",
      "a_itemvalue",
      "a_list",
      "a_listkey",
      "a_getAllData",
      "a_targeturldaylist"
    ]),
    myAPI: () => {
      let token = window.localStorage.getItem("token");
      let api =
        "https://mood-vuex.firebaseio.com/users/" + `${token}` + "/" + "post/";
      window.localStorage.setItem("myAPI", api);
    },
    openWriteModal() {
      window.scrollTo(0, 0);
      this.$parent.$refs.write_modal.visible = true;
      this.$parent.blur = {
        "-webkit-filter": "blur(30px)",
        "-moz-filter": "blur(30px)",
        "-o-filter": "blur(30px)",
        "-ms-filter": "blur(30px)",
        filter: "blur(30px)"
      };
    },
    openPostModal() {
      window.scrollTo(0, 0);
      this.$parent.$refs.my_post_modal.visible = true;
      this.$parent.blur = {
        "-webkit-filter": "blur(30px)",
        "-moz-filter": "blur(30px)",
        "-o-filter": "blur(30px)",
        "-ms-filter": "blur(30px)",
        filter: "blur(30px)"
      };
    },
    makeCalendar() {
      // 해당 달만의 감정 통계를 위한 초기화 과정
      this.haha = 0;
      this.happy = 0;
      this.soso = 0;
      this.sad = 0;
      this.surprised = 0;
      this.angry = 0;
      let date = this.currentMonth;
      let months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];

      this.calYear = date.getFullYear() + "년";
      this.calMonth = date.getMonth() + 1;

      date.setDate(1);
      let targetDate = new Date(date.getTime());
      // 해당 달 달력의 첫칸에 들어 갈 날짜
      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      let month = moment(date)
        .format()
        .slice(0, 7)
        .split("-")
        .join("");
      for (let i = 0; i < this.$store.getters.isList.length; i++) {
        if (this.$store.getters.isList[i].key.includes(month)) {
          switch (this.$store.getters.isList[i].value[0].emotion) {
            case "emotion-haha":
              this.haha++;
              break;
            case "emotion-happy":
              this.happy++;
              break;
            case "emotion-soso":
              this.soso++;
              break;
            case "emotion-sad":
              this.sad++;
              break;
            case "emotion-surprised":
              this.surprised++;
              break;
            case "emotion-angry":
              this.angry++;
              break;
          }
        }
      }

      this.arrThisMonth = [];
      this.arrTargetDate = [];

      for (let i = 0; i < 42; i++) {
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = "not-this-month";
        } else {
          isThisMonth = "this-month";
        }

        this.arrThisMonth.push(isThisMonth);

        this.arrTargetDate.push(new Date(targetDate));

        if (this.arrThisMonth[35] === "this-month") {
          this.calRows = 6;
        } else {
          this.calRows = 5;
        }
        // 달력 첫칸에 들어갈 날짜에 1씩 더해서 달력에 날짜를 넣기
        targetDate.setDate(targetDate.getDate() + 1);
      }
    },
    thisMonth() {
      let date = new Date();
      let months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];

      this.calYear = date.getFullYear() + "년";
      this.calMonth = date.getMonth() + 1;
      date.setDate(1);

      let targetDate = new Date(date.getTime());

      targetDate.setDate(targetDate.getDate() - targetDate.getDay());

      this.arrThisMonth = [];
      this.arrTargetDate = [];

      for (let i = 0; i < 42; i++) {
        let isThisMonth = "";
        if (date.getMonth() !== targetDate.getMonth()) {
          isThisMonth = "not-this-month";
        } else {
          isThisMonth = "this-month";
        }

        this.arrThisMonth.push(isThisMonth);
        this.arrTargetDate.push(new Date(targetDate));
        targetDate.setDate(targetDate.getDate() + 1);
      }
      window.scrollTo(0, 0);
      this.currentMonth = new Date();
      let message =
        "오늘은 " +
        date.getFullYear() +
        "년 " +
        (this.currentMonth.getMonth() + 1) +
        "월 " +
        this.currentMonth.getDate() +
        "일" +
        "입니다.";
      this.a_getAllData();
      this.$store.dispatch("a_setToastMessage", message);
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
      let myAPI = window.localStorage.getItem("myAPI");
      let dateGetAPI = myAPI + `${date}` + ".json";
      let token = window.localStorage.getItem("token");

      axios.get(dateGetAPI, {}).then(response => {
        let result = response.data;
        if (result !== null) {
          let dateId = document.getElementById(date);
          let content = Object.values(result)[0].emotion;
          dateId.classList.remove("emotion-haha");
          dateId.classList.remove("emotion-happy");
          dateId.classList.remove("emotion-soso");
          dateId.classList.remove("emotion-sad");
          dateId.classList.remove("emotion-surprised");
          dateId.classList.remove("emotion-angry");
          dateId.classList.add(content);
        }
      });
    },
    clickTargetDate(target_date) {
      let object_year = moment(target_date)
        .format()
        .split("T")[0]
        .split("-")
        .join("")
        .slice(0, 4);
      let object_month = moment(target_date)
        .format()
        .split("T")[0]
        .split("-")
        .join("")
        .slice(4, 6);
      let object_date = moment(target_date)
        .format()
        .split("T")[0]
        .split("-")
        .join("")
        .slice(6, 8);
      let urlDate = object_year + object_month + object_date;
      let fullDate =
        Number(object_year) +
        "년 " +
        Number(object_month) +
        "월 " +
        Number(object_date) +
        "일";

      this.targetFullDate = fullDate;
      this.urlDate = urlDate;
      this.$parent.targetFullDate = fullDate;
      this.$parent.urlDate = urlDate;
      let myAPI = window.localStorage.getItem("myAPI");
      let targeturldaylist = myAPI + urlDate + ".json";
      this.$store.dispatch("a_targeturldaylist", targeturldaylist);

      let getAPI = myAPI + ".json";
      let token = window.localStorage.getItem("token");
      axios
        .get(targeturldaylist, {})
        .then(response => {
          let data = response.data;
          let item = Object.values(data);
          this.$parent.targetEmotion = item[0].emotion;
          this.$parent.targetContent = item[0].content;
        })
        .catch(error => {});

      if (this.isListkey.includes(urlDate)) {
        this.openPostModal();
      } else {
        this.openWriteModal();
      }
    },
    swipeHandler(direction) {
      if (direction === "left") {
        this.nextCalendar();
      } else if (direction === "right") {
        this.prevCalendar();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~style";

@media screen and (min-width: 0px) and (max-width: 767px) {
  .buttons {
    transform: translateY(-280%);
  }
  .prev-month {
    background: url("../assets/mood-icon-prev.svg") no-repeat;
    background-size: 10px;
    background-position: 30% 50%;
    border: none;
  }

  .next-month {
    background: url("../assets/mood-icon-next.svg") no-repeat;
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
    background: url("../assets/mood-icon-prev.svg") no-repeat;
    background-position: 50% 50%;
    border: none;
  }

  .next-month {
    background: url("../assets/mood-icon-next.svg") no-repeat;
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
  padding: 7px;
  width: 86px;
  &:hover {
    opacity: 0.5;
  }
}

.tabfocus {
  &:focus {
    outline-color: rgb(77, 144, 254); // #4D90FE
    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
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
}

.emotion-haha {
  background: $color-haha;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-haha.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 100%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-haha {
  background: $color-haha;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-haha.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 43%;
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
    content: "";
    background: url("../assets/emoji-angry.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-angry {
  background: $color-angry;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-angry.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 40%;
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
    content: "";
    background: url("../assets/emoji-happy.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-happy {
  background: $color-happy;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-happy.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 40%;
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
    content: "";
    background: url("../assets/emoji-sad.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-sad {
  background: $color-sad;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-sad.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 40%;
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
    content: "";
    background: url("../assets/emoji-soso.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-soso {
  background: $color-soso;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-soso.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 40%;
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
    content: "";
    background: url("../assets/emoji-surprised.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 90%;
    width: 50%;
    height: 50%;
    position: absolute;
    right: 7px;
    bottom: 7px;
  }
}

_:-ms-input-placeholder,
:root .emotion-surprised {
  background: $color-surprised;
  position: relative;
  &::before {
    content: "";
    background: url("../assets/emoji-surprised.svg") no-repeat;
    background-position: 100% 100%;
    background-size: 40%;
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