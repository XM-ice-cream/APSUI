const Routes = [
	{
		path: '/index',
		name: 'Index',
		redirect: '/index/home',
		component: () =>
			import(
				/* chunkName: Index */ '@/components/parent-view/ParentView.vue'
			),
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () =>
					import(/* chunkName: Home */ '@/views/home/Home.vue'),
			},
		],
	},
	{
		path: '/maintenance',
		name: 'Maintenance',
		redirect: '/maintenance/base-info',
		component: () =>
			import(
				/* chunkName: Maintenance */ '@/components/parent-view/ParentView.vue'
			),
		children: [
			{
				path: '/maintenance/base-info',
				name: 'BaseInfo',
				component: () =>
					import(
						/* chunkName: BaseInfo */ '@/views/maintenance/base-info/BaseInfo.vue'
					),
			},
			{
				path: '/maintenance/eqp-info',
				name: 'EqpInfo',
				component: () =>
					import(
						/* chunkName: EqpInfo */ '@/views/maintenance/eqp-info/EqpInfo.vue'
					),
			},
			{
				path: '/maintenance/line',
				name: 'Line',
				component: () =>
					import(
						/* chunkName: Line */ '@/views/maintenance/line/Line.vue'
					),
			},
		],
	},
]

export default Routes
