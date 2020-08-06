<template>
  <div class="list">
    <table class="table table-hover dropShadow">
      <thead>
        <th>Location <i class="fas fa-search-location" /></th>
        <th>Temperature <i class="fas fa-temperature-low" /></th>
        <th>Time <i class="fas fa-clock" /></th>
        <th />
      </thead>
      <tr
        v-for="weather in displayedWeathers"
        :key="weather._id"
      >
        <td>{{ weather.location }}</td>
        <td>{{ weather.temperature }}</td>
        <td>{{ humanizeTime(weather.time) }}</td>
        <td><WeatherDelete :id="weather._id" /></td>
      </tr>
      <tr id="emptyRow" v-show="displayedWeathers.length === 0">
        <td colspan="4" align="center">Press the add button to enter your first location.</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import api from '../services/api'
import WeatherDelete from './WeatherDelete.vue'
import moment from 'moment'
import lodash from 'lodash'

export default {
  name: 'WeatherList',
  components: {
    WeatherDelete
  },
  data () {
    return {
      weathers: [],
      displayedWeathers: []
    }
  },
  watch: {
    weathers: function () {
      this.updateDisplayList()
    }
  },
  created () {
    api
      .get('/weather')
      .then(response => {
        this.weathers = response.data
      })
  },
  mounted () {
    this.$root.$on('add-weather', newWeather => {
      this.weathers = [newWeather, ...this.weathers]
    })
    this.$root.$on('remove-weather', id => {
      this.weathers.splice(this.weathers.findIndex(function (i) {
        return i._id === id
      }), 1)
    })
  },
  methods: {
    humanizeTime (date) {
      return moment(date).format('hh:mm A')
    },
    updateDisplayList () {
      this.displayedWeathers = this.getUniqueValues(this.weathers)
    },
    getUniqueValues (arr) {
      const grouped = lodash.groupBy(arr, function (value) {
        return value.location.toLowerCase()
      })
      const uniqueValues = []
      for (const [key, values] of Object.entries(grouped)) {
        uniqueValues.push(values[0])
      }
      return uniqueValues
    }
  }
}
</script>

<style scoped>
  th {
    background: #c7efca;
  }
  tr:nth-child(even) {
    background: #e9f8fb;
  }
  table th:first-child{
    border-radius:10px 0 0 0;
  }

  table th:last-child{
    border-radius:0 10px 0 0;
  }

  .table th { border-top: none; }
</style>
