<script lang="ts">
	import { enhance } from '$app/forms'

	let { data } = $props()
</script>

<h1>Welcome</h1>

{#each data.messages as message}
	<p>{message.message}</p>
{/each}

{#if data.user}
	<form action="?/post" method="post" use:enhance>
		<label for="message">Message</label>
		<input type="text" name="message" id="message" />
	</form>
{/if}
