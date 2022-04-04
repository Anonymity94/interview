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
var sumNumbers = function (root) {
  // 所有路径之和
  const result = [];
  const track = [root.val];

  /**
   * @param {*} node 当前节点
   * @param {*} sum 已经选择所有节点的总和
   * @returns
   */
  var traversal = function (node, track, sum) {
    // 到达叶子节点，记录路径
    if (node.left === null && node.right === null) {
      result.push([...track]);
    }
    // 存在左分支
    if (node.left) {
      track.push(node.left.val);
      traversal(node.left, track);
      // 回溯撤销结果
      track.pop();
    }
    if (node.right) {
      track.push(node.right.val);
      traversal(node.right, track);
      // 回溯撤销结果
      track.pop();
    }
  };

  traversal(root, track, root.val);

  // 计算所有路径之和
  return result
    .map((el) => el.join(''))
    .reduce((prev, item) => prev + Number(item), 0);
};
