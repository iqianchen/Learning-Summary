<template>
  <Tabs type="card" :value="activeItem.name" :animated="false" @on-tab-remove="menuClose" closable>
    <TabPane label="首页" name="index" :closable="false">
      <Index></Index>
    </TabPane>
    <TabPane v-for="item in tabs" :label="item.alias" :name="item.name" :key="item.id">
      <async-component :componentPath="item.components"></async-component>
    </TabPane>
  </Tabs>
</template>

<script>
import Index from '#/homeLayout/Index'
import AsyncComponent from '#/AsyncComponent'
import { mapState, mapActions } from "vuex"

export default {
  name: 'mainBody',
  components: {
    Index,
    AsyncComponent
  },
  computed: {
    ...mapState("menu", {
      tabs: "tabs",
      activeItem: "activeItem"
    })
  },
  methods: {
    ...mapActions("menu", {
      menuClose: "menuClose"
    })
  }
}
</script>

<style lang="less" scoped>
#mainBody {
  width: 100%;
  height: 100%;
}
</style>