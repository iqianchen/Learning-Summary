<template>
  <div id="navBar">
    <Menu mode="vertical" @on-select="menuClick" theme="dark">
      <template v-for="item in menus">
        <!-- 一级菜单 -->
        <MenuItem v-if="!item.children" :name="item.name" :key="item.id">
          <Icon :type="item.icon"></Icon>
          <span v-text="item.alias"></span>
        </MenuItem>

        <!-- 二级菜单 -->
        <Submenu v-if="item.children" :name="item.name" :key="item.id">
          <template slot="title">
            <Icon :type="item.icon"></Icon>
            <span v-text="item.alias"></span>
          </template>
            <template v-for="menuItem in item.children">
              <!-- 三级菜单 -->
              <MenuGroup v-if="menuItem.children" :title="menuItem.alias" :key="menuItem.id">
                <MenuItem v-for="subMenuItem in menuItem.children" :name="subMenuItem.name" :key="subMenuItem.id">{{subMenuItem.alias}}</MenuItem>
              </MenuGroup>

              <MenuItem v-else :name="menuItem.name" :key="menuItem.id">{{menuItem.alias}}</MenuItem>
            </template>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>

<script>
import { nativeMenu, menus } from '@/assets/js/createMenu.js'
import { mapState, mapActions } from "vuex";

export default {
  name: 'navBar',
  created() {
    this.getMenus(menus)
    this.getNativeMenu(nativeMenu)
    console.log('this', this)
    // 设置首页 默认为菜单的第一项
    // if (menus.length > 0 && menus[0].name) {
    //   this.menuClick(menus[0].name)
    // }
  },
  computed: {
    ...mapState("menu", {
      tabs: 'tabs',
      menus: "menus",
      nativeMenu: 'nativeMenu',
      activeItem: "activeItem"
    })
  },
  methods: {
    ...mapActions("menu", {
      getMenus: "getMenus",
      menuClick: "menuClick",
      getNativeMenu: "getNativeMenu"
    })
  }
}
</script>
