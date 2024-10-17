#version 300 es
precision highp float;

in vec3 vColor;

uniform float uTime;

out vec4 fragColor;

void main() {
    fragColor = vec4(vColor, 1.0);
}
