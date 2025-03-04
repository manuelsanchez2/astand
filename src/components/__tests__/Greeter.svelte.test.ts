import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import Greeter from '../Greeter.svelte';

describe('Greeter Component', () => {
	it('updates greeting on input', async () => {
		// Render the Greeter component.
		const { getByPlaceholderText, getByText } = render(Greeter);

		// Find the input element.
		const input = getByPlaceholderText('Enter your name') as HTMLInputElement;

		// Simulate typing "Alice" into the input.
		await fireEvent.input(input, { target: { value: 'Alice' } });

		// Wait for the greeting to update.
		await waitFor(() => {
			expect(getByText('Hello, Alice!')).toBeTruthy();
		});
	});
});
