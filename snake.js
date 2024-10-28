class Snake {
    constructor() {
        this.body = [createVector(0, 0)];
        this.direction = createVector(0, 1);
        // Di chuyển sang phải ban đầu
        // Hàm createVector() thường được sử dụng trong ngữ cảnh của các bài toán đồ họa hoặc lập trình vector, đặc biệt là trong thư viện P5.js. Hàm này tạo ra một đối tượng vector với các thuộc tính x và y. Nếu bạn đang làm việc trong ngữ cảnh cụ thể của một thư viện hay framework.
        this.length = 1;
    }

    show(ctx , gridSize) {
        ctx.fillStyle = "green";
        // fillStyle là thuộc tính trong JavaScript được sử dụng để xác định màu hoặc mẫu sẽ được sử dụng để tô màu các hình vẽ trên canvas .
        for (let part of this.body) { //được dùng để duyệt qua từng phần tử của mảng this.body . Đây là một cú pháp đặc biệt của vòng lặp for...of .
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
            //fillRect() là một phương thức trong JavaScript dùng để vẽ một hình chữ nhật được tô màu trên canvas. Phương thức này thuộc về đối tượng .(tọa độ góc x , toạ độ góc y , chiều rộng , chiều cao).
        }
    }

    move(gridSize) {
        let newHead = createVector(
            this.body[0].x + this.direction.x * gridSize,
            this.body[0].y + this.direction.y * gridSize);
        this.body.unshift(newHead);
        //unshift() là một phương thức trong JavaScript được sử dụng để thêm một hoặc nhiều phần tử vào đầu mảng và trả về độ dài mới của mảng .
        if (this.body.length > this.length) {
            this.body.pop();
        }
    }

    changeDirection(x, y) {
        this.direction = createVector(x, y);
    }
    // phương pháp thay đổi hướng con rắn bằng tọa độ x và y .

    eat(food) {
        if (dist(this.body[0].x, this.body[0].y, food.x, food.y) < 1) {
            // thẻ dist dùng để tính toán khoảng cách giữa 2 điểm trong không gian 2D (d = sqrt{(x1-x2)^2+(y1-y2)^2})
            this.length++;
            return true;
        }
        return false;
    }

    checkCollision(canvasWidth, canvasHeight) {
        let head = this.body[0];
        if (head.x < 0 || head.y < 0 || head.x >= canvasWidth || head.y >= canvasHeight) {
            return true;
        }
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }
}

function createVector(x, y) {
    return { x: x, y: y };
}

function dist(x1, y1,x2,y2)
{
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
