import { ModuleId } from "@/context/AppContext";

export const MODULES: { id: ModuleId; title: string; tagline: string; color: string }[] = [
  { id: "dsa", title: "Data Structures & Algorithms", tagline: "Think in arrays, trees, and graphs.", color: "from-pink-400 to-rose-400" },
  { id: "web", title: "Web Development", tagline: "Build the modern web, end-to-end.", color: "from-fuchsia-400 to-purple-400" },
  { id: "js", title: "JavaScript", tagline: "Master the language of the browser.", color: "from-amber-400 to-pink-400" },
];

export const LEARNING: Record<ModuleId, { intro: string; sections: { heading: string; body: string }[]; example: string }> = {
  dsa: {
    intro: "Data Structures & Algorithms is the foundation of efficient software.",
    sections: [
      { heading: "Arrays", body: "Contiguous memory, O(1) random access." },
      { heading: "Searching", body: "Linear vs binary search — choose based on whether your data is sorted." },
      { heading: "Sorting", body: "Compare bubble, merge, and quicksort by stability and time complexity." },
      { heading: "Recursion", body: "A function calling itself with a smaller subproblem and a base case." },
    ],
    example: "Binary search runs in O(log n).",
  },
  web: {
    intro: "Web Development covers the stack from HTML/CSS to modern frameworks and APIs.",
    sections: [
      { heading: "HTML & Semantics", body: "Use the right tags so browsers and assistive tech understand your content." },
      { heading: "CSS Layout", body: "Flexbox for 1D, Grid for 2D layouts." },
      { heading: "React Components", body: "Compose small, focused components and lift state only when needed." },
      { heading: "APIs", body: "Use REST or GraphQL; handle loading, success and error states." },
    ],
    example: "A React component is a function returning JSX.",
  },
  js: {
    intro: "JavaScript is the language of the web.",
    sections: [
      { heading: "Types & Coercion", body: "Prefer === for predictable comparisons." },
      { heading: "Closures", body: "Functions remember the scope in which they were created." },
      { heading: "Promises & async/await", body: "Model async work as values you can chain or await." },
      { heading: "The Event Loop", body: "JS is single-threaded; tasks and microtasks decide what runs next." },
    ],
    example: "await fetch(url) pauses the async function until the promise resolves.",
  },
};

type MCQ = { q: string; options: string[]; answer: number };
function makeMCQs(base: MCQ[], count = 30): MCQ[] {
  const out: MCQ[] = [];
  for (let i = 0; i < count; i++) out.push(base[i % base.length]);
  return out;
}

export const MCQS: Record<ModuleId, MCQ[]> = {
  dsa: makeMCQs([
    { q: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
    { q: "Which structure uses LIFO order?", options: ["Queue", "Stack", "Heap", "Tree"], answer: 1 },
    { q: "Best case of bubble sort?", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], answer: 0 },
    { q: "A balanced BST search is?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], answer: 1 },
    { q: "Which is NOT a linear DS?", options: ["Array", "Linked list", "Tree", "Queue"], answer: 2 },
    { q: "Hash map average lookup?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 0 },
  ]),
  web: makeMCQs([
    { q: "Which tag is semantic?", options: ["<div>", "<span>", "<article>", "<b>"], answer: 2 },
    { q: "CSS property for 2D layout?", options: ["flex", "grid", "float", "block"], answer: 1 },
    { q: "React hook for side effects?", options: ["useState", "useEffect", "useMemo", "useRef"], answer: 1 },
    { q: "HTTP method to create a resource?", options: ["GET", "POST", "PUT", "DELETE"], answer: 1 },
    { q: "Which is a build tool?", options: ["Vite", "Express", "Redux", "Axios"], answer: 0 },
  ]),
  js: makeMCQs([
    { q: "typeof null is?", options: ["'null'", "'object'", "'undefined'", "'number'"], answer: 1 },
    { q: "Which creates a block scope?", options: ["var", "let", "function", "with"], answer: 1 },
    { q: "Promise.all rejects when?", options: ["All reject", "Any rejects", "Never", "Only first"], answer: 1 },
    { q: "Default `this` in strict mode (top-level fn)?", options: ["window", "undefined", "globalThis", "{}"], answer: 1 },
    { q: "Which is async?", options: ["map", "forEach", "fetch", "filter"], answer: 2 },
  ]),
};

export const ASSIGNMENTS: Record<ModuleId, { title: string; description: string; example: string; starter: string }[]> = {
  dsa: [
    { title: "Two Sum", description: "Return indices of the two numbers that add up to the target.", example: "nums=[2,7,11,15], target=9 → [0,1]", starter: "function twoSum(nums, target) {\n  // your code\n}\n" },
    { title: "Reverse a String", description: "Return the string reversed without using built-in reverse.", example: "'hello' → 'olleh'", starter: "function reverseString(s) {\n  // your code\n}\n" },
  ],
  web: [
    { title: "Counter Component", description: "Write a React component with increment, decrement and reset.", example: "Buttons update a number on screen.", starter: "function Counter() {\n  // your code\n}\n" },
    { title: "Fetch & Render", description: "Fetch users and render names. Show loading and error states.", example: "GET /users", starter: "async function loadUsers() {\n  // your code\n}\n" },
  ],
  js: [
    { title: "Debounce", description: "Implement debounce(fn, delay).", example: "const d = debounce(log, 300);", starter: "function debounce(fn, delay) {\n  // your code\n}\n" },
    { title: "Deep Clone", description: "Write deepClone(obj) for nested objects/arrays.", example: "deepClone({a:{b:1}})", starter: "function deepClone(obj) {\n  // your code\n}\n" },
  ],
};