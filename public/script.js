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
        

		// send what the person said to your server
        socket.emit("gotSpeechResult", { query: speechResult });
    };
};

let posX, posY, r1, r2;

function setup() {

     r1 = 30;
    createCanvas(400,400);
    posX = width * 0.5;
    posY = height * 0.5;
    button6 = createButton('activate the circle');
}

function draw(){
    background(200);
    fill(0);
    ellipse(posX, posY, r1);
    posX += 1;
}