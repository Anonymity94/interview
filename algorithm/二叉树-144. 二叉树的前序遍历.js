/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 递归
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let result = [];

  if (root === null) {
    return [];
  }

  result.push(root.val);
  result.push(...preorderTraversal(root.left));
  result.push(...preorderTraversal(root.right));

  return result;
};

/**
 * 迭代
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let result = [];

  if (root === null) {
    return [];
  }

  let stack = [];
  let node = root;

  while (node !== null || stack.length > 0) {
    while (node !== null) {
      result.push(node.val);
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    node = node.right;
  }

  return result;
};
