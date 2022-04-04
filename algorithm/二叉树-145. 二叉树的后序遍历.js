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
var postorderTraversal = function (root) {
  if (root === null) {
    return [];
  }

  let result = [];

  result.push(...postorderTraversal(root.left));
  result.push(...postorderTraversal(root.right));
  result.push(root.val);

  return result;
};

/**
 * 迭代
 * @param {TreeNode} root
 * @return {number[]}
 * @see https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/die-dai-jie-fa-shi-jian-fu-za-du-onkong-jian-fu-za/
 */
var postorderTraversal = function (root) {
  let result = [];

  if (root === null) {
    return [];
  }

  let stack = [];
  let node = root;

  while (node !== null || stack.length > 0) {
    while (node !== null) {
      // 追加到最开始
      result.unshift(node.val);
      stack.push(node);
      // 先遍历右节点
      node = node.right;
    }

    node = stack.pop();
    // 再遍历左节点
    node = node.left;
  }

  return result;
};
