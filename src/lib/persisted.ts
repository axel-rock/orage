import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export function persisted(key: string, value: any) {
	if (!browser) return writable(value)
	try {
		const d = localStorage.getItem(key)
		if (d && typeof d !== undefined && typeof d == 'string' && d.length > 1)
			value = JSON.parse(d as string)
	} catch (e) {
		localStorage.removeItem(key)
		// console.error(e)
	}
	const store = writable(value)
	store.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value))
	})
	return store
}
