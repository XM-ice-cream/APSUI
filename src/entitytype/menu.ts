// 菜单
export interface INavItem {
    title: string;
    path: string;
}

export interface ITreeMenuItem {
    id: string;
    parentId:string;
    path: string;
    href:string;
    name: string | undefined;
    title:string;
    icon: string;
    component:string;
    children?: ITreeMenuItem[];
}

export interface IUserRouterItem {
    name?: string | undefined;
    path: string;
    redirect?: string;
    meta?: { icon: string };
    children?: IUserRouterItem[];
    component?: any;
}