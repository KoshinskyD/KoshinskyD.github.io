/*
function lucky13(nums) {
  for (let i = 0; i < nums.lenght; i++) {
    console.log(nums[i]);
    if (nums[i] === 1 || nums[i] === 3) {
      return true;
    }
  }
  return false;
}
*/

/*
function has22(nums){
  let x;
  for(let i = 0; i < nums.length; i++) {
    if (nums[i] === 2) {
      x++;
    }
    else {
      x = 0;
    }
    if(x === 2) {
      return true;
    }
  }
}
*/

/*
function has22(nums){
  for(let i = 1; i < nums.length; i++) {
    if (nums[i] === 2 && nums[i-1] === 2) {
      return true;
    }
  }
  return false;
}
*/

/*
function countEven(nums) {
  let x = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]%2 === 0) {
      x++;
    }
  }
  return x;
}
*/

/*
function makeMiddle(nums){
  return [nums[nums.length/2 - 1], nums[nums.length/2]];
}
*/

/*
function midThree(nums){
  return [nums[Math.floor(nums.length/2)-1], nums[Math.floor(nums.length/2)], nums[Math.floor(nums.length/2)+1]];
}
*/

