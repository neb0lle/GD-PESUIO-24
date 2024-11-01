#version 300 es

layout (location=0) in vec3 position;

uniform float uTime;

uniform mat4 uPM;
uniform mat4 uVM;
uniform mat4 uMM;

out vec3 vColor;

void main() {
    gl_Position = uPM * uVM * uMM * vec4(position, 1.0);
}
