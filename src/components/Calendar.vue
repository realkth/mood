<template>
  <main>
    <div class="grid calendar-heading">
      <h2 class="col col-m-4 col-d-4 col-d-offset-4">
        9
      </h2>
      <button class="prev-month">
        < </button>
          <button class="next-month"> > </button>
          <button v-on:click="openWriteModal">글쓰기</button>

    </div>
    <table class="grid">
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
          <td class="thead">토</td>
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
          <td>2</td>
          <td>3</td>
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

export default {
  components: {

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
  }
}
</script>

<style lang="scss" scoped>
@import "~style";
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
}

.sun {
  color: $color-sunday;
}

td {
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
