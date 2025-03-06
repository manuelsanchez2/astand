import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import TestMiddleware from '../TestMiddleware.svelte';
import { testMiddlewareStore } from '../../stores/middlewareTestStore.svelte.js';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('Test Component with different middlewares - Validation', () => {
//   it('triggers validation error when state becomes negative via component', async () => {
//     // Set up a global error handler to capture uncaught errors.
//     const errorHandler = vi.fn();
//     window.addEventListener('error', errorHandler);

//     // Render the component.
//     const { getByText } = render(TestMiddleware);
//     const incrementButton = getByText('Increment');
//     const decrementButton = getByText('Decrement');

//     // Increment once: 0 -> 1.
//     await fireEvent.click(incrementButton);
//     await waitFor(() => {
//       expect(getByText(/Counter: 1/)).toBeTruthy();
//     });

//     // Decrement once: 1 -> 0 (this is valid).
//     await fireEvent.click(decrementButton);
//     await waitFor(() => {
//       expect(getByText(/Counter: 0/)).toBeTruthy();
//     });

//     // Now attempt to decrement again: 0 -> -1. This should trigger the validation error.
//     await fireEvent.click(decrementButton);

//     // Wait for the error handler to be called.
//     await waitFor(() => {
//       expect(errorHandler).toHaveBeenCalled();
//     });

//     // Check that the error message contains the expected text.
//     const errorEvent = errorHandler.mock.calls[0][0];
//     expect(errorEvent.message).toMatch('Count must be non-negative');

//     // Clean up the global error listener.
//     window.removeEventListener('error', errorHandler);
//   });

it('saves updated state to localStorage and shows updatedAt', async () => {
    const { getByText } = render(TestMiddleware);
    const incrementButton = getByText('Increment');

    // Click the increment button.
    await fireEvent.click(incrementButton);

    // Wait until the UI reflects the updated state.
    await waitFor(() => {
      expect(getByText(/Counter: 1/)).toBeTruthy();
    });

    // Retrieve the stored state from localStorage.
    const storedState = localStorage.getItem('testMiddlewareStore');
    expect(storedState).toBeTruthy();

    // Parse and verify the stored state.
    const parsedState = JSON.parse(storedState!);
    expect(parsedState.count).toEqual(1);
    // The persist middleware should have added an updatedAt property.
    expect(parsedState.updatedAt).toBeDefined();
  });

  it('throws error when decrementing below zero', async () => {
    const consoleSpy = vi.spyOn(console, 'error')

    testMiddlewareStore.decrement();
    await waitFor(() => {
      expect(testMiddlewareStore.getState().count).toBe(0);
    });

    testMiddlewareStore.decrement();
    await waitFor(() => {
      expect(testMiddlewareStore.getState().count).toBe(-1);
    });
    expect(consoleSpy).toHaveBeenCalledOnce();
  });
  
});
