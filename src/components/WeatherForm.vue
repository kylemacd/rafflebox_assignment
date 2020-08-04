<template>
  <div class="row">
    <div class="col">
      <fieldset>
        <div class="">
          <form
            @submit="validateForm"
          >
            <div class="col-4">
              <div class="form-group">
                <label for="location">Location</label>
                <input
                  id="location"
                  type="text"
                  class="form-control"
                  placeholder="Enter a location"
                  v-model="location"
                >
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="temperature">Temperature</label>
                <input
                  id="temperature"
                  type="text"
                  class="form-control"
                  placeholder="Enter a temperature"
                  v-model="temperature"
                >
              </div>
            </div>
            <div class="col-4">
              <div class="form-group">
                <label for="temperature">Time</label>
                <input
                  id="time"
                  type="text"
                  class="form-control"
                  placeholder="Enter a time"
                  v-model="time"
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
import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
export default class WeatherForm extends Vue {

}
</script>
