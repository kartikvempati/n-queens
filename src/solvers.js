/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(row, n, board, validator, callback) {
  if (row == n) {
    return callback();
  }
  for(var col = 0; col < n; col++) {
    board.togglePiece(row, col);
    if(!board[validator]()) {
      var result = findSolution(row+1, n, board, validator, callback);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, col);
  }
}; 



window.findNRooksSolution = function(n) {
  var solution = []; 
  var board = new Board({n:n});
  var boardMatrix = board.rows();
  var count = 0;

  var recurse = function(row) {
    if (row === n) {
      for (var i = 0; i < boardMatrix.length; i++) {
        solution.push(board.get(i).slice());
      }
    }
    else {
        for (var col = 0; col < boardMatrix.length; col++) {
          if(boardMatrix[row][col] !==1){
            board.togglePiece(row, col);
          }
          if(!board.hasAnyRooksConflicts()) {
            recurse(++row);
          }
          if ( row < n){
            board.togglePiece(row,col);
          }
        }
    }
  }
  recurse(0);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});

  findSolution(0,n,board,"hasAnyRooksConflicts", function(){
    solutionCount++;
  });

  // var recurse = function(row) {

  //   if (row === n) {
  //     return solutionCount++;
  //   }
  //   // else {
  //       for (var col = 0; col < n; col++) {
  //         board.togglePiece(row, col);
  //         if(!board.hasAnyRooksConflicts()) {
  //           recurse(++row);
  //         }
  //         board.togglePiece(row,col);
  //         // tboard.togglePiece(row,col);
  //       // }
  //   }
  // }

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //console.log(solution, "TEST");
  //solutionCount = solution.length;
  console.log(solutionCount);
  // recurse(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var solutionCount = 0; //fixme

  var board = new Board({n:n});
  var boardMatrix = board.rows();

  var recurse = function(row) {
    if (row === n) {
      solution = [];
      for (var i = 0; i < boardMatrix.length; i++) {
        solution.push(board.get(i).slice());
      }
    }
    else {
        for (var col = 0; col < boardMatrix.length; col++) {
          board.togglePiece(row, col);
          if(!board.hasAnyQueensConflicts()) {

            recurse(row+1, board);
          }
          if ( row <= n){
            board.togglePiece(row,col);
          }
        }
    }
  }

  recurse(0,board);

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if(solution.length === 0) {
    if (n === 2) {
      var edgeBoard = new Board({n:2});
      for (var i = 0; i < n; i++) {
        solution = edgeBoard.get(i).slice();
      } 
    }
    if (n === 3) {
      var edgeBoard = new Board({n:3});
      for (var i = 0; i < n; i++) {
        solution = edgeBoard.get(i).slice();
      }
    }
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  findSolution(0,n,board, "hasAnyQueensConflicts", function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
