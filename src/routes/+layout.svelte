<script lang="ts">
	import { enhance } from '$app/forms'
	import { setContext } from 'svelte'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	const { user } = data

	setContext('user', user)

	import '/src/css/style.css'
</script>

<header>
	<h1><a href="/">Orage</a></h1>

	<nav>
		<a href="/">Home</a>
		<a href="/users">Users</a>
		{#if user}
			<form action="/?/logout" method="POST">
				<button type="submit">Logout ({user.email})</button>
			</form>
		{:else}
			<form action="/?/login" method="POST" use:enhance>
				<button type="submit">Login</button>
			</form>
		{/if}
	</nav>
</header>

<slot />

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
