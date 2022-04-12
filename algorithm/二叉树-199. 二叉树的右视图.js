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
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (root === null) {
    return [];
  }

  // 层序遍历，取每层的最后一个值
  let res = [];
  let stack = [];

  stack.push(root);

  while (stack.length > 0) {
    const temp = [];
    const n = stack.length;
    for (let i = 0; i < n; i++) {
      // 从第一个开始弹出
      const node = stack.shift();
      temp.push(node.val);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }

    // 每层都取最后一个值
    res.push(temp.at(-1));
  }

  return res;
};
