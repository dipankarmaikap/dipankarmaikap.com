export function clearErrors(form: HTMLFormElement) {
  form.querySelectorAll(".error-message").forEach((el) => el.remove());
  form
    .querySelectorAll("label, input")
    .forEach((el) => el.classList.remove("text-red-500", "ring-red-500"));
}

export function createButtonLoader(button: HTMLButtonElement) {
  const spinnerSpan = button.querySelector(".spinner") as HTMLSpanElement;
  const originalText = button.textContent;
  const loadingText = button.getAttribute("data-loading");
  const spinner = createSpinner();

  return {
    setLoading(isLoading: boolean) {
      if (isLoading) {
        updateSubmitButton(button, true, originalText, loadingText);
        if (!spinnerSpan.contains(spinner)) {
          spinnerSpan.prepend(spinner);
        }
      } else {
        updateSubmitButton(button, false, originalText, loadingText);
        spinner.remove();
      }
    },
  };
}

export function updateSubmitButton(
  submitButton: HTMLButtonElement,
  isProcessing: boolean,
  originalText?: string | null,
  loadingText?: string | null
) {
  submitButton.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node?.nodeValue?.trim()) {
      node.nodeValue =
        (isProcessing ? loadingText || originalText : originalText) || "";
    }
  });
  submitButton.disabled = isProcessing;
}

export function createSpinner(): HTMLSpanElement {
  const spinner = document.createElement("span");
  spinner.innerHTML = `<svg class="animate-spin size-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;
  return spinner;
}
export function highlightInputErrors(error: any) {
  Object.entries(error.fields).forEach(([field, message], index) => {
    const input = document.getElementById(field);
    if (!input) return;

    const messageString: string = Array.isArray(message)
      ? message.join(", ")
      : String(message) || "";

    const label = document.querySelector(`label[for=${field}]`);
    if (index === 0) input.focus();

    label?.classList.add("text-red-500");
    input?.classList.add("ring-red-500");

    let errorElement = input?.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("p");
      errorElement.classList.add(
        "error-message",
        "text-red-500",
        "text-base",
        "mt-1"
      );
      input.insertAdjacentElement("afterend", errorElement);
    }

    errorElement.innerHTML = messageString || "";
  });
}
