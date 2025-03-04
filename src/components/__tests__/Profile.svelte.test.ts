import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor, within } from '@testing-library/svelte';
import Profile from '../Profile.svelte';

describe('Profile Component - Name Update', () => {
	it('updates the name correctly', async () => {
		// Render the Profile component.
		const { container, getByLabelText, getByText } = render(Profile);

		// Locate the display container that holds the current profile information.
		const displayContainer = container.querySelector('.profile') as HTMLDivElement;
		if (!displayContainer) throw new Error('Display container not found');

		// Check initial name value:
		// Within the display container, find the <span> that exactly shows "John Doe".
		let nameSpan = within(displayContainer).getByText((content, node) => {
			if (!node) return false;

			return node.tagName.toLowerCase() === 'span' && content.trim() === 'John Doe';
		});
		expect(nameSpan).toBeTruthy();

		// Find the Name input (form label is "Name").
		const nameInput = getByLabelText('Name') as HTMLInputElement;

		// Update the input value to "Alice".
		await fireEvent.input(nameInput, { target: { value: 'Alice' } });

		// Click the update button.
		const updateButton = getByText('Update Profile');
		await fireEvent.click(updateButton);

		// Wait for the UI to reflect the updated name in the display container.
		await waitFor(() => {
			nameSpan = within(displayContainer).getByText((content, node) => {
				if (!node) return false;

				return node.tagName.toLowerCase() === 'span' && content.trim() === 'Alice';
			});
			expect(nameSpan).toBeTruthy();
		});
	});
});
