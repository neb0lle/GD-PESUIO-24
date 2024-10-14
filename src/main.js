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
    const vert = Shader.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const frag = Shader.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = new Shader(gl);
    shaderProgram.createShaders(vert, frag);

    const model = new Triangle1(gl);
    model.setup();

    gl.useProgram(shaderProgram.program);

    gl.clearColor(0, 0, 0, 1);

    function renderLoop() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        model.render();

        requestAnimationFrame(renderLoop);
    }

    renderLoop();
}
