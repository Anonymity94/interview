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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) {
    return null;
  }

  // 从叶子节点开始反转
  const left = invertTree(root.left);
  const right = invertTree(root.right);

  // 最后交换第二层子树
  root.left = right;
  root.right = left;
  return root;
};
