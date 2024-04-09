'use strict';

const assert = require('assert');
const { get } = require('http');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing? 
// **** It's displaying the current state of the three 'stack' elements in the array.

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// Next, what do you think this function should do? 
// **** movePiece should take the 'startStack' input, pop(s) the last element from it and push(es) that element to the stack identified in 'endStack'. So I define 'startStack' as the value of the last element of the array given at the "start stack:" prompt, and 'endStack' as the value of the last element of the array from "end stack:" prompt.

const movePiece = (startStack, endStack) => {
  // endStack.push(startStack.pop());
  // startStack.pop()
let stackA = stacks[startStack];
let stackB = stacks[endStack];
stackB.push(stackA.pop())

};

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2?
// *** yes, isLegal should run before the arrays are changed. since a block can't be moved onto a smaller block, it would define legality as if the last element in the startStack array (i.e., the block being moved) has a greater value than the last element in the endStack array, then it's not a legal move and it goes back to the beginning prompt. But if it's legal then it performs the 'movePiece' function from startStack to endStack.

const isLegal = (startStack, endStack) => {
  // if ((startStack.array.length - 1) > (endStack.array.length -1)) {
  //   console.log("that is not a legal move");
  //   getPrompt()
  //  } else {
  //   movePiece(startStack, endStack)
  //  } 

  
  let startArray = stacks[startStack];
  let endArray = stacks[endStack];
  if (endArray.length === 0 || startArray[startArray.length - 1] < endArray[endArray.length -1]) {
    return true
  } else {
    return false
  }

  };

  



// What is a win in Towers of Hanoi? When should this function run?
// **** checkForWin should run after movePiece function has been executed, and I'm defining it as if the length of stack a is 0 and the length of either b or c is also zero, then that's a win. If both ((a is zero) and ((b is zero) or (c is zero))) aren't true, then it will go back to the beginning prompt.


const checkForWin = () => {
  // if ((stacks.a.length === 0) && ((stacks.b.length === 0) || (stacks.c.length === 0))) {
  //   console.log("big win!") 
  // } else {
  //   getPrompt()
  // }

  if (stacks.b.length === 4 || stacks.c.length === 4) {
    console.log("You win!!");
    return true
  } else {
    return false
  }

};

// When is this function called? What should it do with its argument?
// *** towersOfHanoi is the boss function of the variables taken by getPrompt (startStack, endStack). it will execute first the function isLegal to make sure the move CAN be made; then startStack and endStack go to movePiece to modify the arrays; then it checks the resulting array to see if it meets the win conditions. If it's a legal move, the arrays have been modified, and it's NOT a win, then it gives the prompt again.

// *** So I define 'startStack' as the value of the last element of the array given at the "start stack:" prompt, and 'endStack' as the value of the last element of the array from "end stack:" prompt.
// *** but it turns out redefining startStack & endStack was wrong and unneccessary.

const towersOfHanoi = (startStack, endStack) => {
  // let startStack = stacks.startStack;
  // let endStack = stacks.endStack;

  
  // *** the following works, but it breaks if anything but lowercase a, b, or c is entered. so added the above bit.
  

  // if !((startStack || endStack) === (a || b || c)) 



  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  } else {
    console.log("Nope, that's an illegal move. Try again.")
  }
  

};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
