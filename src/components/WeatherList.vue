<template>
  <div class="list">
    <table class="table">
      <th>Location</th>
      <th>Temperature</th>
      <th>Time</th>
      <th />
      <tr
        v-for="weather in weathers"
        :key="weather._id"
      >
        <td>{{ weather.location }}</td>
        <td>{{ weather.temperature }}</td>
        <td>{{ humanizeTime(weather.time) }}</td>
        <td><WeatherDelete :id="weather._id" /></td>
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
      weathers: []
    }
  },
  created () {
    api
      .get('/weather')
      .then(response => (this.weathers = this.getUniqueValues(response.data.sort((a, b) => a.createdAt - b.createdAt), 'location')))
  },
  mounted () {
    this.$root.$on('add-weather', newWeather => {
      this.weathers = this.getUniqueValues([newWeather, ...this.weathers])
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
