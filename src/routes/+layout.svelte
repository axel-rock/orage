<script lang="ts">
	import '/src/css/style.css'
	import type { LayoutData } from './$types'

	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()
</script>

<header>
	<h1><a href="/">Orage</a></h1>

	<nav>
		<a href="/" role="button">Home</a>
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
