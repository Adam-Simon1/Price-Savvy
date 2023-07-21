import { writable } from 'svelte/store';

export const tescoStatus = writable(false);
export const kauflandStatus = writable(false);

export const sortingMethod = writable('')