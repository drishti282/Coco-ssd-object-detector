i = "";
status = "";
objects = [];

function setup() {
  c = createCanvas(500, 380);
  c.position(390, 145);
  v = createCapture(VIDEO);
  v.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Object Detected";
}

function preload() {}

function modelLoaded() {
  console.log("modelLoaded!");
  status = true;
}

function draw() {
  image(v, 0, 0, 500, 380);

  if (status != "") {
    objectDetector.detect(v, gotResult);

    for (f = 0; f < objects.length; f++) {
      document.getElementById("no").innerHTML =
        "Number of objects detected are : " + objects.length;
      fill("#FF0000");
      percent = floor(objects[f].confidence * 100);
      text(objects[f].label + " " + percent + "%", objects[f].x, objects[f].y);
      noFill();
      stroke("#FF0000");
      rect(
        objects[f].x,
        objects[f].y,
        objects[f].width - 500,
        objects[f].height - 300
      );
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}
