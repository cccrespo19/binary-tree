const node = (data) => {
  return {
    data,
    left: null,
    right: null,
  };
};

const tree = (arr) => {
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    let newNode = node(arr[mid]);
    newNode.left = buildTree(arr, start, mid - 1);
    newNode.right = buildTree(arr, mid + 1, end);

    return newNode;
  };

  return {
    root: buildTree(arr.sort((a, b) => a - b)),
    insert(value, currentNode = this.root) {
      if (value < currentNode.data && currentNode.left === null) {
        currentNode.left = node(value);
        return;
      } else if (value >= currentNode.data && currentNode.right === null) {
        currentNode.right = node(value);
        return;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left;
        return this.insert(value, currentNode);
      } else {
        currentNode = currentNode.right;
        return this.insert(value, currentNode);
      }
    },
    delete(value) {
      let currentNode = this.root;
      let prevNode = null;
      let direction = '';

      while (value !== currentNode.data) {
        prevNode = currentNode;
        if (value < currentNode.data) {
          direction = 'left';
          currentNode = currentNode.left;
        } else {
          direction = 'right';
          currentNode = currentNode.right;
        }
      }

      if (currentNode.left === null && currentNode.right === null) {
        if (direction === 'left') {
          prevNode.left = null;
          return;
        } else if (direction === 'right') {
          prevNode.right = null;
          return;
        }
      }

      if (currentNode.left === null || currentNode.right === null) {
        if (currentNode.left !== null) {
          if (direction === 'left') {
            prevNode.left = currentNode.left;
            return;
          } else if (direction === 'right') {
            prevNode.right = currentNode.left;
            return;
          }
        } else {
          if (direction === 'left') {
            prevNode.left = currentNode.right;
            return;
          } else if (direction === 'right') {
            prevNode.right = currentNode.right;
            return;
          }
        }
      }

      if (currentNode.left !== null && currentNode.right !== null) {
        let successor = null;
        let nodeToBeReplaced = currentNode;
        prevNode = currentNode;
        currentNode = currentNode.right;
        direction = 'right';
        while (currentNode.left !== null && currentNode.right !== null) {
          prevNode = currentNode;
          direction = 'left';
          currentNode = currentNode.left;
        }
        successor = currentNode.data;
        nodeToBeReplaced.data = successor;
        if (direction === 'left') {
          prevNode.left = null;
          return;
        } else if (direction === 'right') {
          prevNode.right = null;
          return;
        }
      }
    },
    find(value) {
      let currentNode = this.root;
      while (value !== currentNode.data) {
        if (value < currentNode.data) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      };
      return currentNode;
    },
    levelOrder(fn) {
      let queue = [];
      let output = [];
      let currentNode = this.root;
      output.push(currentNode.data);
      queue.push(currentNode.left, currentNode.right);
      while (queue.length !== 0) {
        currentNode = queue.shift();
        output.push(currentNode.data);
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
      if (!fn) {
        return output;
      } else {
        fn(...output);
      }
    },
    preorder(fn) {
      let currentNode = this.root;
      let output = [];

      const preorderTraversal = (node) => {
        if (node === null) {
          return;
        }
        output.push(node.data);
        preorderTraversal(node.left);
        preorderTraversal(node.right);
      }
      
      preorderTraversal(currentNode);
      if (!fn) {
        return output;
      } else {
        return fn(...output);
      }
    },
    inorder(fn) {
      let currentNode = this.root;
      let output = [];

      const inorderTraversal = (node) => {
        if (node === null) {
          return;
        }
        inorderTraversal(node.left);
        output.push(node.data);
        inorderTraversal(node.right);
      }
      
      inorderTraversal(currentNode);
      if (!fn) {
        return output;
      } else {
        return fn(...output);
      }
    },
    postorder(fn) {
      let currentNode = this.root;
      let output = [];

      const postorderTraversal = (node) => {
        if (node === null) {
          return;
        }
        postorderTraversal(node.left);
        postorderTraversal(node.right);
        output.push(node.data);
      }
      
      postorderTraversal(currentNode);
      if (!fn) {
        return output;
      } else {
        return fn(...output);
      }
    },
    height(node) {
      let currentNodeLeft = node;
      let leftHeight = 0;
      let currentNodeRight = node;
      let rightHeight = 0;
      while (currentNodeLeft.left !== null) {
        leftHeight += 1;
        currentNodeLeft = currentNodeLeft.left;
      };
      while (currentNodeRight.right !== null) {
        rightHeight += 1;
        currentNodeRight = currentNodeRight.right;
      }
      return (leftHeight >= rightHeight) ? leftHeight : rightHeight;
    },
    depth(node) {
      let currentNode = this.root;
      let depth = 0;
      let value = node.data;
      while (value !== currentNode.data) {
        if (value < currentNode.data) {
          currentNode = currentNode.left;
          depth += 1;
        } else {
          currentNode = currentNode.right;
          depth += 1;
        }
      };
      return depth;
    },
    
  };
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const testTree = tree(testArr);
console.log(testTree);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
prettyPrint(testTree.root);
console.log(testTree.root.left);
// testTree.insert(2);
// testTree.delete(7);
prettyPrint(testTree.root);
// prettyPrint(testTree.find(4));
console.log(testTree.levelOrder());
console.log((testTree.inorder()));
console.log(testTree.preorder());
console.log(testTree.postorder());
console.log(testTree.height(testTree.find(7)));
console.log(testTree.depth(testTree.find(4)))