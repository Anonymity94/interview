var Trie = function () {
  this.children = {};
};

Trie.prototype.insert = function (word) {
  let node = this.children;
  for (const ch of word) {
    if (!node[ch]) {
      node[ch] = {};
    }
    node = node[ch];
  }
  node.isEnd = true;
};

Trie.prototype.searchPrefix = function (prefix) {
  let node = this.children;
  for (const ch of prefix) {
    if (!node[ch]) {
      return false;
    }
    node = node[ch];
  }
  return node;
};

Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);
  return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function (prefix) {
  return this.searchPrefix(prefix);
};
