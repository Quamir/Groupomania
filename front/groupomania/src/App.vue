<template>
<section class="main-section">
  <the-header></the-header>
  <router-view></router-view>
</section>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components:{
    TheHeader
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
html{
  margin:0;
  padding:0;
  max-height:100vh;
}
body {
  background: rgba(1, 1, 1, 0);
  height: 100%;
}

.main-section{
  height: 100vh;
}
</style>
