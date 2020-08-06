<template>
  <div class="row">
    <div class="col">
      <fieldset>
        <div class="">
          <div v-show="this.errors.length != 0">
            <ul>
              <li
                v-for="error in this.errors"
                :key="error.type"
              >
                {{ error.type }} <span v-show="error.message.length != 0">- {{ error.message }}</span>
              </li>
            </ul>
          </div>
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
                  class="form-control"
                  placeholder="Enter a location"
                  :class="{ 'alert-danger': this.errors.find(e => e.type === 'location' ) }"
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
                  class="form-control"
                  placeholder="Enter a temperature"
                  :class="{ 'alert-danger': this.errors.find(e => e.type === 'temperature') }"
                >
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="time">Time <span>*</span></label>
                <b-form-timepicker
                  id="time"
                  v-model="data.time"
                  class="form-control"
                  placeholder="Enter a time"
                  now-button
                  :class="{ 'alert-danger': this.errors.find(e => e.type === 'time') }"
                />
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
import moment from 'moment'

export default {
  name: 'WeatherAdd',
  data () {
    return this.getDefaultData()
  },
  methods: {
    validateForm (e) {
      e.preventDefault()
      this.errors = []

      this.validateLocation()
      this.validateTemperature()
      this.validateTime()

      if (!this.errors.length) {
        this.addWeather()
      }
    },
    validateLocation () {
      if (this.data.location.length === 0) {
        this.errors.push({ type: 'location', message: 'is required' })
      }
    },
    validateTemperature () {
      if (this.data.temperature.length === 0) {
        this.errors.push({ type: 'temperature', message: 'is required' })
      } else if (isNaN(this.data.temperature)) {
        this.errors.push({ type: 'temperature', message: 'must be a number' })
      }
    },
    validateTime () {
      if (this.data.time.length === 0) {
        this.errors.push({ type: 'time', message: 'is required' })
      } else if (!moment(this.data.time, 'LT').isValid()) {
        this.errors.push({ type: 'time', message: 'Invalid time' })
      }
    },
    getDefaultData () {
      return {
        errors: [],
        data: {
          location: '',
          temperature: '',
          time: ''
        }
      }
    },
    resetWeatherData () {
      this.data = this.getDefaultData()
    },
    handleError (type, errs) {
      if (type === 'validation') {
        const regex = /Path `.*`/
        for (const [key, err] of Object.entries(errs)) {
          this.errors.push({ type: key, message: err.properties.message.replace(regex, '') })
        }
      } else {
        this.errors.push({ type: 'unknown', message: '' })
      }
    },
    addWeather () {
      api.post('/weather',
        this.data
      )
        .then(res => {
          if (res.data.errors.length === 0) {
            this.$root.$emit('add-weather', res.data)
          } else {
            this.handleError('validation', res.data.errors)
          }
        })
        .catch(err => this.handleError(err))
      this.resetWeatherData()
    }
  }
}
</script>

<style>
  label span {
    color: red;
  }
</style>
