<template>
  <div id="app">
    <WeatherForm />
    <WeatherList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherForm from './components/WeatherForm.vue'
import WeatherList from './components/WeatherList.vue'

export default Vue.extend({
  name: 'App',
  components: {
    WeatherForm,
    WeatherList
  }
})
</script>
