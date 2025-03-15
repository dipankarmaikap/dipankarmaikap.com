/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param {number} ms - The duration to delay (in milliseconds), e.g., `2000` for 2 seconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * // Wait for 2 seconds before executing the next line
 * await delay(2000);
 *
 * @example
 * // Use inside an async function
 * async function fetchData() {
 *   console.log("Fetching...");
 *   await delay(3000); // Wait 3 seconds
 *   console.log("Data fetched");
 * }
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
