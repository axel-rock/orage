<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()
</script>

<h1>Users</h1>

<ul>
	{#each data.users as user}
		<li id={user.id}>
			<details>
				<summary>{user.username ?? user.email}</summary>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</details>
			<form action="?/delete" method="post" use:enhance>
				<input type="hidden" name="id" value={user.id} />
				<button>Delete</button>
			</form>
		</li>
	{/each}
</ul>
