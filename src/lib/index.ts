import {
	createStore,
	createSvelteStore,
	combineStores,
	type CombinedState,
	type CombinedStore,
	type Store,
	type Middleware,
	type StoreOptions,
} from './store.svelte.js';

import { consoleLogMiddleware, timestampMiddleware, validationMiddleware, debugMiddleware } from '$lib/middlewares/index.js'

// Reexport your stores here
export type { Store, Middleware, StoreOptions, CombinedState, CombinedStore };
export { createStore, combineStores, createSvelteStore, consoleLogMiddleware, timestampMiddleware, debugMiddleware, validationMiddleware };
