<template>
  <div id="home">
    <!-- 头部 -->
    <div class="outside-header">
      <header-bar></header-bar>
    </div>
    <!-- 主体 -->
    <div class="outside-main">
      <!-- 左侧菜单栏 -->
      <div class="left-menu">
        <nav-bar></nav-bar>
      </div>
      <!-- 内容区域 -->
      <div class="outside-content">
        <main-body></main-body>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '#/homeLayout/HeaderBar'
import NavBar from '#/homeLayout/NavBar'
import MainBody from '#/homeLayout/MainBody'

export default {
  name: 'home',
  components: {
    HeaderBar,
    NavBar,
    MainBody
  }
}
</script>

<style lang="less" scoped>
@import '~less/color.less';

#home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .outside-header {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
  }
  .outside-main {
    flex: 1;
    width: 100%;
    display: flex;
    .left-menu {
      flex-basis: 240px;
      background-color: @darkGray;
    }
    .outside-content {
      flex: 1
    }
  }
}
</style>