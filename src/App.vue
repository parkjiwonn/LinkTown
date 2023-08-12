<template>
  <RouterView />
</template>

<script>

import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView
  },

  methods: {
    goToHome() {
      console.log('=================goToHome() in App.vue================');
      this.$router.push('/Home');
    }
  },

  created() {
    console.log('================Created in App.vue=================');
    this.goToHome();
  }
}
</script>

<style></style>
