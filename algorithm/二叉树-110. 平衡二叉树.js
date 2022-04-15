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
 * @return {boolean}
 */
var isBalanced = function (root) {
  return isBST(root).isBST;
};

/**
 * @param {TreeNode} node
 * @return {boolean}
 */
var isBST = (node) => {
  // 到达叶子节点
  if (node === null) {
    return {
      deep: 0,
      isBST: true,
    };
  }

  const left = isBST(node.left);
  const right = isBST(node.right);

  //  如果左、右中有一个不平衡，那就是不平衡
  if (!left.isBST || !right.isBST) {
    return {
      deep: 0,
      isBST: false,
    };
  }

  // 比较下高度差
  if (Math.abs(left.deep - right.deep) > 1) {
    return {
      deep: 0,
      isBST: false,
    };
  }

  // 平衡了
  return {
    deep: Math.max(left.deep, right.deep) + 1,
    isBST: true,
  };
};

// https://lyl0724.github.io/2020/01/25/1/#vcomment