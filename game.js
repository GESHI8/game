// 要素の取得
const character = document.querySelector(".character");
const gameContainer = document.querySelector(".game-container");
const ground = document.querySelector(".ground");
const ceiling = document.querySelector(".ceiling");
const obstacles = document.querySelectorAll(".obstacle");

// キャラクターの位置と速度の初期値
let characterX = 150;
let characterY = gameContainer.offsetHeight * 0.25;
let characterVelocityX = 0;
let characterVelocityY = 0;

// 重力、ジャンプ力、ジャンプのクールダウン
const gravity = 0.5;
const jumpStrength = 10;
const jumpCooldown = 180;

// キャラクターが移動できる範囲（地面と天井の間）
const mincharacterY = gameContainer.offsetHeight * 0.25;
const maxcharacterY = gameContainer.offsetHeight - character.offsetHeight;

// 入力管理
const keys = {};
let canJump = true;
let isJumping = false;

// キャラクターの画像を状態に応じて変更
function setcharacterImage(grounded, facingLeft) {
    if (grounded) {
        character.style.backgroundImage = `url('image/character.png')`;
    } else {
        character.style.backgroundImage = `url('image/characterj.png')`;
    }

    if (facingLeft) {
        character.style.transform = "scaleX(-1)";
    } else {
        character.style.transform = "scaleX(1)";
    }
}

// 初期状態の画像設定
setcharacterImage(true, false);

// キーが押されたときの処理
window.addEventListener("keydown", function (e) {
    keys[e.key] = true;

    // ジャンプ処理（w/s/↑/↓でジャンプ可能）
    if (e.key === "w" && canJump && !isJumping) {
        jump();
    }
    if (e.key === "s" && canJump && !isJumping) {
        jump();
    }
    if (e.key == 'ArrowUp' && canJump && !isJumping) {
        jump();
    }
    if (e.key == 'ArrowDown' && canJump && !isJumping) {
        jump();
    }
});

// キーが離されたときの処理
window.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

// ジャンプ処理
function jump() {
    characterVelocityY = jumpStrength;
    canJump = false;
    isJumping = true;
    setcharacterImage(false, characterVelocityX < 0);

    setTimeout(() => {
        canJump = true;
        isJumping = false;
        setcharacterImage(true, characterVelocityX < 0);
    }, jumpCooldown);
}

// 左移動
function moveLeft() {
    characterVelocityX = -5;
    setcharacterImage(characterY === mincharacterY, true);
}

// 右移動
function moveRight() {
    characterVelocityX = 5;
    setcharacterImage(characterY === mincharacterY, false);
}

// 停止
function stop() {
    characterVelocityX = 0;
}

// 地面との当たり判定
function checkGroundCollision() {
    if (characterY <= mincharacterY) {
        characterY = mincharacterY;
        characterVelocityY = 0;
        canJump = true;
        setcharacterImage(true, characterVelocityX < 0);
    }
}

// 天井との当たり判定
function checkCeilingCollision() {
    if (characterY >= maxcharacterY) {
        characterY = maxcharacterY;
        characterVelocityY = -characterVelocityY / 10;
    }
}

// 障害物の初期位置と速度設定
let obstacle1X = gameContainer.offsetWidth;
let obstacle1Speed = getRandomSpeed();

let obstacle2X = gameContainer.offsetWidth;
let obstacle2Speed = getRandomSpeed();

let obstacle3X = gameContainer.offsetWidth;
let obstacle3Speed = getRandomSpeed();

let obstacle4X = gameContainer.offsetWidth;
let obstacle4Speed = getRandomSpeed();

let obstacle5X = gameContainer.offsetWidth;
let obstacle5Speed = getRandomSpeed();

// 障害物を表示する関数
function showObstacle(obstacle, x, y, speed, image) {
    if (obstacle) {
        obstacle.style.display = "block";
        obstacle.style.left = x + "px";
        obstacle.style.top = y + "px";
        obstacle.style.backgroundImage = `url('${image}')`;
        obstacle.style.backgroundSize = "cover";
        obstacle.style.backgroundRepeat = "no-repeat";
        obstacle.style.backgroundPosition = "center";
    }
}

// ランダムな速度を生成
function getRandomSpeed() {
    return Math.floor(Math.random() * 15) + 5;
}

