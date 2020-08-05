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
        <td>{{ weather.time }}</td>
        <td><WeatherDelete :id="weather._id" /></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import api from '../services/api'
import WeatherDelete from './WeatherDelete.vue'

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
      .then(response => (this.weathers = response.data))
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
  }
}
</script>
