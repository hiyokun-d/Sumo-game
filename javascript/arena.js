class Arena {
    constructor(x, y, size) {
        this.x = x;
        this.y = y
        this.size = size
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = "#c4a562"
        ctx.lineWidth = 10
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.stroke()
        ctx.closePath()
    }
}

export default Arena