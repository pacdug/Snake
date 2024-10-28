const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // Lấy ngữ cảnh 2D để vẽ trên canvas.
const gridSize = 20;
let snake = new Snake();
let food = createVector(Math.floor(
    Math.random() * (canvas.width / gridSize)) * gridSize,
    // Tạo ra một số thập phân ngẫu nhiên trong khoảng từ 0 đến số ô lưới theo chiều rộng của canvas .
    Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && snake.direction.y !== 1) snake.changeDirection(0, -1);
    if (event.key === 'ArrowDown' && snake.direction.y !== -1) snake.changeDirection(0, 1);
    if (event.key === 'ArrowLeft' && snake.direction.x !== 1) snake.changeDirection(-1, 0);
    if (event.key === 'ArrowRight' && snake.direction.x !== -1) snake.changeDirection(1, 0);
});
//document.addEventListener : Lắng nghe sự kiện nhấn phím trên toàn bộ tài liệu.
//function(event): Hàm xử lý sự kiện được gọi khi một phím được nhấn. Đối tượng event chứa thông tin về sự kiện nhấn phím.

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //clearRect() của đối tượng CanvasRenderingContext2D (ctx) để xóa một vùng hình chữ nhật trên canvas, làm cho khu vực này trở nên trong suốt và loại bỏ tất cả nội dung bên trong nó.

    snake.move(gridSize);
    if (snake.eat(food)) {
        food = createVector(Math.floor(
            Math.random() * (canvas.width / gridSize)) * gridSize,
            Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    }
    snake.show(ctx, gridSize);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // kiểm tra rắn va vào chướng ngoại vật hoặc tự cắn .
    if (snake.checkCollision(canvas.width, canvas.height)) {
        clearInterval(gameLoop); // ngăn chặn rắn tiếp tục chạy
        alert("Game Over!");
        document.getElementById('restartButton').style.display = 'block';
        //thay đổi thuốc tính display của phần tử này thành block , làm cho nút chơi lại hiện thị lên màn hình của ng dùng .
    }
}

// thiết lập lại trò chơi .
function resetGame() {
    snake = new Snake();
    food = createVector(Math.floor(
        Math.random() * (canvas.width / gridSize)) * gridSize,
        Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize);
    document.getElementById('restartButton').style.display = 'none';
    // ẩn nút chơi lại.
    gameLoop = setInterval(draw, 100);
}

let gameLoop = setInterval(draw, 100);
// Khởi tạo vòng lặp trò chơi ngay khi mã được tải lên. Thiết lập để gọi hàm draw mỗi 100ms, tạo hiệu ứng vẽ liên tục để cập nhật trò chơi.


