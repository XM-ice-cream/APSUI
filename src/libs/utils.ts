import { RouteRecordRaw } from 'vue-router'
import { ITreeMenuItem } from '@/entity/menu'
import moment from 'moment'

const modules = import.meta.glob('../views/**/**.vue')

interface ICache {
	[key: number]: ITreeMenuItem
}
/**
 * @description 转换树形结构菜单
 * @param menuList 菜单列表
 */
export const getTreeMenus = (menuList: ITreeMenuItem[]): ITreeMenuItem[] => {
	const treeMenuList = menuList as ITreeMenuItem[]
	return treeMenuList
}

/**
 * @description 转化动态路由
 * @param userRouters -用户路由的树形列表
 */
export const generateRouter = (userRouters: ITreeMenuItem[]) => {
	let newRouters: RouteRecordRaw[] = userRouters.map(
		(router: ITreeMenuItem) => {
			let menu = {
				id: router.id,
				path: router.href,
				name: router.name,
				meta: {
					icon: 'goods',
					title: router.title,
				},
				component: () =>
					import(
						/* @vite-ignore */ `@/components/parent-view/ParentView.vue`
					),
				children: [],
			}
			if (router['children'] && router['children'].length)
				menu['children'] = initNodeChildren(
					menu.children,
					router.children
				)
			return menu
			// const isParent = router.parentId === "0" && router.children;
			// const fileName = router.href.match(/\/([^/]*)$/)![1];
			// let routes: RouteRecordRaw = {
			//   path: router.href,
			//   name: router.name,
			//   meta: {
			//     icon: router.icon,
			//   },
			//   component:
			//     modules[
			//         /* @vite-ignore */ `../view${router.path}/${fileName}.vue`
			//     ],
			// };

			// if (isParent) {
			//   routes.redirect = router.children![0].path;
			//   routes.component = () =>
			//     import(/* @vite-ignore */ `../components/ParentView/ParentView.vue`)
			// }
			// if (routes && router.children) {
			//   routes.children = generateRouter(router.children);
			// }
			// return routes;
		}
	)
	console.log(newRouters)
	return newRouters
}
/**
 * 处理子路由节点
 * @childrenList 空数组
 * @node 接口返回子节点数组
 * */
const initNodeChildren = (list: ITreeMenuItem[], node: ITreeMenuItem[]) => {
	let newRouters: any = node.map((router: ITreeMenuItem) => {
		let menuNode = {
			id: router.id,
			path: router.href,
			name: router.name,
			meta: {
				icon: 'goods',
				title: router.title,
			},
			component:
				router['children'] && router['children'].length
					? () => import('@/components/parent-view/ParentView.vue')
					: () =>
							import(
								/* @vite-ignore */ `@/views/${router.component}`
							),
			children: [],
		}
		if (router['children'] && router['children'].length)
			initNodeChildren(menuNode.children, router.children)
		return menuNode
	})
	return newRouters
}

/**
 * @description 数组扁平化
 * @param target --目标数组
 *
 */
export function flatter(target: any) {
	if (Array.isArray(target)) {
		let result: any = []
		target.forEach((item) => {
			if (Array.isArray(item)) {
				result = result.concat(flatter(item))
			} else {
				result.push(item)
			}
		})
		return result
	} else {
		return target
	}
}

//表格 时间格式化
export function dateFormat(row: any, column: any) {
	const date = row[column.property]
	if (date === undefined) {
		return ''
	}
	return moment(date).utc().format('YYYY-MM-DD HH:mm:ss')
}
/**
 * @description 日期格式化
 * @param {Date,String,Number} dateStr 日期
 * @param {*} fmt 格式化样式 yyyy-MM-dd hh:mm:ss
 */
export const formatDate = (
	dateStr: string | undefined,
	fmt = 'yyyy-MM-dd hh:mm:ss'
) => {
	if (!dateStr) return ''
	let date = new Date(dateStr)
	let o: any = {
		'y+': date.getFullYear(),
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			const str = o[k] + ''
			fmt = fmt.replace(
				RegExp.$1,
				str.length > 1 ? str : padLeftZero(str)
			)
		}
	}
	return fmt
}
/**
 * @description 字符串左边不足补0
 * @param {String|Number} str 数字或者字符串类型的数字
 * @param {Number} num 要保留的位数
 */
export const padLeftZero = (str = '', num = 2) => String(str).padStart(num, '0')
