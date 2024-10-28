#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec3 color;
layout (location=2) in vec3 offsetFactors;
layout (location=3) in vec3 rotationFactors;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

uniform mat4 uPM;
uniform mat4 uMVM;

out vec3 vColor;


mat4 rotationX(float _angle) {
    float c = cos(_angle);
    float s = sin(_angle);
    return mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, c, -s, 0.0,
        0.0, s, c, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotationY(float _angle) {
    float c = cos(_angle);
    float s = sin(_angle);
    return mat4(
        c, 0.0, s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotationZ(float _angle) {
    float c = cos(_angle);
    float s = sin(_angle);
    return mat4(
        c, -s, 0.0, 0.0,
        s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

mat4 offsetMat(vec3 _offset){
	return transpose(mat4(
	1.0, 0.0, 0.0, _offset.x,
	0.0, 1.0, 0.0, _offset.y,
	0.0, 0.0, 1.0, _offset.z,
	0.0, 0.0, 0.0, 1.0));
}

void main() {
	float angleX = uTime * rotationFactors.x;
    float angleY = uTime * rotationFactors.y;
    float angleZ = uTime * rotationFactors.z;
    mat4 rotation = rotationX(angleX) * rotationY(angleY) * rotationZ(angleZ);

    gl_Position = uPM * offsetMat(offsetFactors) * rotation * vec4(position, 1.0);
    vColor = color;
}
