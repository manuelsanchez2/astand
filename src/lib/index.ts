import {
	createStore,
	createSvelteStore,
	type Store,
	type Middleware,
	type StoreOptions,
} from './store.svelte.js';

import { consoleLogMiddleware, timestampMiddleware, validationMiddleware } from '$lib/middlewares/index.js'

// Reexport your stores here
export type { Store, Middleware, StoreOptions };
export { createStore, createSvelteStore, consoleLogMiddleware, timestampMiddleware, validationMiddleware };
