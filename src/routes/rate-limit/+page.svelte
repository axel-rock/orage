<script lang="ts">
	import { persisted } from '$lib/persisted'

	const { data, form } = $props()

	const apikey = persisted('anthropic-api-key', '')
</script>

<p>
	This page is used to test rate limits.<br />Your API key is stored in your browser's local storage
	only. Not on the server.<br />To get current rate limit, we will send and reveive 1 token, and
	check the headers.
</p>

<form method="post">
	<label for="apikey">Anthropic API Key</label>
	<input type="password" name="apikey" id="apikey" placeholder="sk-***" bind:value={$apikey} />

	<button>Submit</button>
</form>

<pre>
  {JSON.stringify(form, null, 2)}
</pre>
