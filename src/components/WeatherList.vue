<template>
  <div class="list">
    <table>
      <th>Location</th>
      <th>Temperature</th>
      <th>Time</th>
      <tr
        v-for="weather in weathers"
        :key="weather._id"
      >
        <td>{{ weather.location }}</td>
        <td>{{ weather.temperature }}</td>
        <td>{{ weather.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import api from '../services/api'
export default {
  name: 'WeatherList',
  data () {
    return {
      weathers: api.get('/weather')
    }
  }
}
</script>
