let facemesh;
let myVid;
let predictions = [];

/** SHADER STUFF **/
let theShader;
let shaderTexture;
let pg;

/** LOAD SHADER **/
function preload() {
  theShader = loadShader('texture.vert', 'texture.frag');
  console.log('shader loaded');
}

function setup() {
  createCanvas(640, 480, WEBGL);
  noStroke();
  textureMode(NORMAL);

 /** SHADER STUFF **/
 shaderTexture = createGraphics(640, 480, WEBGL);
 shaderTexture.noStroke();

  myVid = createCapture(VIDEO);
  myVid.size(width, height);
  pg = createGraphics(width,height); 

  facemesh = ml5.facemesh(myVid, modelLoaded);

  facemesh.on('predict', results => {
    predictions = results;
  });

  myVid.hide();

 

  console.log('setup successful');
}

// confirm model is loaded
function modelLoaded() {
  console.log('model loaded');
}

// listen to new 'predict' events
// load array of results into predictions []
function gotFace(results) {
  predictions = results;
}

function drawEyebrows() {
 
  // iterate through all predictions – one per detected face
  for (let i = 0; i < predictions.length; i++) {
    // get keypoints from annotations
    const si1 = predictions[i].annotations.leftEyebrowUpper;
    const si2 = predictions[i].annotations.rightEyebrowUpper;

    // draw points of left eyebrow
    for (let j = 0; j < si1.length; j++) {
      const x = si1[j][0];
      const y = si2[j][1];

      // fill('white');
      noStroke();
      ellipse(x,y, 40, 40, 100);
    }

    // draw points of right eyebrow
    for (let a = 0; a < si2.length; a ++) {
      const x = si2[a][0];
      const y = si2[a][1];

      // fill('white');
      noStroke();
      ellipse(x, y, 40, 40, 100);
    }
  }
}

// draw the mf face
function draw() {

  translate(-width/2,-height/2,0); 
  image(myVid, 0, 0, width, height);
  image(pg, 0,0, width, height);

  drawFaceMesh();
}

function drawFaceMesh() {
  
  if (predictions.length < 1) {
    console.log("EMPTY");
    return;
  }

  const silhoutte = predictions[0].annotations['silhouette'];

  // pg.background(255);
  // pg.fill(0);
  // pg.noStroke();
  shaderTexture.shader(theShader);
  shaderTexture.rect(0,0, width, height);
  texture(shaderTexture); 

  rect(0,0, 100, 100);

  beginShape();
  for (let g = 0; g < silhoutte.length + 3; g++) {
    let index = g;
    if (g >= silhoutte.length) {
      // Use modulo to iterate through the additional points needed to complete the curve
      index = g % silhoutte.length;
    }
    // get x,y,z coordinettes of the point
    const [x, y, z] = silhoutte[index];
    // Add the curve vertex to the shape
    // curveVertex(x, y);
    // vertex(x, y,);
    // vertex(x, y);
    // vertex(x, y);
    vertex(x, y, 0, -1, 4);
    vertex(x, y, 0, -1, -1);
    vertex(x, y, 0, 4, -1);
  }
  endShape();
  

  /*
  for (let i = 0; i < predictions.length; i+=1) {
    const keypoints = predictions[i].scaledMesh;
    
    for (let j = 0; j < keypoints.length; j+=1) {
      const [x,y] = keypoints[j];
      // vertex(x, y);
      // fill(0, 255, 0);
      ellipse(x, y, 7, 7);
    }
  }
  */
}