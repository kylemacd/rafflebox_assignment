<template>
  <div class="addForm">
    <b-button
      id="addButton"
      v-b-modal.addModal
      variant="success dropShadow float-right"
    >
      <i class="fas fa-plus" /> Add
    </b-button>
    <b-modal
      id="addModal"
      title="Add a Location"
      ok-title="Save"
      @ok="handleOk"
      @show="resetWeatherData"
      @hidden="resetWeatherData"
    >
      <div class="row">
        <div class="col">
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
              @submit.stop.prevent="validateForm"
            >
              <div class="col">
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
              <div class="col">
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
              <div class="col">
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
            </form>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import api from '../services/api'
import moment from 'moment'

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
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.validateForm()
    },
    validateForm () {
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
    resetWeatherData () {
      this.errors = []
      this.data = {
        location: '',
        temperature: '',
        time: ''
      }
    },
    handleError (type, errs) {
      if (type === 'validation') {
        const regex = /Path `.*`/
        errs.forEach((key, error) => {
          this.errors.push({ type: key, message: error.properties.message.replace(regex, '') })
        })
      } else {
        this.errors.push({ type: 'unknown', message: '' })
      }
    },
    addWeather () {
      api.post('/weather',
        this.data
      )
        .then(res => {
          if (typeof res.data.errors === 'undefined') {
            this.$root.$emit('add-weather', res.data)
            this.$root.$emit('bv::hide::modal', 'addModal')
          } else {
            this.handleError('validation', res.data.errors)
          }
        })
        .catch(err => {
          this.handleError(err)
        })
      this.resetWeatherData()
    }
  }
}
</script>

<style scoped>
  #addButton {
    margin-bottom: 10px;
  }
</style>
