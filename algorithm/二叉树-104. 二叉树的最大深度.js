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
 * @return {number}
 */
var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};

/**
 * 前序遍历
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }

  let result = 0;
  var getDepth = (node, deepth) => {
    result = Math.max(result, deepth);
    // 如果到达叶子节点，结束
    if (node.left === null && node.right === null) {
      return;
    }

    if (node.left) {
      getDepth(node.left, deepth + 1);
    }
    if (node.right) {
      getDepth(node.right, deepth + 1);
    }
  };

  getDepth(root, 1);

  return result;
};

// https://lyl0724.github.io/2020/01/25/1/#vcomment