<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isAlive: true
      }
    },
    methods: {
      reload() {
        this.isAlive = false;
        this.$nextTick(function () {
          this.isAlive = true
        })
      }
    }
  }
</script>

<style>

</style>
