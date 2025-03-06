// src/stores/testMiddlewareStore.svelte.ts
import {
	createStore,
	consoleLogMiddleware,
	timestampMiddleware,
	validationMiddleware,
	type Store,
	type StoreOptions,
	debugMiddleware
  } from '$lib/index.js';
  
  interface TestMiddlewareState {
	count: number;
	updatedAt?: string;
	// The history middleware will attach a hidden property __history__
  }
  
  export interface TestMiddlewareStore extends Store<TestMiddlewareState> {
	increment: () => void;
	decrement: () => void;
  }
  
  // We'll build our test store with all our middleware.
  // Note: We assume throttle and debounce middleware are defined as in previous examples.
  const options: StoreOptions<TestMiddlewareState> = {
	middleware: [
	  consoleLogMiddleware,
	  timestampMiddleware,
	  debugMiddleware(
		(prev) => console.log('Before change:', prev),
		(next) => console.log('After change:', next)
	  ),
	  // Validation: count must be >= 0.
	  validationMiddleware<TestMiddlewareState>([
		{
		  predicate: (s) => s.count >= 0,
		  message: 'Count must be non-negative',
		  level: 'error'
		}
	  ]),
	],
	persist: { key: 'testMiddlewareStore', storage: 'local' }
  };
  
  const initialState: TestMiddlewareState = { count: 0 };
  const baseTestMiddlewareStore = createStore<TestMiddlewareState>(initialState, options);
  
  export const testMiddlewareStore: TestMiddlewareStore = {
	...baseTestMiddlewareStore,
	increment: () => {
	  baseTestMiddlewareStore.setState((prev) => ({ count: prev.count + 1 }));
	},
	decrement: () => {
	  baseTestMiddlewareStore.setState((prev) => ({ count: prev.count - 1 }));
	}
  };
  