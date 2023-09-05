import { writable } from "svelte/store";

export type ToastType = "success" | "error";
export const toastStore = writable<
  {
    id: number;
    message: string;
    type: ToastType;
  }[]
>([]);

let index = 0;

export function showToast(message, type: ToastType = "success") {
  const id = index++;
  toastStore.update((store) => {
    return [
      ...store,
      {
        id,
        message,
        type,
      },
    ];
  });
  setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  toastStore.update((store) => {
    return store.slice(1);
  });
}
