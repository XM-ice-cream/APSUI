import { IUseLocalStorage } from "@/entity/storage";

function useLocalStorage(): IUseLocalStorage {
	function setLocalStorage(name: string, data: any) {
		localStorage.setItem(name, JSON.stringify(data));
	}
	function getLocalStorage(name: string) {
		if (localStorage.getItem(name) !== "undefined") {
			return JSON.parse(localStorage.getItem(name) || "0");
		} else {
			return "";
		}
	}
	return {
		setLocalStorage,
		getLocalStorage,
	};
}

export { useLocalStorage };