// 障害物の移動
function moveObstacles() {
    // 各障害物を左に移動し、画面外に出たら再出現させる
    if (obstacles[0]) {
        obstacle1X -= obstacle1Speed;
        obstacles[0].style.left = obstacle1X + "px";

        if (obstacle1X + obstacles[0].offsetWidth < 0) {
            obstacle1X = gameContainer.offsetWidth;
            obstacle1Speed = getRandomSpeed();
        }
    }

    if (obstacles[1]) {
        obstacle2X -= obstacle2Speed;
        obstacles[1].style.left = obstacle2X + "px";

        if (obstacle2X + obstacles[1].offsetWidth < 0) {
            obstacle2X = gameContainer.offsetWidth;
            obstacle2Speed = getRandomSpeed();
        }
    }

    if (obstacles[2]) {
        obstacle3X -= obstacle3Speed;
        obstacles[2].style.left = obstacle3X + "px";

        if (obstacle3X + obstacles[2].offsetWidth < 0) {
            obstacle3X = gameContainer.offsetWidth;
            obstacle3Speed = getRandomSpeed();
        }
    }

    if (obstacles[3]) {
        obstacle4X -= obstacle4Speed;
        obstacles[3].style.left = obstacle4X + "px";

        if (obstacle4X + obstacles[3].offsetWidth < 0) {
            obstacle4X = gameContainer.offsetWidth;
            obstacle4Speed = getRandomSpeed();
        }
    }

    if (obstacles[4]) {
        obstacle5X -= obstacle5Speed;
        obstacles[4].style.left = obstacle5X + "px";

        if (obstacle5X + obstacles[4].offsetWidth < 0) {
            obstacle5X = gameContainer.offsetWidth;
            obstacle5Speed = getRandomSpeed();
        }
    }
}

// 一定時間ごとに障害物の画像・位置をリセット
setInterval(() => {
    showObstacle(obstacles[0], gameContainer.offsetWidth, gameContainer.offsetHeight * 0.75 - 35, getRandomSpeed(), 'image/undercannon.png');
    showObstacle(obstacles[1], gameContainer.offsetWidth, gameContainer.offsetHeight * 0.75 - 35, getRandomSpeed(), 'image/undercannon.png');
    showObstacle(obstacles[2], gameContainer.offsetWidth, 10, getRandomSpeed(), 'image/topcannon.png');
    showObstacle(obstacles[3], gameContainer.offsetWidth, 10, getRandomSpeed(), 'image/topcannon.png');
    showObstacle(obstacles[4], gameContainer.offsetWidth, gameContainer.offsetHeight * 0.75 - 35, getRandomSpeed(), 'image/undercannon.png');
}, 2000);

// 弾丸タイプの障害物を出現・移動
function spawnObstacle(obstacle, image) {
    let obstacleX = gameContainer.offsetWidth;
    const minHeight = 110;
    const maxHeight = gameContainer.offsetHeight * 0.75 - 100;
    const spawnY = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    const speed = getRandomSpeed();

    showObstacle(obstacle, obstacleX, spawnY, speed, image);

    // 障害物が左に移動し、画面外に出たら再出現
    const moveInterval = setInterval(() => {
        obstacleX -= speed;
        obstacle.style.left = obstacleX + "px";

        if (obstacleX + obstacle.offsetWidth < 0) {
            clearInterval(moveInterval);
            spawnObstacle(obstacle, image);
        }
    }, 16);
}

// 追加の障害物を動的に作成してゲームに追加
// 弾丸障害物の出現開始
const obstacle6 = document.createElement("div");
obstacle6.classList.add("obstacle");
gameContainer.appendChild(obstacle6);
let obstacle6X = gameContainer.offsetWidth;
let obstacle6Speed = getRandomSpeed();
spawnObstacle(obstacle6, 'image/bullet.png');

const obstacle7 = document.createElement("div");
obstacle7.classList.add("obstacle");
gameContainer.appendChild(obstacle7);
let obstacle7X = gameContainer.offsetWidth;
let obstacle7Speed = getRandomSpeed();
spawnObstacle(obstacle7, 'image/bullet.png');

const obstacle8 = document.createElement("div");
obstacle8.classList.add("obstacle");
gameContainer.appendChild(obstacle8);
let obstacle8X = gameContainer.offsetWidth;
let obstacle8Speed = getRandomSpeed();
spawnObstacle(obstacle8, 'image/bullet.png');

