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
var inorderTraversal = function (root) {
  if (root === null) {
    return [];
  }
  let result = [];
  result.push(...inorderTraversal(root.left));
  result.push(root.val);
  result.push(...inorderTraversal(root.right));

  return result;
};

/**
 * 迭代
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  if (root === null) {
    return [];
  }
  let result = [];
  let stack = [];
  let node = root;
  while (node !== null || stack.length > 0) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    result.push(node.val);
    node = node.right;
  }

  return result;
};
