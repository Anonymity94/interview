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
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) {
    return 0;
  }

  // 没有左分支，就以右分支为准
  if (root.left === null) {
    return minDepth(root.right) + 1;
  }
  // 没有右分支，就以左分支为准
  if (root.right === null) {
    return minDepth(root.left) + 1;
  }

  // 左右分支都有，那就以最小的为准
  const leftDepth = minDepth(root.left);
  const rightDepth = minDepth(root.right);

  return Math.min(leftDepth, rightDepth) + 1;
};
