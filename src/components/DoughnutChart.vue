<template>
  <div class="chart-wrapper">
    <doughnut-chart class="doughnut-chart" :chart-data="datacollection"></doughnut-chart>
    <h2 class="">{{ calMonth }}</h2>
  </div>
</template>

<script>
  import DoughnutChart from '../DoughnutChart.js'

  export default {
    components: {
      DoughnutChart
    },
    props: ["calMonth"],
    data () {
      return {
        datacollection: null,
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['haha', 'happy','soso', 'sad','surprised','angry'],
          datasets: [
             {
              label: 'Data One',
              backgroundColor: ['#6f8b78','#e4d49e','#e5e6d6','#4d8696','#c96466','#5f1a2b'],
              data: [this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~style';

.chart-wrapper {
  text-align: center;
  // margin-bottom: 20px;
  // margin-top: 20px;
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