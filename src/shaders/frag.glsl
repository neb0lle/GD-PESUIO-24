#version 300 es
precision highp float;

out vec4 fragColor;

uniform float uTime;
uniform vec3 uColor;

void main() {
    fragColor = vec4(uColor, 1.0);
}
