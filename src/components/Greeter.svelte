<script lang="ts">
	import { greeterStore } from '../stores/greeterStore.svelte.js';
</script>

<div>
	<h1>Hello, {$greeterStore.name}!</h1>
	<input
		type="text"
		placeholder="Enter your name"
		on:input={(e) => greeterStore.setName((e.target as HTMLInputElement).value)}
	/>
	<button on:click={() => greeterStore.logName()}>Log Name</button>
</div>
