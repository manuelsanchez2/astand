
  import { combineStores } from '$lib/store.svelte.js';
  import { counterStore } from './counterStore.svelte.js';
  import { greeterStore } from './greeterStore.svelte.js';

  export const testCombinedStore = combineStores({
    counter: counterStore,
    greeter: greeterStore
  });
