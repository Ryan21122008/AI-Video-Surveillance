status = "";
video = "";
objects = [];
function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();
    video.hide();
}
function draw(){
    image(video, 0, 0, 600, 600);
    if (status != ""){
        cocossdmodel.detect(video, gotResult);
        document.getElementById("status1").innerHTMl = "Status - Object Detected";
        document.getElementById("numberofobjects").innerHTMl = "No. of Objects Detected - " + objects.length;
        for(i = 0; i < objects.length; i++){
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x, objects[i].y-15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    cocossdmodel = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status1").innerHTMl = "Status - Detecting Objects";
}
function modelloaded(){
    console.log("Model Loaded");
    status = "true";
    video.speed(1);
    video.volume(0);
    video.loop();
}
function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}
