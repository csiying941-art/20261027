let characterSprite; // 儲存角色的精靈圖圖片。
let characterX; // 儲存角色目前的水平座標。
let characterY; // 儲存角色目前的垂直座標。
let facingDirection = 1; // 設定角色朝向，1 代表右方，-1 代表左方。
const frameWidth = 108; // 設定每張精靈圖片的寬度。
const frameHeight = 162; // 設定每張精靈圖片的高度。
const frameCountTotal = 5; // 設定精靈圖中的圖片總數。
const movementSpeed = 4; // 設定角色每一影格的移動速度。

function preload() { // 在畫面開始前載入角色精靈圖。
	characterSprite = loadImage('../1/jump/all.png'); // 從相鄰的 1 資料夾載入精靈圖片。
} // 結束圖片載入函式。

function setup() { // 設定畫布與角色初始狀態。
	createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的全螢幕畫布。
	imageMode(CENTER); // 讓繪製圖片時使用圖片中心作為座標。
	characterX = width / 2; // 將角色放在畫面水平中央。
	characterY = height / 2; // 將角色放在畫面垂直中央。
} // 結束畫面設定函式。

function draw() { // 每一影格更新背景、移動狀態與角色動畫。
	background('#899d78'); // 使用指定的綠灰色填滿畫布背景。

	if (keyIsDown(LEFT_ARROW)) { // 檢查左方向鍵是否正被按住。
		characterX -= movementSpeed; // 按住左方向鍵時讓角色向左移動。
		facingDirection = -1; // 按住左方向鍵時讓角色朝向左方。
	} // 結束左方向鍵判斷。

	if (keyIsDown(RIGHT_ARROW)) { // 檢查右方向鍵是否正被按住。
		characterX += movementSpeed; // 按住右方向鍵時讓角色向右移動。
		facingDirection = 1; // 按住右方向鍵時讓角色朝向右方。
	} // 結束右方向鍵判斷。

	characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 將角色限制在畫布左右邊界內。
	characterY = constrain(characterY, frameHeight / 2, height - frameHeight / 2); // 將角色限制在畫布上下邊界內。

	const currentFrame = floor(frameCount / 8) % frameCountTotal; // 每八影格切換一次圖片並循環播放五格動畫。
	const sourceX = currentFrame * frameWidth; // 計算目前動畫影格在精靈圖上的水平起點。

	push(); // 暫存目前的繪圖狀態。
	translate(characterX, characterY); // 將繪圖原點移至角色目前的位置。
	scale(facingDirection, 1); // 依照移動方向水平翻轉角色圖片。
	image(characterSprite, 0, 0, frameWidth, frameHeight, sourceX, 0, frameWidth, frameHeight); // 繪製目前的精靈動畫影格。
	pop(); // 還原繪圖狀態，避免影響其他畫面內容。
} // 結束每影格繪製函式。

function keyPressed() { // 接收按鍵事件並避免方向鍵捲動網頁。
	if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵。
		return false; // 停止瀏覽器對左右方向鍵的預設操作。
	} // 結束方向鍵判斷。
} // 結束按鍵事件函式。

function windowResized() { // 在瀏覽器視窗尺寸改變時更新畫布。
	resizeCanvas(windowWidth, windowHeight); // 讓畫布重新符合目前的視窗大小。
	characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 調整角色位置以符合新的左右邊界。
	characterY = constrain(characterY, frameHeight / 2, height - frameHeight / 2); // 調整角色位置以符合新的上下邊界。
} // 結束視窗尺寸更新函式。
