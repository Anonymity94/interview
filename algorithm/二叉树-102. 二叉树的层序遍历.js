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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }

  let res = [];
  let stack = [];
  stack.push(root);

  while (stack.length > 0) {
    let temp = [];
    let n = stack.length;
    for (let i = 0; i < n; i++) {
      // 删除第一个节点
      const node = stack.shift();
      // 记录节点值
      temp.push(node.val);
      // 添加新的元素
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }
    // 记录这一层的值
    res.push(temp);
  }

  return res;
};
