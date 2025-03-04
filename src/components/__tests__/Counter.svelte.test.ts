import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import Counter from '../Counter.svelte';

describe('Counter Component', () => {
	it('increments and decrements correctly', async () => {
		// Render the Counter component.
		const { getByText } = render(Counter);

		// Verify the initial state is "Counter: 0".
		expect(getByText(/Counter: 0/)).toBeTruthy();

		// Get the increment and decrement buttons.
		const incrementButton = getByText('Increment');
		const decrementButton = getByText('Decrement');

		// Click the increment button.
		await fireEvent.click(incrementButton);

		// Wait for the counter to update to 1.
		await waitFor(() => {
			expect(getByText(/Counter: 1/)).toBeTruthy();
		});

		// Click the decrement button.
		await fireEvent.click(decrementButton);

		// Wait for the counter to update back to 0.
		await waitFor(() => {
			expect(getByText(/Counter: 0/)).toBeTruthy();
		});
	});

	it('saves updated state to localStorage', async () => {
		// Render the Counter component.
		const { getByText } = render(Counter);
		const incrementButton = getByText('Increment');

		// Click the increment button.
		await fireEvent.click(incrementButton);

		// Wait until the UI reflects the updated state.
		await waitFor(() => {
			expect(getByText(/Counter: 1/)).toBeTruthy();
		});

		// Retrieve the stored state from localStorage.
		const storedState = localStorage.getItem('counterStore');
		expect(storedState).toBeTruthy();

		// Parse and verify the stored state.
		const parsedState = JSON.parse(storedState!);
		expect(parsedState.count).toEqual(1);
		// The persist middleware should have added an updatedAt property.
		expect(parsedState.updatedAt).toBeDefined();
	});
});
