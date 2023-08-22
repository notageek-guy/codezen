export const sampleCode = {
  javascript: `
/**
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
`,

  cpp: `
/**
 * Problem: Binary Search: Search a sorted array for a target value.
 */

#include <iostream>
using namespace std;

// Time: O(log n)
int binarySearch(int arr[], int target, int start, int end) {
  if (start > end) {
    return -1;
  }
  int mid = start + (end - start) / 2;
  if (arr[mid] == target) {
    return mid;
  }
  if (arr[mid] < target) {
    return binarySearch(arr, target, mid + 1, end);
  }
  return binarySearch(arr, target, start, mid - 1);
}

int main() {
  int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  int target = 5;
  int result = binarySearch(arr, target, 0, sizeof(arr) / sizeof(arr[0]) - 1);
  cout << "Target found at index: " << result << endl;
  return 0;
}
`,
  python: `
# Problem: Binary Search: Search a sorted array for a target value.

# Time: O(log n)
def binarySearch(arr, target):
  return binarySearchHelper(arr, target, 0, len(arr) - 1)

def binarySearchHelper(arr, target, start, end):
  if start > end:
    return -1
  mid = (start + end) // 2
  if arr[mid] == target:
    return mid
  if arr[mid] < target:
    return binarySearchHelper(arr, target, mid + 1, end)
  return binarySearchHelper(arr, target, start, mid - 1)

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 5
result = binarySearch(arr, target)
print("Target found at index:", result)
`,
  java: `
/**
 * Problem: Binary Search: Search a sorted array for a target value.
 */

public class BinarySearch {

  // Time: O(log n)
  public static int binarySearch(int[] arr, int target) {
    return binarySearchHelper(arr, target, 0, arr.length - 1);
  }

  public static int binarySearchHelper(int[] arr, int target, int start, int end) {
    if (start > end) {
      return -1;
    }
    int mid = start + (end - start) / 2;
    if (arr[mid] == target) {
      return mid;
    }
    if (arr[mid] < target) {
      return binarySearchHelper(arr, target, mid + 1, end);
    }
    return binarySearchHelper(arr, target, start, mid - 1);
  }

  public static void main(String[] args) {
    int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int target = 5;
    int result = binarySearch(arr, target);
    System.out.println("Target found at index: " + result);
  }
}
`,
  typescript: `
/**
 * Problem: Binary Search: Search a sorted array for a target value.
 */

// Time: O(log n)
const binarySearch = (arr: number[], target: number): number => {
  return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr: number[], target: number, start: number, end: number): number => {
  if (start > end) {
    return -1;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === target) {
    return mid;
  }
  if (arr[mid] < target) {
    return binarySearchHelper(arr, target, mid + 1, end);
  }
  return binarySearchHelper(arr, target, start, mid - 1);
};

const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target: number = 5;
const result: number = binarySearch(arr, target);
console.log("Target found at index:", result);
`,
  rust: `
/**
 * Problem: Binary Search: Search a sorted array for a target value.
 */

fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut start = 0;
    let mut end = arr.len() - 1;

    while start <= end {
        let mid = (start + end) / 2;
        if arr[mid] == target {
            return Some(mid);
        } else if arr[mid] < target {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    `,
};
