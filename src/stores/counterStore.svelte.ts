import {
	consoleLogMiddleware,
	createStore,
	timestampMiddleware,
	type Store
} from '$lib/store.svelte.js';

interface CounterState {
	count: number;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options = { middleware: [consoleLogMiddleware, timestampMiddleware] };

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
