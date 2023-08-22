import { create } from "zustand";

import { tokyoNight } from "@uiw/codemirror-themes-all";
const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

interface ThemeStoreState {
  theme: typeof tokyoNight;
  code: string;
  setTheme: (newTheme: typeof tokyoNight) => void;
  lang: string;
  setLang: (language: string) => void;
  setCode: (code: string) => void;
  customInput: string;
  setCustomInput: (input: string) => void;
  processing: boolean | null;
  setProcessing: (process: boolean) => void;
  output: any;
  setOuptut: (data: any) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
}
export const useEditorStore = create<ThemeStoreState>((set) => ({
  theme: tokyoNight,
  setTheme: (newTheme) => set({ theme: newTheme }),
  code: javascriptDefault,
  output: null,
  setOuptut: (data) => set({ output: data }),
  toastMessage: "",
  setCode: (code) => set({ code: code }),
  lang: "javascript",
  setToastMessage: (message) => set({ toastMessage: message }),
  processing: null,
  setProcessing: (process) => set({ processing: process }),
  customInput: "",
  setCustomInput: (input) =>
    set({
      customInput: input,
    }),
  setLang: (language) => set({ lang: language }),
}));
