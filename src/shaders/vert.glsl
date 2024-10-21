#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec2 texCoord;

uniform float uTime;

out vec2 vTextureCoord;

void main() {
	gl_Position = vec4(position, 1.0);
	vTextureCoord = texCoord;
}
