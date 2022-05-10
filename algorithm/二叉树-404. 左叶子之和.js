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
var sumOfLeftLeaves = function (root) {
  let ans = 0;
  const list = [root];

  // 层序遍历
  while (list.length > 0) {
    const n = list.length;
    for (let i = 0; i < n; i++) {
      const node = list.shift();
      if (node.left) {
        list.push(node.left);
        if (!node.left.left && !node.left.right) {
          ans += node.left.val;
        }
      }
      if (node.right) {
        list.push(node.right);
      }
    }
  }

  return ans;
};
