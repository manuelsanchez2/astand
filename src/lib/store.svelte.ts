/**
 * A definitive basic store library for Svelte 5 with middleware support.
 *
 * The store wraps state with Svelte’s reactive runes and supports middleware functions.
 * Middleware functions are called on every state update, receiving the previous state and the new state.
 *
 * @template T - The type of the state.
 */

import { derived } from "svelte/store";
import { cloneState } from "./utils/index.js";

export interface Store<T> {
	/**
	 * Returns the current reactive state.
	 */
	getState: () => T;
	/**
	 * Returns a plain (non-reactive) clone of the state.
	 */
	getRaw: () => T;
	/**
	 * Updates the state with a partial update or an updater function.
	 *
	 * @param partial - A partial state update or an updater function that receives the current state.
	 */
	setState: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void;
	/**
	 * Subscribes to state changes.
	 *
	 * @param listener - A callback that is invoked when the state changes.
	 * @returns An unsubscribe function.
	 */
	subscribe: (listener: (state: T) => void) => () => void;
}

/**
 * A middleware function that runs after a state update.
 *
 * @template T - The type of the state.
 * @param prevState - The state before the update.
 * @param nextState - The state after the update.
 */
export type Middleware<T> = (prevState: T, nextState: T) => void;

/**
 * Options for creating the store.
 */
export interface StoreOptions<T> {
	/**
	 * An array of middleware functions to be executed on each state update.
	 */
	middleware?: Middleware<T>[];
	/**
	 * Persist options: the key to use in storage and the type of storage.
	 * Defaults to using localStorage.
	 */
	persist?: {
		key: string;
		storage?: 'local' | 'session';
	};
}



/**
 * Creates a definitive store with middleware support.
 *
 * @template T - The type of the state.
 * @param initialState - The initial state of the store.
 * @param options - Optional settings (e.g. middleware).
 * @returns A store with getState, getRaw, setState, and subscribe methods.
 *
 * @example
 * // Create a counter store that logs every state change:
 * const counterStore = createStore({ count: 0 }, { middleware: [consoleLogMiddleware] });
 */
export function createStore<T>(initialState: T, options?: StoreOptions<T>): Store<T> {
	// Determine the initial value (rehydrate if persist is enabled and we're in the browser)
	let newInitial = initialState;
	if (options?.persist && typeof window !== 'undefined') {
		const { key, storage = 'local' } = options.persist;
		const st = storage === 'local' ? localStorage : sessionStorage;
		const stored = st.getItem(key);
		if (stored) {
			try {
				newInitial = JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse stored state:', e);
			}
		}
	}

	// Wrap the (possibly rehydrated) initial state with the Svelte 5 $state rune.
	let state = $state(newInitial);
	let listeners: Array<(state: T) => void> = [];
	const middlewares = options?.middleware ? [...options.middleware] : [];

	// If persistence is enabled and we're in the browser, add a persist middleware.
	if (options?.persist && typeof window !== 'undefined') {
		const { key, storage = 'local' } = options.persist;
		const st = storage === 'local' ? localStorage : sessionStorage;
		middlewares.push((prevState, nextState) => {
			try {
				st.setItem(key, JSON.stringify(nextState));
			} catch (e) {
				console.error('Persist middleware error:', e);
			}
		});
	}

	/**
	 * Runs middleware functions with the previous and new state.
	 */
	function runMiddleware(prevState: T, newState: T) {
		middlewares.forEach((mw) => {
			try {
				mw(prevState, newState);
			} catch (error) {
				console.error('Middleware error:', error);
			}
		});
	}

	return {
		getState() {
			return state;
		},
		getRaw() {
			return cloneState(state);
		},
		setState(partial: Partial<T> | ((prev: T) => Partial<T>)) {
			// Clone the current state before update.
			const prevState = cloneState(state);
			const nextFragment = typeof partial === 'function' ? partial(state) : partial;
			// Update each key to ensure reactivity.
			for (const key in nextFragment) {
				if (Object.prototype.hasOwnProperty.call(nextFragment, key)) {
					state[key as keyof T] = nextFragment[key as keyof T]!; // non-null assertion
				}
			}
			// Run middleware functions.
			runMiddleware(prevState, state);
			// Notify subscribers.
			listeners.forEach((listener) => listener(state));
		},

		subscribe(listener: (state: T) => void) {
			listeners.push(listener);
			// Immediately call the listener with the current state.
			listener(state);
			return () => {
				listeners = listeners.filter((l) => l !== listener);
			};
		}
	};
}

/**
 * Helper to expose the store as a Svelte-compatible store.
 *
 * Returns an object with only the subscribe method, allowing you to use Svelte’s auto-subscription ($) syntax.
 *
 * @template T - The type of the state.
 * @param store - The store created by createStore.
 * @returns A Svelte-compatible store.
 */
export function createSvelteStore<T>(store: Store<T>) {
	return {
		subscribe: store.subscribe
	};
}


/**
 * Type representing the combined state of an object of stores.
 */
export type CombinedState<T extends Record<string, { subscribe: (run: (value: any) => void) => () => void }>> = {
	[K in keyof T]: T[K] extends { subscribe: (run: (value: infer S) => () => void) => () => void }
		? S
		: never;
};

/**
 * CombinedStore is the type for the object returned by combineStores.
 * It contains all the original store objects and a subscribe method which yields a combined state.
 */
export type CombinedStore<T extends Record<string, { subscribe: (run: (value: any) => void) => () => void }>> =
	T & {
		subscribe: (run: (state: CombinedState<T>) => void) => () => void;
	};

/**
 * Combines multiple Svelte stores into one object.
 *
 * The returned object has all the properties of the original stores,
 * plus a subscribe method (from a derived store) that yields an object with
 * each key's current state.
 *
 * @param stores - An object mapping keys to Svelte stores.
 * @returns A combined store that can be used as a Svelte store and whose individual methods remain accessible.
 *
 * @example
 * import { counterStore } from './counterStore.svelte';
 * import { greeterStore } from './greeterStore.svelte';
 *
 * export const combinedStore = combineStores({
 *   counter: counterStore,
 *   greeter: greeterStore
 * });
 *
 * // In a component:
 * // Reading state:
 * //   {$combinedStore} might yield { counter: { count: 42, ... }, greeter: { name: 'Alice', ... } }
 * // Calling methods:
 * //   combinedStore.counter.increment();
 */
export function combineStores<
  T extends Record<string, { subscribe: (run: (value: any) => void) => () => void } & Record<string, any>>
>(stores: T): CombinedStore<T> {
  const keys = Object.keys(stores) as (keyof T)[];
  const combinedState = derived(
    keys.map((key) => stores[key]),
    (values) => {
      const combined: Partial<CombinedState<T>> = {};
      keys.forEach((key, i) => {
        // Explicitly cast each value to the expected type.
        (combined as CombinedState<T>)[key] = values[i] as CombinedState<T>[typeof key];
      });
      return combined as CombinedState<T>;
    }
  );
  return Object.assign({}, stores, { subscribe: combinedState.subscribe });
}