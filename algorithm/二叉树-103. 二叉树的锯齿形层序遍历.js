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
var zigzagLevelOrder = function (root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const stack = [];
  let deep = 1;

  stack.push(root);
  while (stack.length > 0) {
    let temp = [];
    let n = stack.length;

    // 遍历每层
    for (let i = 0; i < n; i++) {
      // 从开头开始取
      const node = stack.shift();
      temp.push(node.val);

      // 记录下一层
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }

    // 根据层数进行锯齿操作
    if (deep % 2 === 0) {
      // 倒序
      res.push(temp.reverse());
    } else {
      res.push(temp);
    }

    deep++;
  }

  return res;
};
