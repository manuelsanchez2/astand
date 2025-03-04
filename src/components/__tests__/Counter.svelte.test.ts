import { describe, it, expect } from 'vitest';
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
});
