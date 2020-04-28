let time = 0;
var money;
let video;
let poseNet;
let pose;
let skeleton;
var bubbles = [];

function setup() {

  // loadData();

  createCanvas(windowWidth,windowHeight, WEBGL);
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
    this.display = function() {
        strokeWeight(5);
        stroke(255);
        fill(0, 0, 0, 0);
        // fill(abs(this.col*7), abs(this.col*2), abs(this.col*10));
        if(this.rThresh>100){
        rotateY(millis()/10000);
        rotateX(millis()/10000);
        rotateZ(millis()/10000);
      }
        translate(this.x, 2*this.y-(height/4), this.z-1000);
        box(size);
    }

    this.move = function() {

        // this.x = this.x + random(-1, 1);
        // this.y = this.y + random(-1, 1);

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
    for(var i = 0; i < 10; i++){

      bubbles[i] = new Bubble(100,pose.leftWrist.y, pose.rightWrist.y,abs(pose.leftWrist.x-pose.rightWrist.x)*5, abs(pose.leftWrist.y-pose.rightWrist.y));

    }
       for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();    
      }
  }

}