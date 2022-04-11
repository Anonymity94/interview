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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const res = [];

  /**
   * @param {TreeNode} node
   * @param {String} path
   */
  var getPath = function (node, path) {
    // 到达叶子节点
    if (node.left === null && node.right === null) {
      path += node.val;
      res.push(path);
      return;
    }

    path += node.val + '->';
    // 继续下一个
    if (node.left) {
      getPath(node.left, path);
    }
    if (node.right) {
      getPath(node.right, path);
    }
  };

  getPath(root, '');
  return res;
};

// https://programmercarl.com/0257.%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E6%89%80%E6%9C%89%E8%B7%AF%E5%BE%84.html
