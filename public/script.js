/* pixel background source = 
    https://marsbarnigiri.itch.io/treasure-rangers
    https://www.pixilart.com/photo/cold-sad-night-5e2997cb64b5bf7
    https://www.wallpaperflare.com/pixel-art-8-bit-sky-beauty-in-nature-plant-environment-wallpaper-cpylb

*/

const SpeechRecognition = webkitSpeechRecognition;
const socket = io();
socket.connect();



document.querySelector("#my-button").onclick = () => {
    getSpeech()
};


//speech recognition
const getSpeech = () => {
	const recognition = new SpeechRecognition();

	recognition.start();

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		document.querySelector("#speech-result").textContent = speechResult;
        console.log("result: ", speechResult);
        let split = speechResult.split(' ');

        console.log(split)

            split.forEach(word => {
                //Annoying Mode
                switch (word) {
                    case 'right':
                        direction = -.6;
                        break;
                    case 'left':
                        direction = .6;
                        break;
                    case 'jump':
                        gravity = -.3;
                        speedY = 1;
                    }
                });

        if(split.includes("yo")){
            bg = bgSad;
            myCol = color(41,68.05,66.27,0.7);
            split.forEach(word => {
                //Sad Mode
                switch (word) {
                    case 'ugly':
                        squeezer = random(-.1,.1)
                        break;
                    case 'incapable':
                        r1 = 3;
                        r2 = 3;
                        squeezer = 0;
                        break;
                    }
                });
        }

        if(split.includes("please")){
            bg = bgBright
            myCol = color(287,74,88,0.7)
            split.forEach(word => {
                //Polite Mode
                switch (word) {
                    case 'right':
                        direction = 1;
                        break;
                    case 'left':
                        direction = -1;
                        break;
                    case 'jump': 
                        gravity = .1;
                        speedY = 1;
                        break;
                    }
                });
        }

        if(split.includes("frog")){
            split.forEach(word => {
                
                });
            socket.emit("crazyMode", { query: speechResult });
            console.log("crazy mode activated")
        }

		// send what the person said to your server

    };
};

let direction = 0
let squeezer = 0;
let posX, posY, r1, r2;
let speedY = 0;
let gravity = 0;
let myCol;
let bg, bgRoom, bgSad, bgBright;

function preload(){
    bgRoom = loadImage("./bgImg_room.jpg");
    bgSad = loadImage("./bgImg_sad.jpg");
    bgBright = loadImage("./bgImg_bright.jpg");
}

function setup() {
    createCanvas(720, 480);
    r1 = 30; 
    r2 = 30;
    bg = bgRoom;
    posX = width * 0.5;
    posY = height * 0.5;
    colorMode(HSB);
    myCol = color(65, 68.5, 66.27, 0.7);

}

function draw(){
    
    background(bg);
    noStroke();
    fill(myCol);

    r2 += squeezer

    ellipse(posX, posY, 30, r2);
    let randomNum = random(-0.3, .3);
    speedY += gravity;
    posY += speedY + randomNum

    if(posY >= height - 10) {
        speedY = -speedY;
    }
    if (posY <= 0 ){
        speedY = -speedY;
    }
    if(posX < width - 10 && posX >= 10){
        posX += direction;
    }else{
        posX += -1 * direction
    }

}