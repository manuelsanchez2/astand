import {
	consoleLogMiddleware,
	createStore,
	timestampMiddleware,
	type Store,
	type StoreOptions
} from '$lib/store.svelte.js';

interface CounterState {
	count: number;
	updatedAt?: string;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options: StoreOptions<CounterState> = {
	middleware: [consoleLogMiddleware, timestampMiddleware],
	persist: { key: 'counterStore', storage: 'local' }
};

const baseCounterStore = createStore<CounterState>(initialState, options);

export const counterStore: CounterStore = {
	...baseCounterStore,
	increment: () => {
		baseCounterStore.setState((prev) => ({ count: prev.count + 1 }));
	},
	decrement: () => {
		baseCounterStore.setState((prev) => ({ count: prev.count - 1 }));
	}
};
