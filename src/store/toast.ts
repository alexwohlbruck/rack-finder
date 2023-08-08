import { writable } from "svelte/store";

export const toastStore = writable<
  {
    id: number;
    message: string;
  }[]
>([]);

let index = 0;

export function showToast(message) {
  const id = index++;
  toastStore.update((store) => {
    return [
      ...store,
      {
        id,
        message,
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
