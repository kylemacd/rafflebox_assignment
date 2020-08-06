<template>
  <div class="list">
    <button
      class="btn btn-danger float-right"
      @click="deleteWeather"
    >
      Delete
    </button>
  </div>
</template>

<script lang="ts">
import api from '../services/api'

export default {
  name: 'WeatherDelete',
  props: ['id'],
  methods: {
    deleteWeather () {
      api.delete('/weather/' + this.id
      )
        .then(res => (this.$root.$emit('remove-weather', this.id)))
        .catch(err => console.log(err))
    }
  }
}
</script>
