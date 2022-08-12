import { defineStore } from 'pinia'
import { getUserMenu } from '@/apis/user'
import { INavItem, ITreeMenuItem } from '@/entity/menu'
import { flatter, getTreeMenus } from '@/libs/utils'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			test: document.querySelector('html')!.className,
			dark: false,
			menuList: [] as ITreeMenuItem[],
			userRouters: [] as ITreeMenuItem[],
			navList: [{ title: '首页', path: '/index/home' }] as INavItem[],
			collapse: false,
		}
	},
	actions: {
		async getMenuList() {
			this.menuList = (await getUserMenu().then((res) => {
				return res.result
			})) as ITreeMenuItem[]
		},
		// 获取用户树形结构菜单
		async setUserRouters() {
			const menuList = (await getUserMenu().then((res) => {
				return res.result
			})) as ITreeMenuItem[]
			this.menuList = menuList
			this.userRouters = getTreeMenus(menuList)
		},

		//关闭nav导航
		closeNav(index: number) {
			this.navList.splice(index, 1)
		},

		//新增nav导航
		setNavList(path: string) {
			let menuList: any[] = []
			const navItem = {} as INavItem
			this.userRouters.forEach((item: ITreeMenuItem) => {
				menuList.push(item.children)
			})
			menuList = flatter(menuList)
			menuList.forEach((item: ITreeMenuItem) => {
				if (item && item.path == path) {
					navItem.title = item.title
					navItem.path = item.path
				}
			})
			const isBeing = this.navList.some(
				(item: INavItem) => item.path == navItem.path
			)
			if (!isBeing && navItem && navItem.path) {
				this.navList.push(navItem)
			}
		},

		//关闭当前标签和首页标签之外的所有标签
		cloneOtherNav(currrentPath: string) {
			this.navList = [{ title: '首页', path: '/index/home' }]
			this.setNavList(currrentPath)
		},

		// 黑夜模式切换
		darkSwitch() {
			const html = document.querySelector('html')!
			if (this.dark) {
				html.className = 'dark'
			} else {
				html.className = ''
			}
		},
	},
})
