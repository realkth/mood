<template>
  <div class="chart-wrapper">
    <doughnut-chart class="doughnut-chart" :chart-data="datacollection"></doughnut-chart>
    <h2 class="">{{ calMonth }}</h2>
  </div>
</template>

<script>
import DoughnutChart from '../DoughnutChart.js'
import { state, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    DoughnutChart
  },
  data() {
    return {
      datacollection: null,
    }
  },
  props: ['calMonth', 'haha', 'happy', 'soso', 'sad', 'surprised', 'angry'],
  mounted() {
    this.$store.watch(
      (state) => {
        return this.$store.getters.isList
      },
      (val) => {
        this.fillData()
      },
      {
        deep: true
      }
    );
  },
  computed: {
    ...mapGetters(['isList']),
  },
  methods: {
    fillData() {
      if (this.haha === 0 && this.happy === 0 && this.soso === 0 && this.sad === 0 && this.surprised === 0 && this.angry === 0) {
        this.datacollection = {
          labels: ['오늘의 감정을 기록해보세요.'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#435353'],
              data: [1]
            }
          ]
        }
      }
      else {
        this.datacollection = {
          labels: ['haha', 'happy', 'soso', 'sad', 'surprised', 'angry'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#6f8b78', '#e4d49e', '#e5e6d6', '#4d8696', '#c96466', '#5f1a2b'],
              data: [this.haha, this.happy, this.soso, this.sad, this.surprised, this.angry]
            }
          ]
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~style';

.chart-wrapper {
  text-align: center;
  position: relative;
  margin: 20px 20px;
}

h2 {
  position: absolute;
  top: 35%;
  transform: translateY(-35%);
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  font-weight: 600;
  color: $color-mood;
  z-index: -1;
}

.doughnut-chart {
  height: 200px;
  width: 200px;
  display: inline-block;
}

.chart {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>