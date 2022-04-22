/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // 当前能跳到的最大下标
  let cover = 0;
  for (let i = 0; i <= cover; i++) {
    console.log('cover', cover);
    console.log('i', i);
    // i + num[i] 是下一次最远可达的位置
    cover = Math.max(cover, i + nums[i]);
    if (cover >= nums.length - 1) {
      return true;
    }
  }

  return false;
};
