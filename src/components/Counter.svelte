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
	<button on:click={increment}>Increment</button>
	<button on:click={decrement}>Decrement</button>
</main>
