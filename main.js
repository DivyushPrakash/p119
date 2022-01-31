random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;

timecounter = 0;
timecheck = "";
drawsketch = "";
answerholder = "";
score = 0;

function updateCanvas() {
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;
}

function preload() {
    doodlenetmodel = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyDoodle);
}

function draw() {
    strokeWeight("8");
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyDoodle() { doodlenetmodel.classify(canvas, getResult); }

function getResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log("results");
        drawn_sketch = results[0].label;
        document.getElementById("yoursketch").innerHTML = drawn_sketch;
        document.getElementById("confidence").innerHTML = Math.round(results[0].confidence * 100) + '%';
    }
}