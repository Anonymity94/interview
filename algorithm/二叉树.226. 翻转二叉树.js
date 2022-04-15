/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 方法一：递归
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

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 方法二：层序遍历
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  // 利用层序遍历
  const stack = [root];

  while (stack.length > 0) {
    const n = stack.length;
    for (let i = 0; i < n; i++) {
      const node = stack.pop();
      if (node === null) {
        continue;
      }
      // 交换左右节点
      const temp = node.left;
      node.left = node.right;
      node.right = temp;

      stack.push(node.left);
      stack.push(node.right);
    }
  }

  return root;
};
