<template>
  <div id="app">
    <WeatherAdd />
    <WeatherList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherAdd from './components/WeatherAdd.vue'
import WeatherList from './components/WeatherList.vue'

export default Vue.extend({
  name: 'App',
  components: {
    WeatherAdd,
    WeatherList
  }
})
</script>