const obstacle9 = document.createElement("div");
obstacle9.classList.add("obstacle");
gameContainer.appendChild(obstacle9);
let obstacle9X = gameContainer.offsetWidth;
let obstacle9Speed = getRandomSpeed();
spawnObstacle(obstacle9, 'image/bullet.png');

const obstacle10 = document.createElement("div");
obstacle10.classList.add("obstacle");
gameContainer.appendChild(obstacle10);
let obstacle10X = gameContainer.offsetWidth;
let obstacle10Speed = getRandomSpeed();
spawnObstacle(obstacle10, 'image/bullet.png');

const obstacle11 = document.createElement("div");
obstacle11.classList.add("obstacle");
gameContainer.appendChild(obstacle11);
let obstacle11X = gameContainer.offsetWidth;
let obstacle11Speed = getRandomSpeed();
spawnObstacle(obstacle11, 'image/bullet.png');

const obstacle12 = document.createElement("div");
obstacle12.classList.add("obstacle");
gameContainer.appendChild(obstacle12);
let obstacle12X = gameContainer.offsetWidth;
let obstacle12Speed = getRandomSpeed();
spawnObstacle(obstacle12, 'image/bullet.png');

const obstacle13 = document.createElement("div");
obstacle13.classList.add("obstacle");
gameContainer.appendChild(obstacle13);
let obstacle13X = gameContainer.offsetWidth;
let obstacle13Speed = getRandomSpeed();
spawnObstacle(obstacle13, 'image/bullet.png');

// キャラと障害物を初期位置に戻す処理（リセット）
function resetcharacterAndObstacle(character, obstacle) {
    characterX = 150;
    characterY = gameContainer.offsetHeight * 0.25;
    characterVelocityX = 0;
    characterVelocityY = 0;

    const initialPosition = gameContainer.offsetWidth + 100;
    obstacle.style.left = initialPosition + 'px';
}

// キャラと障害物の当たり判定チェック
function checkObstacleCollision() {
    let collisionDetected = false;

    for (let i = 1; i <= 100; i++) {
        const obstacle = document.querySelector(`.obstacle:nth-child(${i})`);

        if (!obstacle) {
            continue;
        }

        const obstacleRect = obstacle.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (
            characterRect.right > obstacleRect.left &&
            characterRect.left < obstacleRect.right &&
            characterRect.bottom > obstacleRect.top &&
            characterRect.top < obstacleRect.bottom
        ) {
            resetcharacterAndObstacle(character, obstacle);
            collisionDetected = true;
        }
    }

    if (collisionDetected) {
        moveAllObstaclesToRightEdge();
    }
}

// 障害物をすべて右端に戻す（衝突後の再配置）
function moveAllObstaclesToRightEdge() {
    obstacle1X = gameContainer.offsetWidth;
    obstacle1Speed = getRandomSpeed();

    obstacle2X = gameContainer.offsetWidth;
    obstacle2Speed = getRandomSpeed();

    obstacle3X = gameContainer.offsetWidth;
    obstacle3Speed = getRandomSpeed();

    obstacle4X = gameContainer.offsetWidth;
    obstacle4Speed = getRandomSpeed();

    obstacle5X = gameContainer.offsetWidth;
    obstacle5Speed = getRandomSpeed();

    obstacles.forEach((obstacle, index) => {
        if (obstacle) {
            const newPosition = gameContainer.offsetWidth + (index * 100);
            obstacle.style.left = newPosition + 'px';
        }
    });
}

// ゲームループ（毎フレーム更新）
function gameLoop() {
    // キャラクターの位置更新
    characterX += characterVelocityX;
    characterY += characterVelocityY;
    characterVelocityY -= gravity;

    // 衝突判定
    checkGroundCollision();
    checkCeilingCollision();

    // 画面端の制限
    if (characterX < 0) {
        characterX = 0;
    } else if (characterX + character.offsetWidth > gameContainer.offsetWidth) {
        characterX = gameContainer.offsetWidth - character.offsetWidth;
    }

    // DOM反映
    character.style.left = characterX + "px";
    character.style.bottom = characterY + "px";

    // キー入力による移動処理
    if (keys["a"] ||keys['ArrowLeft']) {
        moveLeft();
    } else if (keys["d"]||keys['ArrowRight']) {
        moveRight();
    } else {
        stop();
    }

    moveObstacles(); // 障害物の移動
    checkObstacleCollision();  // 衝突判定

    requestAnimationFrame(gameLoop); // 次のフレームへ
}

// ゲーム開始
gameLoop();
