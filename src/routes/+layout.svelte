<script lang="ts">
	import { enhance } from '$app/forms'
	import { setContext } from 'svelte'
	import type { LayoutData } from './$types'
	import { signIn, signOut } from '@auth/sveltekit/client'

	import '/src/css/style.css'
	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()
	const { user } = data
	setContext('user', user)
</script>

<header>
	<h1><a href="/">Orage</a></h1>

	<nav>
		<a href="/" role="button">Home</a>
		<a href="/users" role="button">Users</a>
		{#if user}
			<!-- <form action="/?/logout" method="POST">
				<button type="submit">Logout ({user.email})</button>
				</form> -->
			<button
				onclick={() => {
					signOut()
				}}>Logout ({user.email})</button
			>
		{:else}
			<!-- <form action="/?/login" method="POST" use:enhance>
				<button type="submit">Login</button>
			</form> -->
			<button
				onclick={() => {
					signIn()
				}}>Login</button
			>
		{/if}
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<!--  -->
</footer>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav {
		display: flex;
		align-items: baseline;
	}
</style>
