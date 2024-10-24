#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec2 texCoord;

uniform float uTime;
uniform vec2 uPos;
uniform vec2 uMouse;
uniform vec2 uResolution;

out vec2 vTextureCoord;

mat3 rotate3dx(float _angle){
    return mat3(cos(_angle), -sin(_angle), 0.0,
                sin(_angle),  cos(_angle), 0.0,
                0.0,          0.0,        1.0);
}

void main() {
    gl_Position = vec4(position, 1.0);
    vTextureCoord = texCoord;
}
