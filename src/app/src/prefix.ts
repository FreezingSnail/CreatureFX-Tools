
// TrieNode.ts
class TrieNode {
  children: { [key: string]: TrieNode }; // Each node has children (characters)
  isEndOfWord: boolean; // Whether this node marks the end of a word

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

// Trie.ts
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word: string): void {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  // Search for a word in the Trie
  search(word: string): boolean {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!currentNode.children[char]) {
        return false; // If a character is missing, the word is not in the Trie
      }
      currentNode = currentNode.children[char];
    }
    return currentNode.isEndOfWord; // Only return true if it's the end of a word
  }

  // Check if any word starts with the given prefix
  startsWith(prefix: string): boolean {
    let currentNode = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children[char]) {
        return false; // If a character is missing, no word starts with the prefix
      }
      currentNode = currentNode.children[char];
    }
    return true;
  }

  // Get all words that start with a given prefix
  getAllWordsWithPrefix(prefix: string): string[] {
    let currentNode = this.root;
    const result: string[] = [];

    // Step 1: Find the node corresponding to the last character of the prefix
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children[char]) {
        return []; // If the prefix doesn't exist in the Trie, return an empty array
      }
      currentNode = currentNode.children[char];
    }

    // Step 2: Use DFS to find all words starting from this node
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        result.push(currentWord); // If it's the end of a word, add it to the result list
      }

      for (const char in node.children) {
        dfs(node.children[char], currentWord + char); // Recur for each child node
      }
    };

    dfs(currentNode, prefix); // Start DFS from the last node of the prefix
    return result;
  }
}

export { Trie };
