import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
const Routers: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () =>
      import(/* chunkName: 404 */ "@/components/not-found/NotFound.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* chunkName: login */ "@/views/login/Login.vue"),
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Index",
        redirect: "/home",
        component: () =>
          import(/* chunkName: Index */ "@/components/parent-view/ParentView.vue"),
        children: [
          {
            path: "/home",
            name: "Home",
            component: () =>
              import(/* chunkName: Home */ "@/views/home/Home.vue"),
          }
        ],
      },      
    ],
  },
];

export default Routers;
