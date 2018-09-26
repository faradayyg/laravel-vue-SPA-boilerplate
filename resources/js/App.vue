<template>
  <div id="app">
    <vue-topprogress ref="topProgress" color="#f00"></vue-topprogress>
    <router-view></router-view>
  </div>
</template>

<script>
import { vueTopprogress } from 'vue-top-progress';

export default {
  name: 'app',
  components:{
    vueTopprogress
  },
  methods:
  {
    hideLoading() {
      this.$refs.topProgress.done();
    },
    showLoading() {
       this.$refs.topProgress.start()
    }
  },
  mounted() {
    this.eventBus.$on('ajax.begun', this.showLoading);
    this.eventBus.$on('ajax.ended', this.hideLoading);
  },
  beforeDestroy() {
    this.eventBus.$off('ajax.begun', this.showLoading);
    this.eventBus.$off('ajax.ended', this.hideLoading);
  }
}
</script>
