import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Chart.defaults.global.legend.display = false;

export default Doughnut.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
})