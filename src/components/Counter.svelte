<script lang="ts">
	import { counterStore } from '../stores/counterStore.svelte.js';

	function increment() {
		counterStore.increment();
	}
	function decrement() {
		counterStore.decrement();
	}
</script>

<div>
	<h2>Counter: {$counterStore.count}</h2>
	{#if $counterStore.updatedAt}
		<p class="max-w-[200px] text-sm text-gray-500">Last updated at: {$counterStore.updatedAt}</p>
	{:else}
		<p class="max-w-[200px] text-sm text-gray-500">This counter has not been updated yet.</p>
	{/if}
	<button
		class="btn"
		on:click={increment}>Increment</button
	>
	<button
		class="btn"
		on:click={decrement}>Decrement</button
	>
</div>
