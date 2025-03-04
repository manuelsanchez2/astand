import { consoleLogMiddleware, createStore, type Store } from '$lib/store.svelte.js';

/**
 * The shape of the greeter state.
 */
interface GreeterState {
	name: string;
}

/**
 * Extended interface for a greeter store with additional methods.
 */
export interface GreeterStore extends Store<GreeterState> {
	/**
	 * Sets a new name in the store.
	 */
	setName: (name: string) => void;
	/**
	 * Logs the current name to the console.
	 */
	logName: () => void;
}

// Create the base store with an initial name.
const baseGreeterStore = createStore<GreeterState>(
	{ name: 'World' },
	{ middleware: [consoleLogMiddleware] }
);

export const greeterStore: GreeterStore = {
	...baseGreeterStore,
	setName: (name: string) => baseGreeterStore.setState({ name }),
	logName: () => console.log('Current name:', baseGreeterStore.getState().name)
};
