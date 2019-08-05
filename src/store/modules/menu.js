const menu = {
  namespaced: true,
  state: {
    activeItem: {},     // 当前页菜单
    tabs: [],           // 页签，记录已缓存的菜单
    menus: [],          // 树形结构菜单
    nativeMenu: []      // json格式菜单
  },
  mutations: {
    // 初始化菜单
    initMenu(state, menus) {
      state.menus = menus
    },
    // 初始化菜单数据
    initNativeMenu(state, nativeMenu) {
      state.nativeMenu = nativeMenu
    },
    // 初始化页签项
    initTabs(state, tabs) {
      state.tabs = tabs
    },
    // 添加页签
    addTab(state, tab) {
      let areadyHas = state.tabs.filter(item => {
        return item.id === tab.id
      })
      // 如果不存在则添加
      if (areadyHas && areadyHas.length === 0) state.tabs.push(tab)
    },
    // 切换页签
    switchTab(state, item) {
      state.activeItem = item
    }
  },
  actions: {
    // 提交initMenu方法
    getMenus({commit}, menuData) {
      commit('initMenu', menuData)
    },
    // 提交initNativeMenu方法
    getNativeMenu({commit}, nativeMenu) {
      commit('initNativeMenu', nativeMenu)
    },
    // 点击菜单项
    menuClick({commit}, name) {
      let allMenus = this.state.menu.nativeMenu
      // 从json格式菜单中过滤出当前选中的菜单
      let addTab = allMenus.filter(item => {
        return item.name === name
      })
      commit('addTab', addTab[0])  // 添加到页签上
      commit('switchTab', addTab[0])  // 切换到当前页
    },
    // 关闭页签
    menuClose({commit}, name) {
      let tabs = this.state.menu.tabs
      // 从所有页签中获取当前页签的索引
      let indexNum = tabs.findIndex( item => item.name === name)
      // 生成新的页签
      let newTabs = tabs.filter( item => {
        return item.name !== name
      })
      commit('initTabs', newTabs)
      let item;
      // 当删除的是第一个页签,则切换到第二个页签, 没有则切换为首页
      if (indexNum === 0) item = newTabs[indexNum] ? newTabs[indexNum] : {name: 'index'}
      // 当删除的是最后一个页签, 则切换到倒数第二个页签
      else if (indexNum === newTabs.length) item = newTabs[indexNum - 1]
      // 当删除的是其他页签， 则切换到下一个页签
      else item = newTabs[indexNum]
      commit('switchTab', item)
    }
  }
}

export default menu