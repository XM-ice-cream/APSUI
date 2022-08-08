const Routes = [
  {
    path: "/index",
    name: "Index",
    redirect: "/index/home",
    component: () =>
      import(/* chunkName: Index */ "@/components/parent-view/ParentView.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () =>
          import(/* chunkName: Home */ "@/views/home/Home.vue"),
      }  
    ],
  },{
    path: "/goods/goodsList",
    name: "Goods",
    redirect: "/goods/goodsList",
    component: () =>
      import(/* chunkName: Goods */ "@/components/parent-view/ParentView.vue"),
    children: [
      {
        path: "/goods/goodsList",
        name: "GoodList",
        component: () =>
          import(/* chunkName: GoodList */ "@/views/goods/goods-list/goodsList.vue"),
      },   
    ],
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    redirect: "/maintenance/base-info",
    component: () =>
      import(/* chunkName: Maintenance */ "@/components/parent-view/ParentView.vue"),
    children: [
      {
        path: "/maintenance/base-info",
        name: "BaseInfo",
        component: () =>
          import(/* chunkName: BaseInfo */ "@/views/maintenance/base-info/BaseInfo.vue"),
      },   
    ],
  }
];

export default Routes;
