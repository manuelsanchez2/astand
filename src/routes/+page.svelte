<script lang="ts">
	import { createSvelteStore } from '$lib/store.svelte.js';
	import Foo from '../components/Foo.svelte';
	import { counterStore } from '../stores/counterStore.svelte.js';

	const counter = createSvelteStore(counterStore);

	function increment() {
		counterStore.increment();
	}
	function decrement() {
		counterStore.decrement();
	}
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>Counter: {$counter.count}</h1>
<button class="cursor-pointer border" onclick={increment}>Increment</button>
<button onclick={decrement}>Decrement</button>

<h3>Counter: {$counter.count}</h3>

<Foo />
