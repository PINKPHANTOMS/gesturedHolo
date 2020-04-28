let time = 0;
var money;
let video;
let poseNet;
let pose;
let skeleton;
var bubbles = [];
let gif;
let graphics;

function preload() {

  gif = createVideo('no.MOV');
}
function setup() {

  // loadData();

  graphics = createGraphics(1000,1000);
  gif.hide();
  gif.loop();


  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO)
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);


}

function Bubble(x, y, z, size, rThresh) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rThresh = rThresh;
    this.size = size;
    this.textboi = function() {

        graphics.image(gif, 0, 0, 1000, 1000);
    }
    this.display = function() {
        strokeWeight(5);
        stroke(255);
        // fill(0, 0, 0, 0);
        // fill(abs(this.col*7), abs(this.col*2), abs(this.col*10));
        if(this.rThresh>100){
        rotateY(millis()/10000);
        rotateX(millis()/10000);
        rotateZ(millis()/10000);
      }
        translate(this.x, 5*((this.y)-(height/2)), this.z+1000);
        texture(graphics);
        box(size);
    }

}

function gotPoses(poses){
  if(poses.length>0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

// function gotData(data) {

//   money = data;

// }

// async function loadData() {
//   loadJSON("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR&api_key={0a05bf67fef62604017cccdbe627e65648d0084e7ba8d0758a673db71497be8a}", gotData);
// }

function draw() {



  translate(video.width,0);
  scale(-1,1);
  background(0, 0, 0, 0);

  // time = time + 1;

  if(pose){
    // if(money){
    //   // if(time % 30 == 0){
    //   //    loadData();
    //   //    print(money);
    //   //   }

    //   }

    camera(0, 0, -50* 100, 0, 0, 0, 0, 1, 0);

    for(var i = 0; i < 100; i++){

      bubbles[i] = new Bubble(100,pose.leftWrist.y, pose.rightWrist.y,abs(pose.leftWrist.x-pose.rightWrist.x)*5, abs(pose.leftWrist.y-pose.rightWrist.y));

    }
       for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].textboi();
        bubbles[i].display();    
      }
  }

}