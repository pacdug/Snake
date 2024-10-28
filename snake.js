class Snake {
    constructor() {
        this.body = [createVector(0, 0)];
        this.direction = createVector(1, 0);
        this.length = 1;
    }

    show(ctx, gridSize) {
        ctx.fillStyle = "green";
        for (let part of this.body) {
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
        }
    }

    move(gridSize) {
        let newHead = createVector(
            this.body[0].x + this.direction.x * gridSize,
            this.body[0].y + this.direction.y * gridSize);
        this.body.unshift(newHead);
        if (this.body.length > this.length) {
            this.body.pop();
        }
    }

    changeDirection(x, y) {
        this.direction = createVector(x, y);
    }

    eat(food) {
        if (dist(this.body[0].x, this.body[0].y, food.x, food.y) < 1) {
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

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
