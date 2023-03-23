import Arena from "./javascript/arena.js"
import Player from "./javascript/player.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

const player1 = new Player(canvas, {
    color: "white",
    player: "player 1"
})

const player2 = new Player(canvas, {
    color: "red",
    startPosition: -30,
    player: "player 2"
})

const arena = new Arena(
    canvas.width * 2 - 50,
    canvas.height * 2 + 30,
    250,
)

function game() {
    // requestAnimationFrame(game)
    canvas.width = innerWidth
    canvas.height = innerHeight

    //background
    ctx.fillStyle = "#f7d07c"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //*draw arena
    arena.draw(ctx)

    //*draw the player
    player1.draw(ctx)
    player2.draw(ctx)

    //*move the player
    player2.movement()
    player1.movement()

    if(!player1.collision(arena)) {
       alert("player 1 has been kick out of the circle, PLAYER 2 WIN!")
       cancelAnimationFrame(game)
       location.reload()
    }else if(!player2.collision(arena)) {
        alert("player 2 has been kick out of the circle, PLAYER 1 WIN!")
        cancelAnimationFrame(game)
        location.reload()
    } else requestAnimationFrame(game)
    
    //*force the player
    player2.forceOtherObject(player1, 5)
    player1.forceOtherObject(player2, 5)
}

game()