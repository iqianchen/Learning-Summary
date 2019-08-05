<template>
  <div id="header-bar">
    <div class="logo"></div>
  </div>
</template>

<script>
export default {
  name: 'headerBar'
}
</script>

<style lang="less" scoped>
@import '~less/color.less';

#header-bar {
  height: 100%;
  background-color: @cyan;
}
</style>