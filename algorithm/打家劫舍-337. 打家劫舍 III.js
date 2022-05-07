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
var rob = function (root) {
  if (root === null) {
    return 0;
  }
  let cache = new Map();
  /**
   * @param {TreeNode} node
   * @param {Map} cache
   * @return {number}
   */
  const doRob = function (node) {
    if (!node) {
      return 0;
    }
    if (cache.has(node)) {
      return cache.get(node);
    }

    // 搞这个，然后去下下层
    let robThis = node.val;
    if (node.left) {
      robThis += doRob(node.left.left) + doRob(node.left.right);
    }
    if (node.right) {
      robThis += doRob(node.right.left) + doRob(node.right.right);
    }
    // 不搞这个，直接去下家
    let notGetThis = doRob(node.left) + doRob(node.right);
    const res = Math.max(robThis, notGetThis);
    cache.set(node, res);

    return res;
  };

  return doRob(root, cache);
};
