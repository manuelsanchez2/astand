import {
	createStore,
	createSvelteStore,
	combineStores,
	type CombinedState,
	type CombinedStore,
	type Store,
	type DebugStore,
	type Middleware,
	type StoreOptions,
} from './store.svelte.js';

import AstandDebug from './AstandDebug.svelte'
import { consoleLogMiddleware, timestampMiddleware, validationMiddleware, debugMiddleware } from '$lib/middlewares/index.js'

// Reexport your stores here
export type { Store, DebugStore, Middleware, StoreOptions, CombinedState, CombinedStore };
export { createStore, combineStores, createSvelteStore, consoleLogMiddleware, timestampMiddleware, debugMiddleware, validationMiddleware, AstandDebug };
