<template>
  <div class="error-pnl">
      <Icon type="md-close-circle" />
      <Collapse v-model="value1" style="width:500px;margin:0 auto 20px">
        <Panel name="1">
            加载页面出现错误，展开查看错误详情！
            <p slot="content">{{errorDetails}}</p>
        </Panel>
    </Collapse>
    <Button size="default" type="error" @click="reload">点击重试</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ''
    }
  },
  props:{
    errorDetails: String
  },
  methods: {
    reload() {
      this.$emit("reload")
    }
  }
}
</script>

<style lang="less" scoped>
.error-pnl {
  text-align: center;
  >.el-button {
    margin-top: 2rem;
  }
  >i {
    font-size: 10rem;
    color: #ddd;
    margin: 2rem;
  }
  >.el-collapse {
    max-width: 30rem;
    margin: 0 auto;
  }
}
</style>
