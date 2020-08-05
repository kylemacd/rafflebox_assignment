<template>
  <div class="row">
    <div class="col">
      <fieldset>
        <div class="">
          <form
            id="addWeather"
            @submit="validateForm"
          >
            <div class="col-4">
              <div class="form-group">
                <label for="location">Location <span>*</span></label>
                <input
                  id="location"
                  v-model="data.location"
                  type="text"
                  class="form-control required"
                  placeholder="Enter a location"
                >
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="temperature">Temperature <span>*</span></label>
                <input
                  id="temperature"
                  v-model="data.temperature"
                  type="text"
                  class="form-control required"
                  placeholder="Enter a temperature"
                >
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="time">Time <span>*</span></label>
                <input
                  id="time"
                  v-model="data.time"
                  type="text"
                  class="form-control required"
                  placeholder="Enter a time"
                >
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts">
import api from '../services/api'
export default {
  name: 'WeatherAdd',
  data () {
    return {
      errors: [],
      data: {
        location: '',
        temperature: '',
        time: ''
      }
    }
  },
  methods: {
    validateForm (e) {
      e.preventDefault()
      this.errors = []
      const requiredFields = this.$el.querySelectorAll('.required')
      const errors = this.errors
      requiredFields.forEach(function (field) {
        if (field.value === '') {
          errors.push([field.id + 'is required'])
          field.classList.add('alert-danger')
        } else {
          field.classList.remove('alert-danger')
        }
      })
      if (!errors.length) {
        this.addWeather()
      }
    },
    addWeather () {
      api.post('/weather',
        this.data
      )
        .then(res => (this.$root.$emit('add-weather', res.data)))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
  label span {
    color: red;
  }
</style>
