#version 300 es

layout (location=0) in vec4 position;
layout (location=1) in vec3 color;

uniform float uTime;

out vec3 vColor;

void main() {
	gl_Position = vec4(position.x+cos(uTime)-0.2,position.y+sin(uTime)-0.2,position.z,1.0);
    vColor = color;
}
