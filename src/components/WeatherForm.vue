<template>
  <div class="row">
    <div class="col">
      <fieldset>
        <div class="">
          <form
            id="addWeather"
            @submit.prevent="validateForm"
          >
            <div class="col-4">
              <div class="form-group">
                <label for="location">Location <span>*</span></label>
                <input
                  id="location"
                  v-model="location"
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
                  v-model="temperature"
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
                  v-model="time"
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
  name: 'WeatherForm',
  data () {
    return {
      errors: [],
      location: '',
      temperature: '',
      time: ''
    }
  },
  methods: {
    validateForm () {
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
        console.log(this.props)
        api.post('/weather', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }).then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>
  label span {
    color: red;
  }
</style>
