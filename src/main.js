import Shader from "./Shader";
import Texture from "./Texture";
import { Triangle1 } from "./Model";
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
    const model = new Triangle1(gl);
    model.setup();

    gl.useProgram(shaderProgram.program);

	// UNIFORMS
    const startTime = performance.now();
    let currentTime, elapsedTime;
    const uTimeLocation = gl.getUniformLocation(shaderProgram.program, "uTime");

    const uResolutionLocation = gl.getUniformLocation(shaderProgram.program, "uResolution");
    gl.uniform2fv(uResolutionLocation, resolution);

    gl.clearColor(0, 0, 0, 1);

    function renderLoop() {
        currentTime = performance.now();
        elapsedTime = (currentTime - startTime) / 1000;
        gl.uniform1f(uTimeLocation, elapsedTime);

        gl.clear(gl.COLOR_BUFFER_BIT);
        model.render();

        requestAnimationFrame(renderLoop);
    }

    renderLoop();
}
