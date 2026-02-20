/************************************************
  1. getUserInitials
************************************************/
function getUserInitials(user) {
  return (user.firstName[0] + user.lastName[0]).toUpperCase();
}

/************************************************
  2. countProperties
************************************************/
function countProperties(obj) {
  return Object.keys(obj).length;
}

/************************************************
  3. invertObject
************************************************/
function invertObject(obj) {
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key;
    }
  }
  return result;
}

/************************************************
  4. removeFalsyValues
************************************************/
function removeFalsyValues(arr) {
  return arr.filter(Boolean);
}

/************************************************
  5. groupByAge
************************************************/
function groupByAge(people) {
  return people.reduce((acc, person) => {
    if (!acc[person.age]) {
      acc[person.age] = [];
    }
    acc[person.age].push(person);
    return acc;
  }, {});
}

/************************************************
  6. findMostFrequentElement
************************************************/
function findMostFrequentElement(arr) {
  const freq = {};
  let maxCount = 0;
  let result;

  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;

    if (freq[num] > maxCount) {
      maxCount = freq[num];
      result = num;
    }
  }

  return result;
}

/************************************************
  7. flatten (any depth)
************************************************/
function flatten(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

/************************************************
  8. mergeObjects (Deep Merge)
************************************************/
function mergeObjects(...objects) {
  const result = {};

  for (let obj of objects) {
    for (let key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        result[key] = mergeObjects(result[key] || {}, obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

/************************************************
  9. rotateArray
************************************************/
function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n;
  return [...arr.slice(-k), ...arr.slice(0, n - k)];
}

/************************************************
  10. intersection
************************************************/
function intersection(nums1, nums2) {
  const set2 = new Set(nums2);
  return [...new Set(nums1.filter(n => set2.has(n)))];
}

/************************************************
  11. groupAnagrams
************************************************/
function groupAnagrams(words) {
  const map = {};

  for (let word of words) {
    const key = word.split("").sort().join("");

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(word);
  }

  return Object.values(map);
}

/************************************************
  12. moveZerosToEnd (in-place)
************************************************/
function moveZerosToEnd(arr) {
  let insertPos = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[insertPos++] = arr[i];
    }
  }

  while (insertPos < arr.length) {
    arr[insertPos++] = 0;
  }

  return arr;
}

/************************************************
  13. longestConsecutiveSequence
************************************************/
function longestConsecutiveSequence(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;

      while (set.has(current + 1)) {
        current++;
        streak++;
      }

      longest = Math.max(longest, streak);
    }
  }

  return longest;
}

/************************************************
  14. productExceptSelf (No division)
************************************************/
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }

  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }

  return result;
}

/************************************************
  15. deepEqual
************************************************/
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/************************************************
  16. serializeObject & deserializeObject
************************************************/
function serializeObject(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value === undefined) {
      return { __type: "undefined" };
    }

    if (value instanceof Date) {
      return { __type: "Date", value: value.toISOString() };
    }

    if (value instanceof Map) {
      return { __type: "Map", value: [...value] };
    }

    if (value instanceof Set) {
      return { __type: "Set", value: [...value] };
    }

    return value;
  });
}

function deserializeObject(str) {
  return JSON.parse(str, (key, value) => {
    if (value && value.__type === "undefined") {
      return undefined;
    }

    if (value && value.__type === "Date") {
      return new Date(value.value);
    }

    if (value && value.__type === "Map") {
      return new Map(value.value);
    }

    if (value && value.__type === "Set") {
      return new Set(value.value);
    }

    return value;
  });
}

/************************************************
  EXPORT (Optional for Node.js)
************************************************/
module.exports = {
  getUserInitials,
  countProperties,
  invertObject,
  removeFalsyValues,
  groupByAge,
  findMostFrequentElement,
  flatten,
  mergeObjects,
  rotateArray,
  intersection,
  groupAnagrams,
  moveZerosToEnd,
  longestConsecutiveSequence,
  productExceptSelf,
  deepEqual,
  serializeObject,
  deserializeObject
};
