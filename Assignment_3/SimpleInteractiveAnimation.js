"use strict";

var program
var bufferId
var positionLoc
var gl;
var arrow;
var xDeltaLoc;
var thetaLoc;
var directionRight = true;
var xChange = 0.0;
var delta = 0.05;
var theta = 0.0;
var speed = 100;
var ColorLoc
var cBuffer
var colorA = [  1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0, 1,0,0,
                1,0,0, 1,0,0, 1,0,0]

window.onload = function init(){
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    arrow = new Float32Array([
        0,0,
        0.15,  0.2,
        0.4,   0,
        0.15, -0.2,
        0,0,
        -0.0, 0.2, 
        -0.008, 0.2, 
        -0.016, 0.199, 
        -0.023, 0.198, 
        -0.031, 0.196, 
        -0.039, 0.193, 
        -0.046, 0.19, 
        -0.054, 0.187, 
        -0.061, 0.183, 
        -0.068, 0.178, 
        -0.075, 0.173, 
        -0.082, 0.168, 
        -0.088, 0.162, 
        -0.094, 0.155, 
        -0.1, 0.149, 
        -0.106, 0.141, 
        -0.111, 0.134, 
        -0.117, 0.126, 
        -0.121, 0.118, 
        -0.126, 0.109, 
        -0.13, 0.1, 
        -0.134, 0.091, 
        -0.137, 0.081, 
        -0.14, 0.072, 
        -0.143, 0.062, 
        -0.145, 0.052, 
        -0.147, 0.042, 
        -0.148, 0.031, 
        -0.149, 0.021, 
        -0.15, 0.01, 
        -0.15, -0.0, 
        -0.15, -0.01, 
        -0.149, -0.021, 
        -0.148, -0.031, 
        -0.147, -0.042, 
        -0.145, -0.052, 
        -0.143, -0.062, 
        -0.14, -0.072, 
        -0.137, -0.081, 
        -0.134, -0.091, 
        -0.13, -0.1, 
        -0.126, -0.109, 
        -0.121, -0.118, 
        -0.117, -0.126, 
        -0.111, -0.134, 
        -0.106, -0.141, 
        -0.1, -0.149, 
        -0.094, -0.155, 
        -0.088, -0.162, 
        -0.082, -0.168, 
        -0.075, -0.173, 
        -0.068, -0.178, 
        -0.061, -0.183, 
        -0.054, -0.187, 
        -0.046, -0.19, 
        -0.039, -0.193, 
        -0.031, -0.196, 
        -0.023, -0.198, 
        -0.016, -0.199, 
        -0.008, -0.2  
    ]);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    program = initShaders(gl, "vertex-shader", "fragment-shader");

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, arrow, gl.STATIC_DRAW);

    positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
    
    xDeltaLoc = gl.getUniformLocation(program, "xDelta");
    thetaLoc = gl.getUniformLocation(program, "uTheta");


    gl.useProgram( program );
    gl.enableVertexAttribArray(positionLoc);

    colourBuff();

    
    document.getElementById("directionButton").onclick = function (event) {
        directionRight = !directionRight;
        if(!directionRight){
            theta = 3.14159;
            gl.uniform1f(thetaLoc, theta);
        }else{
            theta = 0;
            gl.uniform1f(thetaLoc, theta);
        }
    };
    document.getElementById("startButton").onclick = function (event) {
        delta = 0.05;
    };

    document.getElementById("stopButton").onclick = function (event) {
        delta = 0.0;
    };
    var m = document.getElementById("colourmenu")
    m.onclick = function(event){
        console.log(m.selectedIndex);
        switch (m.selectedIndex) {
            case 0:
                colorA = [1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0,
                        1,0,0, 1,0,0, 1,0,0, 1,0,0];
                    colourBuff();
            break;
            case 1:
                colorA = [0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1,
                        0,0,1, 0,0,1, 0,0,1, 0,0,1, 
                        0,0,1, 0,0,1, 0,0,1, 0,0,1];
                        colourBuff();
            break;
            case 2:
                colorA = [0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0,
                        0,1,0, 0,1,0, 0,1,0, 0,1,0, 
                        0,1,0, 0,1,0, 0,1,0, 0,1,0];
                        colourBuff();
            break;
            case 3:
                colorA = [1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,
                        1,1,0, 1,1,0, 1,1,0, 1,1,0, 
                        1,1,0, 1,1,0, 1,1,0, 1,1,0,];
                        colourBuff();

        }
    }

    render();
    
}
function colourBuff(){
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorA), gl.STATIC_DRAW );

    ColorLoc = gl.getAttribLocation( program, "aColor");
    gl.vertexAttribPointer(ColorLoc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(ColorLoc);


}
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    if(xChange>0.55){
        directionRight = false;
        theta = 3.14159;
        gl.uniform1f(thetaLoc, theta);
    }else if(xChange<-0.55){
        directionRight = true;
        theta = 0;
        gl.uniform1f(thetaLoc, theta);
    }
    if(directionRight==true){
        xChange = xChange + delta;
    }else{
        xChange = xChange - delta;
    }
    gl.uniform1f(xDeltaLoc, xChange);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 65);

    setTimeout(
        function () {requestAnimationFrame(render);},
        speed
    );
}