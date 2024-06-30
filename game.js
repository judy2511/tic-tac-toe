var currentPlayer = 'X';
  var board = ['', '', '', '', '', '', '', '', ''];
  var gameActive = true;
  var playerXScore = 0;
  var playerOScore = 0;
  var playWithComputer;

  function createBoard() {
    var boardElement = document.getElementById('board');
    for (var i = 0; i < 9; i++) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
      playWithComputer = document.getElementById("chec").checked ;
  console.log(playWithComputer);
    }
  }

  function handleCellClick(event) {
    var index = event.target.dataset.index;

    if (board[index] === '' && gameActive) {
      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkForWinner();
      if (gameActive && playWithComputer && currentPlayer === 'X') {
        togglePlayer();
       
        computerMove();
      } 
      else{
        togglePlayer();
      }
       
      
    }
  }

  function checkForWinner() {
    var winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (var pattern of winPatterns) {
      var [a, b, c] = pattern;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        displayWinner();
        updateScore();
        return;
      }
    }

    if (!board.includes('')) {
      displayDraw();
    }
  }

  function displayWinner() {
    var messageElement = document.getElementById('message');
    messageElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;

    startConfetti();
  }

  function displayDraw() {
    var messageElement = document.getElementById('message');
    messageElement.textContent = 'It\'s a draw!';
    gameActive = false;
  }

  function updateScore() {
    if (currentPlayer === 'X') {
      playerXScore++;
      document.getElementById('playerXScore').textContent = ` X: ${playerXScore}`;
    } else {
      playerOScore++;
      document.getElementById('playerOScore').textContent = ` O: ${playerOScore}`;
    }
    if(playerXScore>playerOScore){
      document.getElementById('playerXScore').style.color = "green";
      document.getElementById('playerOScore').style.color = "red";
    }
    else {
      document.getElementById('playerOScore').style.color = "green";
      document.getElementById('playerXScore').style.color = "red";
      }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
  }

  function computerMove() {
    function findBestMove(board, player) {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      // Check for a win or block move
      for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] === player && board[a] === board[b] && board[c] === '') return c;
        if (board[a] === player && board[a] === board[c] && board[b] === '') return b;
        if (board[b] === player && board[b] === board[c] && board[a] === '') return a;
      }
  
      // Take the center if available
      if (board[4] === '') return 4;
  
      // Take a corner if available
      const corners = [0, 2, 6, 8];
      for (let corner of corners) {
        if (board[corner] === '') return corner;
      }
  
      // Take any empty cell
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') return i;
      }
  
      return -1;
    }
  
    if (gameActive) {
      let bestMove = findBestMove(board, currentPlayer);
      if (bestMove !== -1) {
        board[bestMove] = currentPlayer;
        document.querySelector(`[data-index='${bestMove}']`).textContent = currentPlayer;
        checkForWinner();
        if (gameActive) {
          togglePlayer();
        }
      }
    }
  }
  
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
      cell.textContent = '';
    });

    var messageElement = document.getElementById('message');
    messageElement.textContent = '';

    currentPlayer = 'X';
    
    stopConfetti();
     playWithComputer = document.getElementById("chec").checked ;
  console.log(playWithComputer);
  }
  
  createBoard();