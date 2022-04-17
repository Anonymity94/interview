/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  return travelTree(root, p, q);
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var travelTree = function (node, p, q) {
  // 确定递归终止条件
  // 如果找到了 p 或 q，或已经到达叶子，返回
  if (node === null || node === p || node === q) {
    return node;
  }
  // 后续遍历
  // 单层递归逻辑
  const left = travelTree(node.left, p, q);
  const right = travelTree(node.right, p, q);

  // 说明 p q 分布在一左一右
  if (left !== null && right !== null) {
    return node;
  }
  // 说明 p q 都在右侧
  if (left === null) {
    return right;
  }
  // 说明 p q 都在左侧
  return left;
};
