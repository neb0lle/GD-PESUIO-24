#version 300 es
precision highp float;

out vec4 fragColor;

in vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;

void main() {
    fragColor = vec4(vColor,1.0);
}
