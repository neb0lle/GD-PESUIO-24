import Shader from "./Shader";
import Texture from "./Texture";
import { Cube } from "./Model";
import { keys, isPointerLocked, resetMouseDelta, mouseDeltaX, mouseDeltaY } from "./Input";
import { glMatrix, mat4, vec3 } from "gl-matrix";
import Tetris from "./Tetris";

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
	gl.useProgram(shaderProgram.program);

	// DATA
	const tetrisGame = new Tetris(gl, shaderProgram);

	// UNIFORMS
	const startTime = performance.now();
	let currentTime, elapsedTime;
	const uTimeLocation = gl.getUniformLocation(shaderProgram.program, "uTime");
	const uPMLocation = gl.getUniformLocation(shaderProgram.program, "uPM");
	const uVMLocation = gl.getUniformLocation(shaderProgram.program, "uVM");

	const projectionMatrix = mat4.create();
	const fieldOfView = (45 * Math.PI) / 180;
	const aspect = resolution[0] / resolution[1];
	const zNear = 0.1;
	const zFar = 500.0;
	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
	gl.uniformMatrix4fv(uPMLocation, false, projectionMatrix);

	const viewMatrix = mat4.create();
	let cameraUp = vec3.fromValues(0.0, 1.0, 0.0);
	let cameraFront = vec3.fromValues(0.0, 0.0, 1.0);
	let cameraPosition = vec3.fromValues(5.0, 10, -30.0);
	let yaw = 90;
	let pitch = 0;
	const movementSpeed = 0.1;
	const rotationSpeed = 0.5;
	const mouseSensitivity = 0.05;

	function updateCamera() {
		const front = vec3.create();
		const up = vec3.create();
		const right = vec3.create();

		vec3.copy(front, cameraFront);
		vec3.copy(up, cameraUp);
		vec3.cross(right, front, up);

		if (keys[87]) vec3.scaleAndAdd(cameraPosition, cameraPosition, front, movementSpeed);
		if (keys[83]) vec3.scaleAndAdd(cameraPosition, cameraPosition, front, -movementSpeed);
		if (keys[68]) vec3.scaleAndAdd(cameraPosition, cameraPosition, right, movementSpeed);
		if (keys[65]) vec3.scaleAndAdd(cameraPosition, cameraPosition, right, -movementSpeed);
		if (keys[32]) vec3.scaleAndAdd(cameraPosition, cameraPosition, up, movementSpeed);
		if (keys[16]) vec3.scaleAndAdd(cameraPosition, cameraPosition, up, -movementSpeed);

		if (isPointerLocked) {
			yaw += mouseDeltaX * mouseSensitivity;
			pitch -= mouseDeltaY * mouseSensitivity;
			pitch = Math.max(-89, Math.min(89, pitch));
			const frontX = Math.cos(glMatrix.toRadian(yaw)) * Math.cos(glMatrix.toRadian(pitch));
			const frontY = Math.sin(glMatrix.toRadian(pitch));
			const frontZ = Math.sin(glMatrix.toRadian(yaw)) * Math.cos(glMatrix.toRadian(pitch));
			vec3.set(cameraFront, frontX, frontY, frontZ);
			vec3.normalize(cameraFront, cameraFront);
		}
		resetMouseDelta();
		mat4.lookAt(viewMatrix, cameraPosition, vec3.add(vec3.create(), cameraPosition, cameraFront), cameraUp);
		gl.uniformMatrix4fv(uVMLocation, false, viewMatrix);
	}

	// RENDER LOOP
	gl.clearColor(0, 0, 0, 1);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	let lastDropTime = 0;
	const dropInterval = 1000;
	const controlInterval = 75;
	let lastControlTime = {
		left: 0,
		right: 0,
		rotateCCW: 0,
		rotateCW: 0,
	};


	function renderLoop() {
		currentTime = performance.now();
		elapsedTime = (currentTime - startTime) / 1000;
		gl.uniform1f(uTimeLocation, elapsedTime);

		if (currentTime - lastDropTime >= dropInterval) {
			tetrisGame.movePiece("down");
			lastDropTime = currentTime;
		}

		if (keys[37] && currentTime - lastControlTime.left >= controlInterval) {
			tetrisGame.movePiece("left");
			lastControlTime.left = currentTime;
		}
		if (keys[39] && currentTime - lastControlTime.right >= controlInterval) {
			tetrisGame.movePiece("right");
			lastControlTime.right = currentTime;
		}
		if (keys[74] && currentTime - lastControlTime.rotateCCW >= controlInterval) {
			tetrisGame.movePiece("rotateCCW");
			lastControlTime.rotateCCW = currentTime;
		}
		if (keys[75] && currentTime - lastControlTime.rotateCW >= controlInterval) {
			tetrisGame.movePiece("rotateCW");
			lastControlTime.rotateCW = currentTime;
		}
		if (keys[40]) tetrisGame.movePiece("down");

		updateCamera();

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		tetrisGame.render();

		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}
