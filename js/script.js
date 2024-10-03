input = document.getElementById('polyline');
output = document.getElementById('gcode');
convertBtn = document.getElementById('convert');
onCommand = document.getElementById('onCommand');
offCommand = document.getElementById('offCommand');
offSpeed = document.getElementById('offSpeed');
onSpeed = document.getElementById('onSpeed');

scaleInput = document.getElementById('scale');

minXSpan = document.getElementById('minX');
minYSpan = document.getElementById('minY');
maxXSpan = document.getElementById('maxX');
maxYSpan = document.getElementById('maxY');

convertBtn.addEventListener('click', function() {
    var polyline = input.value;
    var gcodeAndStats = polylineToGcode(polyline);

    var gcode = gcodeAndStats[0];
    var maxX = gcodeAndStats[1];
    var maxY = gcodeAndStats[2];
    var minX = gcodeAndStats[3];
    var minY = gcodeAndStats[4];

    minXSpan.innerHTML = minX;
    minYSpan.innerHTML = minY;
    maxXSpan.innerHTML = maxX;
    maxYSpan.innerHTML = maxY;

    output.value = gcode;
});


function polylineToGcode(polyline) {
    gcode = "";
    maxX = -Infinity;
    maxY = -Infinity;
    minX = Infinity;
    minY = Infinity;

    polyline = JSON.parse(polyline);
    console.log(polyline);

    gcode += offCommand.value + "\n";
    polyline.forEach(path => {
        gcode += "G0 X" + path[0] + " Y" + path[1] + "\n"; //go to first path point
        gcode += "G0 F" + onSpeed.value + "\n";
        gcode += onCommand.value + "\n";
        
        path.forEach(point => {
            pointX = point[0] * scaleInput.value;
            pointY = point[1] * scaleInput.value;

            gcode += "G1 X" + pointX + " Y" + pointY + "\n";

            if(pointX > maxX) {
                maxX = pointX;
            }
            if(pointY > maxY) {
                maxY = pointY;
            }
            if(pointX < minX) {
                minX = pointX;
            }
            if(pointY < minY) {
                minY = pointY;
            }
        });

        gcode += offCommand.value + "\n";
        gcode += "G0 F" + offSpeed.value + "\n";
    });
    //todo:: go gome

    return [gcode,maxX,maxY,minX,minY];
}