// src/components/__tests__/CombinedStore.svelte.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import TestCombined from '../TestCombined.svelte';

describe('CombinedStore Component', () => {
  it('displays the initial combined state correctly', () => {
    const { getByText } = render(TestCombined);
    // Assuming initial counter is 0 and greeter initial value is "World"
    expect(getByText(/It can count 0/)).toBeTruthy();
    expect(getByText(/Hi, World/)).toBeTruthy();
  });

  it('increments the counter when "Increment counter" is clicked', async () => {
    const { getByText } = render(TestCombined);
    const incrementButton = getByText(/Increment counter/);
    await fireEvent.click(incrementButton);
    await waitFor(() => {
      expect(getByText(/It can count 1/)).toBeTruthy();
    });
  });

  it('updates the greeting when "Set greeting to Bob" is clicked', async () => {
    const { getByText } = render(TestCombined);
    const setBobButton = getByText(/Set greeting to Bob/);
    await fireEvent.click(setBobButton);
    await waitFor(() => {
      expect(getByText(/Hi, Bob/)).toBeTruthy();
    });
  });

  it('updates the greeting when "Set greeting to Foo" is clicked', async () => {
    const { getByText } = render(TestCombined);
    const setFooButton = getByText(/Set greeting to Foo/);
    await fireEvent.click(setFooButton);
    await waitFor(() => {
      expect(getByText(/Hi, Foo/)).toBeTruthy();
    });
  });
});
