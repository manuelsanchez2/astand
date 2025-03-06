<script lang="ts">
	import { testCombinedStore } from '../stores/combinedStore.svelte.js';

	function incrementCounter() {
		testCombinedStore.counter.increment();
	}

	function setGreeting(name: string) {
		testCombinedStore.greeter.setName(name);
	}
</script>

<div>
	<h2>This is the combined store</h2>
	
	<p>It can count {$testCombinedStore.counter.count}</p>
	<p>It can greet: Hi, {$testCombinedStore.greeter.name}</p>

	<button class="btn" onclick={() => incrementCounter()}> Increment counter </button>

	<button class="btn" onclick={() => setGreeting('Bob')}> Set greeting to Bob </button>

	<button class="btn" onclick={() => setGreeting('Foo')}> Set greeting to Foo </button>
</div>
