#version 300 es
precision highp float;

in vec2 vTextureCoord;

uniform float uTime;
uniform sampler2D uSampler;

out vec4 fragColor;

void main() {
	fragColor = vec4(texture(uSampler,vTextureCoord).rgba);
}
