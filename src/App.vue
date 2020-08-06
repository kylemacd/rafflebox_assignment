<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    >
    <div class="floatContainer">
      <div class="row">
        <div class="col">
          <WeatherAdd />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="floatingBox shadow">
            <WeatherList />
          </div>
        </div>
      </div>
    </div>
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

<style>
  body::after {
    content: "";
    background: url(../public/images/bg.jpg);
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
  body {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /*centers items on the line (the x-axis by default)*/
    align-items: center; /*centers items on the cross-axis (y by default)*/
  }
  .floatContainer {
    width: 1000px;
  }
  .floatingBox {
    display: inline-flexbox;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
  }
  .shadow {
    box-shadow: 5px 10px 18px #888888;
  }
</style>
