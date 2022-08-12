import { ISessionStorage } from '@/entity/storage'

function useSessionStorage(): ISessionStorage {
	function setSessionStorage(name: string, data: any) {
		sessionStorage.setItem(name, JSON.stringify(data))
	}
	function getSessionStorage(name: string) {
		return JSON.parse(sessionStorage.getItem(name)!)
	}
	return {
		setSessionStorage,
		getSessionStorage,
	}
}

export { useSessionStorage }
