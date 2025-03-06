# Astand 🚀

A lightweight, reactive state management library for Svelte 5 with middleware support.

Inspired by the simplicity of Zustand and the power of Svelte’s reactive runes, this library provides a single‑file API to create global or scoped state stores—complete with middleware (like logging) and full TypeScript support.

---

## ✨ Features

- **Reactive Stores:**  
  Utilizes Svelte’s `$state` rune for fine‑grained reactivity.
- **Middleware Support:**  
  Easily plug in middleware to run on every state update (e.g. logging with `consoleLogMiddleware`, validation with `validationMiddleware`, etc.).
- **Direct Svelte Store Contract:**  
  Implements a `subscribe` method under the hood so you can directly use the store in your Svelte components (no extra wrappers required).
- **TypeScript First:**  
  Built with TypeScript to provide a fully typed API.

---

## 📦 Installation

Install via npm (or your preferred package manager):

```bash
npm install astand
# or
pnpm add astand
# or
yarn add astand
```

## 🛠 Usage

### Creating a Store

Use the `createStore` function to create a store with an initial state and optional middleware. For example, create a counter store that logs every state update:

```ts
// src/stores/counterStore.svelte.ts
import { consoleLogMiddleware, createStore, type Store } from '$lib/store.svelte.js';

interface CounterState {
	count: number;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options = {};

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
```

### Using the Store in Svelte Components

Since the store implements Svelte’s store contract (with a `subscribe` method), you can import and use it directly in your Svelte components:

```svelte
<!-- src/components/Counter.svelte -->
<script lang="ts">
	import { counterStore } from '../stores/counterStore.svelte';
</script>

<main>
	<h1>Counter: {$counterStore.count}</h1>
	<button on:click={() => counterStore.increment()}>➕ Increment</button>
	<button on:click={() => counterStore.decrement()}>➖ Decrement</button>
</main>
```

Svelte will auto‑subscribe to your store and update the component whenever state changes.

### Middleware

This is a work in progress. For the moment, you can log the state everytime there is a change in the store by using the `consoleLogMiddleware`.

```ts
// src/stores/counterStore.svelte.ts
import { consoleLogMiddleware, createStore, type Store } from '$lib/store.svelte.js';

interface CounterState {
	count: number;
}

export interface CounterStore extends Store<CounterState> {
	increment: () => void;
	decrement: () => void;
}

const initialState: CounterState = { count: 0 };
const options = { middleware: [consoleLogMiddleware] }; // 🚀 Add the middleware here!

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
```

## 🔌 API Reference

The main exports from the library are:

### Types:

- Store<T> – the store interface.
- Middleware<T> – middleware function type.
- StoreOptions<T> – options for store creation.

### Functions:

- createStore<T>(initialState: T, options?: StoreOptions<T>): Store<T>
  Creates a reactive store with optional middleware.
- combineStores<T>(stores: Record<string, { subscribe: (run: (value: any) => void) => () => void } & Record<string, any>>): CombinedStore<T>  
  Combines multiple Svelte stores into a single derived store. The returned object has:
  - A `subscribe` method that yields an object with each key’s current state.
  - All the original store objects (with their methods), so you can call, for example, `combinedStore.counter.increment()`.
- createSvelteStore<T>(store: Store<T>)
  Optional: A helper that exposes only the subscribe method (if you prefer to limit your store’s public API).
- consoleLogMiddleware<T>(prevState: T, nextState: T): void
  A sample middleware function for logging state changes.
- timestampMiddleware<T extends object>(prevState: T, nextState: T): void
  Adds/updates an updatedAt property on the state with the current ISO timestamp whenever the state is updated.
- validationMiddleware<T>(conditions: ValidationCondition<T>[]): Middleware<T>
  Checks one or more conditions on the new state and either logs, warns, or throws an error if a condition isn’t met.

```ts
type ValidationCondition<T> = {
  predicate: (state: T) => boolean;
  message: string;
  level?: 'log' | 'warn' | 'error';
};
```

- Persist Options: The persist option in StoreOptions<T> allows you to specify a key and an optional storage type ('local' or 'session') to automatically rehydrate and save state between page loads.

```ts
const options = {
  persist: { key: 'counterStore', storage: 'local' }
};
```

#### Example of a combination of persist and middlewares


```ts
const options = {
  middleware: [
	consoleLogMiddleware,
    validationMiddleware([
      {
        predicate: (s: { count: number }) => s.count >= 0,
        message: 'Count must be non-negative',
        level: 'error'
      }
    ])
  ],
  persist: { key: 'testMiddlewareStore', storage: 'local' }
};
const store = createStore({ count: 0 }, options);
```