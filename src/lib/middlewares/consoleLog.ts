import { cloneState } from "$lib/utils/index.js";

/**
 * Example middleware: logs state changes to the console.
 *
 * @template T - The type of the state.
 * @param prevState - The state before the update.
 * @param nextState - The state after the update.
 */
export function consoleLogMiddleware<T>(prevState: T, nextState: T): void {
	console.log('State updated from', cloneState(prevState), 'to', cloneState(nextState));
}