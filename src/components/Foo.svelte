<script lang="ts">
	import { counterStore } from '../stores/counterStore.svelte.js';
</script>

<p>This is Foo</p>

{$counterStore.count}
