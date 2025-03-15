type ToastType = "success" | "error" | "warning" | "info";

/**
 * Creates a toast notification and adds it to the DOM as a fixed alert in the top-right corner.
 *
 * @param {string} message - The message to display in the toast.
 * @param {ToastType} type - The type of toast (`"success"`, `"error"`, `"warning"`, `"info"`).
 *
 * @example
 * // Show a success toast
 * createToast("Operation successful", "success");
 *
 * @example
 * // Show an error toast
 * createToast("Something went wrong", "error");
 *
 * @example
 * // Show an info toast
 * createToast("This is an informational message", "info");
 */
export function createToast(message: string, type: ToastType) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.classList.add(
      "fixed",
      "top-0",
      "right-0",
      "m-4",
      "z-50",
      "flex",
      "flex-col",
      "gap-4",
      "text-xl"
    );
    document.body.appendChild(container);
  }
  const bg =
    type === "success"
      ? "border-green-400 text-green-700 bg-green-100"
      : type === "error"
      ? "border-red-400 text-red-700 bg-red-100"
      : type === "warning"
      ? "border-orange-400 text-orange-700 bg-orange-100"
      : "border-blue-400 text-blue-700 bg-blue-100";
  const btnBg =
    type === "success"
      ? "hover:bg-green-200"
      : type === "error"
      ? "hover:bg-red-200"
      : type === "warning"
      ? "hover:bg-orange-200"
      : "hover:bg-blue-200";

  const toastTemplate = `
    <div class="flex items-center gap-4 border ${bg} justify-between flex-nowrapa p-2 rounded-md max-w-sm">
      <p class="ml-1">${message}</p>
      <button class="shrink-0 ${btnBg} rounded close-toast size-8 flex items-center justify-center">
        <span class="sr-only">Dismiss</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          class="size-6"
        >
          <path
            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
          ></path>
        </svg>
      </button>
    </div>
  `;

  const toastElement = document.createElement("div");
  toastElement.innerHTML = toastTemplate;
  const toast = toastElement.firstElementChild as HTMLElement;

  toast.querySelector(".close-toast")?.addEventListener("click", () => {
    toast.remove();
  });

  document.getElementById("toast-container")?.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}
