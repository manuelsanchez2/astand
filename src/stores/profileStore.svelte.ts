import { consoleLogMiddleware, createStore, type Store } from '$lib/store.svelte.js';

interface Address {
	city: string;
	country: string;
}

interface ProfileState {
	name: string;
	age: number;
	address: Address;
}

export interface ProfileStore extends Store<ProfileState> {
	updateName: (name: string) => void;
	updateAge: (age: number) => void;
	updateAddress: (address: Partial<Address>) => void;
}

const baseProfileStore = createStore<ProfileState>(
	{
		name: 'John Doe',
		age: 30,
		address: {
			city: 'New York',
			country: 'USA'
		}
	},
	{ middleware: [consoleLogMiddleware], persist: { key: 'profileStore' } }
);

export const profileStore: ProfileStore = {
	...baseProfileStore,
	updateName: (name: string) => baseProfileStore.setState({ name }),
	updateAge: (age: number) => baseProfileStore.setState({ age }),
	updateAddress: (address: Partial<Address>) =>
		baseProfileStore.setState((prev) => ({ address: { ...prev.address, ...address } }))
};
