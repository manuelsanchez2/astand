/**
 * A definitive basic store library for Svelte 5 with middleware support.
 *
 * The store wraps state with Svelte’s reactive runes and supports middleware functions.
 * Middleware functions are called on every state update, receiving the previous state and the new state.
 *
 * @template T - The type of the state.
 */

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
}

/**
 * Tries to clone the state. First uses structuredClone; if that fails (for reactive proxies),
 * falls back to JSON serialization for simple serializable states.
 *
 * @template T - The type of the state.
 * @param state - The state to clone.
 * @returns A clone of the state.
 */
function cloneState<T>(state: T): T {
	try {
		return structuredClone(state);
	} catch (e) {
		// Fallback: use JSON serialization (works only for serializable state)
		try {
			return JSON.parse(JSON.stringify(state));
		} catch (e2) {
			console.error('Failed to clone state:', e2);
			throw e2;
		}
	}
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
	// Wrap the initial state with the Svelte 5 $state rune.
	let state = $state(initialState);
	let listeners: Array<(state: T) => void> = [];
	const middlewares = options?.middleware ?? [];

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
 * Example middleware: logs state changes to the console.
 *
 * @template T - The type of the state.
 * @param prevState - The state before the update.
 * @param nextState - The state after the update.
 */
export function consoleLogMiddleware<T>(prevState: T, nextState: T): void {
	console.log('State updated from', cloneState(prevState), 'to', cloneState(nextState));
}

/**
 * Timestamp middleware.
 *
 * Adds/updates an `updatedAt` property on the state with the current ISO timestamp
 * whenever the state is updated.
 *
 * @template T - The type of the state. (Should be an object.)
 * @param prevState - The state before the update.
 * @param nextState - The state after the update.
 */
export function timestampMiddleware<T extends object>(prevState: T, nextState: T): void {
	// We cast to 'any' because we're adding a property that may not exist on T.
	(nextState as any).updatedAt = new Date().toISOString();
}
