<script lang="ts">
	import { enhance } from '$app/forms'

	let { data } = $props()
</script>

<h1>Welcome</h1>

{#each data.messages as message}
	<div class="message">
		<div>{message.message}</div>
		<form action="?/delete" method="post" use:enhance>
			<input type="hidden" name="id" value={message.id} />
			<button>✗</button>
		</form>
	</div>
{/each}

<form action="?/post" method="post" use:enhance>
	<label for="message">Message</label>
	<input type="text" name="message" id="message" />
</form>

<style>
	.message {
		position: relative;
		background-color: var(--grey-100);
		padding: 0.5rem;
		min-height: 2.5rem;
		display: flex;

		& > form {
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>
