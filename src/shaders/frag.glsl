#version 300 es
precision highp float;

in vec3 vColor;

uniform float uTime;

out vec4 fragColor;

void main() {
    fragColor = vec4(vColor.r*sin(uTime),vColor.gb*(1.0-sin(uTime)), 1.0);
}
