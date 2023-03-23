class Player {

    /**
     * 
     * @param {canvasHTMLelement} canvas 
     * @param {gameObjectSettings}
     */
    constructor(canvas, { color, startPosition, player, size }) {
        this.size = size || 30
        this.startPosition = startPosition || 130
        this.x = canvas.width * 2 - this.startPosition;
        this.y = canvas.height * 2 + this.size;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.canvas = canvas

        if (!canvas) {
            throw new Error("canvas is can't be found pls put the canvas element into player element because it's need to be center")
        }

        this.player = player
        this.color = color || "white"

        if (player == "player 1") {
            document.addEventListener("keydown", this.handlePlayer1KeyDown.bind(this));
            document.addEventListener("keyup", this.handlePlayer1KeyUp.bind(this));
        }

        if (player == "player 2") {
            document.addEventListener("keydown", this.handlePlayer2KeyDown.bind(this));
            document.addEventListener("keyup", this.handlePlayer2KeyUp.bind(this));
        }

        this.direction = {
            left: false,
            right: false,
            up: false,
            down: false
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        } else {
            console.warn("player didn't have canvas context element");
        }
    }

    movement() {
        // Update position based on velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Apply friction to slow down movement
        this.velocity.x *= 0.9;
        this.velocity.y *= 0.9;

        // Ensure player stays within bounds of canvas
        if (this.x > this.canvas.width - this.size) {
            this.x = this.canvas.width - this.size;
        } else if (this.x < this.size) {
            this.x = this.size;
        }
        if (this.y > this.canvas.height - this.size) {
            this.y = this.canvas.height - this.size;
        } else if (this.y < this.size) {
            this.y = this.size;
        }

        //apply the speed to move the player
        if (this.direction.left) {
            this.velocity.x -= 0.95;
        }
        if (this.direction.right) {
            this.velocity.x += 0.95;
        }
        if (this.direction.up) {
            this.velocity.y -= 0.95;
        }
        if (this.direction.down) {
            this.velocity.y += 0.95;
        }
    }

    /**
     * 
     * @param {Event} event 
     */
    // Player 1 controls
    handlePlayer1KeyDown(event) {
        switch (event.keyCode) {
            case 87:
                this.direction.up = true;
                break;
            case 65:
                this.direction.left = true;
                break;
            case 83:
                this.direction.down = true;
                break;
            case 68:
                this.direction.right = true;
                break;
        }
    }

    /**
     * 
     * @param {Event} event 
     */
    handlePlayer1KeyUp(event) {
        switch (event.keyCode) {
            case 87:
                this.direction.up = false;
                break;
            case 65:
                this.direction.left = false;
                break;
            case 83:
                this.direction.down = false;
                break;
            case 68:
                this.direction.right = false;
                break;
        }
    }

    // Player 2 controls
    /**
     * 
     * @param {Event} event 
     */
    handlePlayer2KeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                this.direction.up = true;
                break;
            case "ArrowLeft":
                this.direction.left = true;
                break;
            case "ArrowDown":
                this.direction.down = true;
                break;
            case "ArrowRight":
                this.direction.right = true;
                break;
        }
    }

    /**
     * 
     * @param {Event} event 
     */
    handlePlayer2KeyUp(event) {
        switch (event.key) {
            case "ArrowUp":
                this.direction.up = false;
                break;
            case "ArrowLeft":
                this.direction.left = false;
                break;
            case "ArrowDown":
                this.direction.down = false;
                break;
            case "ArrowRight":
                this.direction.right = false;
                break;
        }
    }

    /**
     * 
     * @param {gameObject} otherObject 
     * @returns true
     */
    collision(otherObject) {
        if (otherObject) {
            const dx = this.x - otherObject.x;
            const dy = this.y - otherObject.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= this.size + otherObject.size;
        } else {
            throw new ReferenceError("you didn't add any object to collide with")
        }
    }

    /**
     * 
     * @param {gameObject} otherObject 
     */
    forceOtherObject(otherObject, force, objectMass = 5) {
        //! const distance = Math.sqrt((this.x - otherObject.x) ** 2 + (this.y - otherObject.y) ** 2)
        const velocity = force / objectMass
        const angle = Math.atan2(otherObject.y - this.y, otherObject.x - this.x)
        const velocityX = velocity * Math.cos(angle)
        const velocityY = velocity * Math.sin(angle)
        
        if(!otherObject) throw new Error("can't find other object that can be force")
        if(otherObject && !otherObject.velocity) throw new Error("the object didn't have velocity or you make a new object but it's not have this `velocity.x`")
        
        if (this.collision(otherObject) && this.player == "player 1") {
          otherObject.velocity.x += velocityX
          otherObject.velocity.y += velocityY
        }
        
        if (this.collision(otherObject) && this.player == "player 2") {
            otherObject.velocity.x += velocityX
            otherObject.velocity.y += velocityY
          }
    }
}

export default Player;