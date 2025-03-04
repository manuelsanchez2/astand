<script lang="ts">
	import { greeterStore } from '../stores/greeterStore.svelte.js';
</script>

<div>
	<div>Hello, {$greeterStore.name}!</div>
	<input
		class="mt-1 block w-full rounded-md border-2 border-black px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		type="text"
		placeholder="Enter your name"
		on:input={(e) => greeterStore.setName((e.target as HTMLInputElement).value)}
	/>
	<button
		class="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
		on:click={() => greeterStore.logName()}>Log Name</button
	>
</div>
