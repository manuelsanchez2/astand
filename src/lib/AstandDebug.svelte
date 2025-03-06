<script lang="ts">
	import { onMount } from 'svelte';
	import type { DebugStore } from './store.svelte.js';

	let { stores }: { stores: DebugStore[] } = $props();

	let states: Record<string, any> = $state({});

	onMount(() => {
		stores.forEach(({ name, store }) => {
			store.subscribe((s) => {
				states[name] = s;
			});
		});
	});
</script>

<details class="astand-debug">
	<summary class="astand-debug__summary">Debug Panel</summary>
	{#each stores as { name, actions }}
		<details class="astand-debug__store">
			<summary class="astand-debug__store-summary">{name}</summary>
			<pre class="astand-debug__state">{JSON.stringify(states[name], null, 2)}</pre>
			{#if actions}
				<div class="astand-debug__actions">
					<p class="astand-debug__actions-title">Actions:</p>
					{#each Object.entries(actions) as [actionName, actionFn]}
						<button class="astand-debug__action-button" onclick={() => actionFn()}>
							{actionName}
						</button>
					{/each}
				</div>
			{/if}
		</details>
	{/each}
</details>

<style>
	.astand-debug {
		position: fixed;
		right: 0;
		bottom: 0;
		max-width: 300px;
		width: 100%;
		z-index: 50;
		margin: 16px;
		padding: 16px;
		background-color: #333;
		color: #fff;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		max-height: 90vh;
		overflow-y: auto;
	}

	.astand-debug__summary {
		font-size: 1.125rem;
		font-weight: bold;
		margin-bottom: 8px;
		cursor: pointer;
	}

	.astand-debug__store {
		margin-bottom: 16px;
		border-bottom: 1px solid #555;
		padding-bottom: 8px;
	}

	.astand-debug__store-summary {
		cursor: pointer;
		color: #4da6ff;
	}

	.astand-debug__state {
		margin-top: 8px;
		font-size: 0.75rem;
		max-width: 300px;
		overflow: auto;
		white-space: pre-wrap;
	}

	.astand-debug__actions {
		margin-top: 8px;
	}

	.astand-debug__actions-title {
		font-weight: bold;
		margin-bottom: 4px;
	}

	.astand-debug__action-button {
		margin-top: 4px;
		margin-right: 4px;
		padding: 4px 8px;
		background-color: #0066cc;
		border: none;
		border-radius: 4px;
		color: #fff;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.astand-debug__action-button:hover {
		background-color: #005bb5;
	}
</style>
