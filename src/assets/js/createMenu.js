import nativeMenu from '@/assets/data/menu.json'

/**
 * 创建树形菜单
 * @param {Array} nativeMenu 	json格式菜单数据
 * @param {Number} menuId 		最上级菜单id，默认为0
 */
function createMenu(nativeMenu, menuId = 0) {
	let menu = []
	nativeMenu.map(item => {
		if (menuId === item.parentId) {
			item.children = createMenu(nativeMenu, item.id)
			menu.push(item)
		}
	})
	if (menu.length === 0) return
	return menu
}

const menus = createMenu(nativeMenu)
export { nativeMenu, menus }
