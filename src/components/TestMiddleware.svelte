<script lang="ts">
	import { testMiddlewareStore } from '../stores/middlewareTestStore.svelte.js';

	function increment() {
		testMiddlewareStore.increment();
	}
	function decrement() {
		testMiddlewareStore.decrement();
	}
</script>

<div>
	<h2>Counter: {$testMiddlewareStore.count}</h2>
	{#if $testMiddlewareStore.updatedAt}
		<p class="max-w-[200px] text-sm text-gray-500">Last updated at: {$testMiddlewareStore.updatedAt}</p>
	{:else}
		<p class="max-w-[200px] text-sm text-gray-500">This counter has not been updated yet.</p>
	{/if}
	<button
		class="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
		on:click={increment}>Increment</button
	>
	<button
		class="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
		on:click={decrement}>Decrement</button
	>
</div>
