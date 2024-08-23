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
			{user.fullName}
			<form action="?/delete" method="post">
				<input type="hidden" name="id" value={user.id} />
				<button>Delete</button>
			</form>
		</li>
	{/each}
</ul>

<form method="post" action="?/create" use:enhance>
	<input type="text" name="name" placeholder="name" />
	<button>Submit</button>
</form>
