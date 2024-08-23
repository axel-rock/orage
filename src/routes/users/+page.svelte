<script lang="ts">
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()
</script>

<h1>Users</h1>

<ul>
	{#each data.users as user}
		<li>{user.fullName}</li>
	{/each}
</ul>

<form method="post">
	<input type="text" name="name" placeholder="name" />
	<button>Submit</button>
</form>
