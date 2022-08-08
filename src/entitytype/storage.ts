// 缓存参数
export interface IUseLocalStorage {
    setLocalStorage: (name: string, data: any) => void;
    getLocalStorage: (name: string) => any;
}

export interface ISessionStorage {
    setSessionStorage: (name: string, data: any) => void;
    getSessionStorage: (name: string) => any;
}