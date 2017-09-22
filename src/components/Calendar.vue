<template>
  <main>
    <div class="grid calendar-heading">
      <!-- <h2 class="">
        9
      </h2> -->
      <doughnut-chart></doughnut-chart>
      <div class="container buttons">
        <div class="grid">
        <button class="prev-month col col-d-offset-2 col-d-1 col-m-1"></button>
        <button class="next-month col col-d-offset-6 col-d-1 col-m-1 col-m-offset-2"></button>
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
        <h3 class="year">2017년</h3>
        <button class="btn-today">today</button>
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
      <tbody>
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
      </tbody>
    </table>
  </main>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';

export default {
  components: {
    DoughnutChart
  },
  methods: {
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
    background-position:50% 50%;
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
  background: $color-white;
  // border: 5px solid $color-opacity;
  position: relative;
  // border: none;
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
