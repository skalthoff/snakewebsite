document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("snakeGame");
    const context = canvas.getContext("2d");


    const gridSize = 30;
    const blockSize = 20;
    const canvasSize = gridSize * blockSize;
    const frameRate = 1;
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    let foods = [];
    let snake = [{ x: 0, y: 0 }];
    let direction = { x: 1, y: 0 };
    let intervalId = null;
    
    function gameLoop() {
      update();
      draw();
    }
    
    intervalId = setInterval(gameLoop, frameRate);
    function update() {
        const head = {
          x: snake[0].x + direction.x,
          y: snake[0].y + direction.y,
        };
      
        const foodIndex = foods.findIndex((food) => head.x === food.x && head.y === food.y);
      
        if (foodIndex !== -1) {
          foods.splice(foodIndex, 1);
          placeFoods();
        } else {
          snake.pop();
        }
      
        snake.unshift(head);
    }
    function draw() {
        context.fillStyle = "#333";
        context.fillRect(0, 0, canvasSize, canvasSize);
      
        context.fillStyle = "lime";
        snake.forEach((segment) => {
          context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
        });
      
        context.fillStyle = "red";
        foods.forEach((food) => {
          context.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
        });
      }
      
      function hamiltonianPath(snakeHead) {
        const path = [];
      
        for (let y = 0; y < gridSize; y++) {
          if (y % 2 === 0) {
            for (let x = 0; x < gridSize; x++) {
              path.push({ x, y });
            }
          } else {
            for (let x = gridSize - 1; x >= 0; x--) {
              path.push({ x, y });
            }
          }
        }
      
        const currentIndex = path.findIndex((point) => point.x === snakeHead.x && point.y === snakeHead.y);
        const nextIndex = (currentIndex + 1) % path.length;
      
        return {
          x: path[nextIndex].x - snakeHead.x,
          y: path[nextIndex].y - snakeHead.y,
        };
      }
      
      function updateDirection() {
        direction = hamiltonianPath(snake[0]);
      }
      
      setInterval(updateDirection, frameRate);
      
      
        
      function updateDirection() {
        direction = hamiltonianPath(snake[0]);
    }
      
    setInterval(updateDirection, frameRate);
    function placeFoods() {
        while (foods.length < 5) {
          let validPosition = true;
          const newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          };
      
          for (const segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
              validPosition = false;
              break;
            }
          }
      
          if (validPosition) {
            foods.push(newFood);
          }
        }
      }
      
      placeFoods();
      
            
});
