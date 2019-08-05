<template>
  <div class="loading">
    <Spin size="large" class="sp_loading"></Spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0px;
  bottom: 30px;
  width: 100%;
  left: 0;
  z-index: 999;
  background: rgba(0,0,0,0.6);
}
.sp_loading{
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
