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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root === null) {
    return false;
  }

  /**
   * @param {*} node 当前节点
   * @param {*} sum 已经选择所有节点的总和
   * @returns
   */
  var traversal = function (node, sum) {
    console.log(node);
    console.log('sum', sum);
    // 到达叶子节点 并且总和就是目标值，返回ture
    if (node.left === null && node.right === null && sum === targetSum) {
      return true;
    }
    // 到达叶子节点，返回false
    if (node.left === null && node.right === null) {
      return false;
    }
    // 存在左分支
    if (node.left) {
      sum += node.left.val;
      if (traversal(node.left, sum)) {
        return true;
      }
      // 回溯撤销结果
      sum -= node.left.val;
    }
    if (node.right) {
      sum += node.right.val;
      if (traversal(node.right, sum)) {
        return true;
      }
      // 回溯撤销结果
      sum -= node.right.val;
    }

    return false;
  };

  return traversal(root, root.val);
};
