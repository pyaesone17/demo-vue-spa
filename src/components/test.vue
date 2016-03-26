<style>
  .red {
    color: #f00;
  }
</style>

<template>
  <h1 class="red" v-show="nice" :class="msg">
 <slot></slot>
   <span class="Alert__close" @click="show = false">x</span>
  </h1>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        msg: 'Hello world!',
        nice : true
      }
    },
    props : [
    'haha'],
  }
</script>