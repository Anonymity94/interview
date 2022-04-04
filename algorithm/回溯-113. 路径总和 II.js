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
var pathSum = function (root, targetSum) {
  const result = [];
  if (root === null) {
    return result;
  }

  const track = [root.val];

  /**
   * @param {*} node 当前节点
   * @param {*} sum 已经选择所有节点的总和
   * @returns
   */
  var traversal = function (node, track, sum) {
    console.log(node);
    console.log('sum', sum);
    // 到达叶子节点 并且总和就是目标值，返回ture
    if (node.left === null && node.right === null && sum === targetSum) {
      result.push([...track]);
    }
    // 到达叶子节点，返回false
    if (node.left === null && node.right === null) {
      return;
    }
    // 存在左分支
    if (node.left) {
      track.push(node.left.val);
      traversal(node.left, track, sum + node.left.val);
      // 回溯撤销结果
      track.pop();
    }
    if (node.right) {
      track.push(node.right.val);
      traversal(node.right, track, sum + node.right.val);
      track.pop();
    }
  };

  traversal(root, track, root.val);

  return result;
};
