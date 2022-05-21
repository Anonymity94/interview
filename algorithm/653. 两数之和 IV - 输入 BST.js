/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  const set = new Set();
  return doFind(root, k, set);
};

/**
 * @param {TreeNode} node
 * @param {number} k
 * @param {Set} k
 * @return {boolean}
 */
var doFind = function (node, k, set) {
  if (node === null) {
    return false;
  }
  if (set.has(k - node.val)) {
    return true;
  }
  set.add(node.val);
  return doFind(node.left, k, set) || doFind(node.right, k, set);
};
