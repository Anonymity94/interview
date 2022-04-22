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
var findBottomLeftValue = function (root) {
  const result = [];
  // 每层的节点
  const stack = [root];

  while (stack.length) {
    const length = stack.length;
    // 记录当前层
    const temp = [];
    for (let i = 0; i < length; i++) {
      const node = stack.shift();

      // 记录当前层的节点
      temp.push(node.val);

      // 记录下一层
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }

    result.push(temp);
  }

  return result.at(-1)[0];
};
