<template>
<section class="main-section">
  <router-view></router-view>
</section>
</template>

<script>


export default {

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
}

body {
  background: rgba(1, 1, 1, 0);
}

a{
  color: inherit;
  text-decoration: none;
}

::-webkit-scrollbar{
  width: 0.5em;
}

::-webkit-scrollbar-track{
  background: $primary-color;
}

::-webkit-scrollbar-thumb{
  background: $secondary-color;
}

@supports(scrollbar-color: $primary-color $secondary-color){
  *{
    scrollbar-color: $primary-color $secondary-color;
  }
}

</style>
