//assignment 2 – armon naeini
let myVid;
let predictions = [];

let theShader;
let shaderTexture;

function setup() {
  createCanvas(640, 480);
  // create and hide webcam
  myVid = createCapture(VIDEO);
  myVid.size(width, height);
  myVid.hide();
  /*
    - create instance of facemesh
    - first parameter is video object input
    - second parameter is optional callback function
    - the callback function is simply to confirm model
      has been loaded
  */
  const facemesh = ml5.facemesh(myVid, modelLoaded);
  // when we receive a prediction, call gotFace
  facemesh.on('predict', (results) => gotFace(results));
}

// confirm model is loaded
function modelLoaded() {
  console.log('loaded');
}

// listen to new 'predict' events
// load array of results into predictions []
function gotFace(results) {
  predictions = results;
}

function drawFace() {
  // iterate through all predictions – one per detected face
  for (let i = 0; i < predictions.length; i++) {
    // get keypoints from annotations
    const si1 = predictions[i].annotations.leftEyebrowUpper;
    const si2 = predictions[i].annotations.rightEyebrowUpper;

    // draw points of left eyebrow
    for (let j = 0; j < si1.length; j++) {
      const x = si1[j][0];
      const y = si2[j][1];

      fill('white');
      noStroke();
      ellipse(x,y,10);
    }

    // draw points of right eyebrow
    for (let a = 0; a < si2.length; a ++) {
      const x = si2[a][0];
      const y = si2[a][1];

      fill('white');
      noStroke();
      ellipse(x, y, 10);
    }
  }
}

// draw the mf faceeeeeeee
function draw() {
  background(0,0,0,0);

 
  image(myVid, 0,0,width,height);
  pop();
  drawFace();

}
