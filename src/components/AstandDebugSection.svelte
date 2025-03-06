<script lang="ts">
	import AstandDebug from '$lib/AstandDebug.svelte';
	import type { DebugStore } from '$lib/store.svelte.js';
	import { counterStore } from '../stores/counterStore.svelte.js';
	import { greeterStore } from '../stores/greeterStore.svelte.js';

	const debugStores: DebugStore[] = [
		{
			name: 'Counter',
			store: counterStore,
			actions: { increment: counterStore.increment, decrement: counterStore.decrement }
		},
		{
			name: 'Greeter',
			store: greeterStore,
			actions: { setName: () => greeterStore.setName('Test') }
		}
	];
</script>

<AstandDebug stores={debugStores} />
