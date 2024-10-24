import Shader from "./Shader";
import Texture from "./Texture";
import { TexMap } from "./Model";
import {keys, mouseX, mouseY } from "./Input";

import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";

import tex0 from "./tex0.jpeg"

const canvas = document.querySelector("#glcanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const resolution = [canvas.width, canvas.height];

const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl2"));

if (gl === null) {
    alert("Unable to initialize WebGL.");
} else {
	// SHADERS
    const vert = Shader.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const frag = Shader.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = new Shader(gl);
    shaderProgram.createShaders(vert, frag);

	// DATA
	const tex = new Texture(gl,0);
	tex.createTex(tex0,225,225)

    const model = new TexMap(gl);
    model.setup();

    gl.useProgram(shaderProgram.program);

	// UNIFORMS
    const startTime = performance.now();
    let currentTime, elapsedTime;
    const uTimeLocation = gl.getUniformLocation(shaderProgram.program, "uTime");

    const uResolutionLocation = gl.getUniformLocation(shaderProgram.program, "uResolution");
    gl.uniform2fv(uResolutionLocation, resolution);

    const uSamplerLocation = gl.getUniformLocation(shaderProgram.program, "uSampler");
    gl.uniform1i(uSamplerLocation, 0);

	const uMouseLocation = gl.getUniformLocation(shaderProgram.program, "uMouse");

	const uPosLocation = gl.getUniformLocation(shaderProgram.program, "uPos");

	// GENERAL
	let posX = 0;
	let posY = 0;
	function updatePos(movementSpeed) {
		if (keys[72]) posX -= movementSpeed;
		if (keys[76]) posX += movementSpeed;
		if (keys[75]) posY += movementSpeed;
		if (keys[74]) posY -= movementSpeed;
	}

    gl.clearColor(0, 0, 0, 1);

    function renderLoop() {
        currentTime = performance.now();
        elapsedTime = (currentTime - startTime) / 1000;
        gl.uniform1f(uTimeLocation, elapsedTime);
		updatePos(0.01);
        gl.uniform2f(uMouseLocation, mouseX, mouseY);
        gl.uniform2f(uPosLocation, posX, posY);

        gl.clear(gl.COLOR_BUFFER_BIT);
        model.render();

        requestAnimationFrame(renderLoop);
    }

    renderLoop();
}
