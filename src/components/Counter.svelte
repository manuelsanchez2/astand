<script lang="ts">
	import { counterStore } from '../stores/counterStore.svelte.js';

	function increment() {
		counterStore.increment();
	}
	function decrement() {
		counterStore.decrement();
	}
</script>

<main>
	<h2>Counter: {$counterStore.count}</h2>
	{#if $counterStore.updatedAt}
		<p class="text-sm text-gray-500">Last updated at: {$counterStore.updatedAt}</p>
	{/if}
	<button on:click={increment}>Increment</button>
	<button on:click={decrement}>Decrement</button>
</main>
