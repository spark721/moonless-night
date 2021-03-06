
const chatText = document.getElementById("chat-text")
const chatInput = document.getElementById("chat-input")
const chatForm = document.getElementById("chat-form")
const logImage = new Image();
logImage.src = '/client/images/logs/spr_log_0.png'
const torchImage = new Image();
torchImage.src = '/client/images/fire/fire_medium_sprites.png'

const ctx = document.getElementById('ctx').getContext('2d');
ctx.font = '20px Arial';

ctx.fillStyle = "#FFFFFF";

const socket = io();

socket.on('pack', data => {
    // clear canvas
    ctx.clearRect(0, 0, 1400, 788);
    for (let i = 0; i < data.player.length; i++) {
        // ctx.fillText(data.player[i].state, 100, 100)
        // ctx.beginPath();
        // ctx.arc(data.player[i].x, data.player[i].y, data.player[i].size, 0, 2 * Math.PI);
        // ctx.stroke();

        if (data.player[i].pressingRight && data.player[i].state !== "FETAL") drawWalkRight(data.player[i].x - 17, data.player[i].y - 55)
        if (data.player[i].pressingLeft && data.player[i].state !== "FETAL") drawWalkLeft(data.player[i].x - 17, data.player[i].y - 55)
        if (data.player[i].pressingUp && data.player[i].state !== "FETAL") drawWalkUp(data.player[i].x - 17, data.player[i].y - 55)
        if (data.player[i].pressingDown && data.player[i].state !== "FETAL") drawWalkDown(data.player[i].x - 17, data.player[i].y - 55)
        if (data.player[i].state === "FETAL") drawFetal(data.player[i].x - 17, data.player[i].y - 55)

        if (
            !data.player[i].pressingDown &&
            !data.player[i].pressingUp &&
            !data.player[i].pressingLeft &&
            !data.player[i].pressingRight &&
            data.player[i].state !== "FETAL") {
            drawPlayerIdle(data.player[i].x - 17, data.player[i].y - 55)
        }

        // TORCH RENDERING

        if (data.player[i].state === "TORCH") lowFireDraw(data.player[i].x - 80, data.player[i].y - 110)

        if (data.player[i].state === "LOGS") ctx.drawImage(logImage, 0, 0, 50, 50, data.player[i].x - 10, data.player[i].y - 25, 64, 40)
    }
    // TEST






    // END TEST
    ctx.fillText(`${data.fire.firePower}`, 685, 460);


    // render trees
    for (let i = 0; i < data.tree.length; i++) {
        let tree = data.tree[i];

        if (tree.logs > 0) {
            const treeImage = new Image();
            treeImage.src = `/client/images/trees/${(tree.id % 4) + 1}${tree.logs}.png`;
            ctx.drawImage(treeImage, tree.x - 50 * (tree.logs / 6 + 0.5), tree.y - 175 * (tree.logs / 6 + 0.5), 100 * (tree.logs / 6 + 0.5), 200 * (tree.logs / 6 + 0.5));
        }
    }

    //specter
    for (let i = 0; i < data.specter.length; i++) {
        ctx.fillStyle = "#3370d4";
        ctx.beginPath();
        // ctx.arc(data.specter[i].x, data.specter[i].y, data.specter[i].size, 0, 2 * Math.PI);
        specterDrawImage(data.specter[i].x - 15, data.specter[i].y - 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();


    }
    //stalker
    for (let i = 0; i < data.stalker.length; i++) {
        ctx.fillStyle = "#c82124";
        ctx.beginPath();
        // ctx.arc(data.stalker[i].x, data.stalker[i].y, data.stalker[i].size, 0, 2 * Math.PI);
        stalkerDrawImage(data.stalker[i].x - 27, data.stalker[i].y - 35);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    //log
    for (let i = 0; i < data.log.length; i++) {
        // ctx.fillStyle = "brown";
        // ctx.beginPath();
        // ctx.arc(data.log[i].x, data.log[i].y, data.log[i].size, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();
        // ctx.stroke();  
        ctx.drawImage(logImage, 0, 0, 50, 50, data.log[i].x - 20, data.log[i].y - 10, 64, 40)

    }
    //torch
    for (let i = 0; i < data.torch.length; i++) {
        // ctx.fillStyle = "orange";
        // ctx.beginPath();
        // ctx.arc(data.torch[i].x, data.torch[i].y, data.torch[i].size, 0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();
        // ctx.stroke();  
        // ctx.drawImage(torchImage, 0, 0, 102, 205, data.torch[i].x - 20, data.torch[i].y - 10, 64, 40)
        lowFireDraw(data.torch[i].x - 60, data.torch[i].y - 120)
    }
    // ctx.fillStyle = "rgba(255, 255, 255, 0)";
    // console.log(data.fire.status)
    if (data.fire.status === "HIGH") {
        highFireDrawImage();
    } else if (data.fire.status === "MEDIUM") {
        medFireDrawImage();
    } else if (data.fire.status === "VERY LOW") {
        veryLowFireDrawImage();
    } else if (data.fire.status === "CRITICAL") {
        criticalFireDrawImage();
    } else {
        medFireDrawImage();
    }
    ctx.fillStyle = "#FFFFFF";



})

socket.on("addToChat", (data) => {
    chatText.innerHTML += '<div>' + data + '</div>';
});

chatForm.onsubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMsgToServer", chatInput.value);
    chatInput.value = "";
};


document.onkeydown = event => {
    if (event.keyCode === 68) socket.emit('keyPress', { inputId: 'right', state: true }); // d
    if (event.keyCode === 65) socket.emit('keyPress', { inputId: 'left', state: true }); // a
    if (event.keyCode === 87) socket.emit('keyPress', { inputId: 'up', state: true }); // w
    if (event.keyCode === 83) socket.emit('keyPress', { inputId: 'down', state: true }); // s
    if (event.keyCode === 69) socket.emit('keyPress', { inputId: 'chop', state: true }); // j
    if (event.keyCode === 81) socket.emit('keyPress', { inputId: 'drop', state: true }); // k
    if (event.keyCode === 82) socket.emit('keyPress', { inputId: 'heal', state: true }); // h
}

document.onkeyup = event => {
    if (event.keyCode === 68) socket.emit('keyPress', { inputId: 'right', state: false });
    if (event.keyCode === 65) socket.emit('keyPress', { inputId: 'left', state: false });
    if (event.keyCode === 87) socket.emit('keyPress', { inputId: 'up', state: false });
    if (event.keyCode === 83) socket.emit('keyPress', { inputId: 'down', state: false });
    if (event.keyCode === 69) socket.emit('keyPress', { inputId: 'chop', state: false });
    if (event.keyCode === 81) socket.emit('keyPress', { inputId: 'drop', state: false });
    if (event.keyCode === 82) socket.emit('keyPress', { inputId: 'heal', state: false });
}

socket.on("over", () => {
    document.getElementById('game-over').style.display = "block";
})

socket.on("win", () => {
    document.getElementById('winner').style.display = "block";
})

const off = () => {
    document.getElementById('game-over').style.display = "none";
}
const offwin = () => {
    document.getElementById('winner').style.display = "none";
}
