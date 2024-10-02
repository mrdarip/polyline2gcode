input = document.getElementById('polyline');
output = document.getElementById('gcode');
convertBtn = document.getElementById('convert');
onCommand = document.getElementById('onCommand');
offCommand = document.getElementById('offCommand');
offSpeed = document.getElementById('offSpeed');
onSpeed = document.getElementById('onSpeed');

convertBtn.addEventListener('click', function() {
    var polyline = input.value;
    var gcode = polylineToGcode(polyline);
    output.value = gcode;
});


function polylineToGcode(polyline) {
    gcode = "";
    polyline = JSON.parse(polyline);

    gcode += offCommand.value + "\n";
    polyline.forEach(path => {
        gcode += "G0 X" + path[0][0] + " Y" + path[0][1] + "\n"; //go to first path point
        gcode += "G0 F" + onSpeed.value + "\n";
        gcode += onCommand.value + "\n";
        
        path.forEach(point => {
            gcode += "G1 X" + point[0] + " Y" + point[1] + "\n";
        });

        gcode += offCommand.value + "\n";
        gcode += "G0 F" + offSpeed.value + "\n";
    });
    //todo:: go gome

    return gcode;
}