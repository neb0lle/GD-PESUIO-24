import Shader from "./Shader";
import Texture from "./Texture";
import { Cubes0, Cubes1, Cubes2 } from "./Model";
import {keys, mouseX, mouseY } from "./Input";
import {mat4} from "gl-matrix"

import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";

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
	const model = new Cubes0(gl);
	model.setup(100);

	// CONTROLS
	let posX = 0;
	let posY = 0;
	function updatePos(movementSpeed) {
		if (keys[72]) posX -= movementSpeed;
		if (keys[76]) posX += movementSpeed;
		if (keys[75]) posY += movementSpeed;
		if (keys[74]) posY -= movementSpeed;
	}

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

	const uPMLocation = gl.getUniformLocation(shaderProgram.program, "uPM");
	const uMVMLocation = gl.getUniformLocation(shaderProgram.program, "uMVM");

	const fieldOfView = (45 * Math.PI) / 180;
	const aspect = resolution[0] / resolution[1];
	const zNear = 0.1;
	const zFar = 500.0;
	const projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

	gl.uniformMatrix4fv(
		uPMLocation,
		false,
		projectionMatrix
	);
	// const modelViewMatrix = mat4.create();
	// gl.uniformMatrix4fv(
	// 	uMVMLocation,
	// 	false,
	// 	modelViewMatrix
	// );

	canvas.addEventListener("click", (event) => {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const ndcX = (x / canvas.width) * 2 - 1;
		const ndcY = 1 - (y / canvas.height) * 2;

		model.addCube(ndcX*10, ndcY*10, -20);
	});

	// RENDER LOOP
	gl.clearColor(0, 0, 0, 1);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	function renderLoop() {
		currentTime = performance.now();
		elapsedTime = (currentTime - startTime) / 1000;
		gl.uniform1f(uTimeLocation, elapsedTime);

		gl.uniform2f(uMouseLocation, mouseX, mouseY);
		updatePos(0.01);

		gl.uniform2f(uPosLocation, posX, posY);

		// mat4.rotate(
		// 	modelViewMatrix,
		// 	modelViewMatrix,
		// 	Math.PI / 180,
		// 	[1, 1, 1]
		// );
		//
		// gl.uniformMatrix4fv(
		// 	uMVMLocation,
		// 	false,
		// 	modelViewMatrix
		// );
		//
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		model.render();

		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}
