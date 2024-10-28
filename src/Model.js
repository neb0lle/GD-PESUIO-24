export default class Model {
	constructor(gl) {
		this.gl = gl;
		this.vbo = null;
		this.vao = null;
	}

	static createBuffer(gl, data, usage) {
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, usage);
		return buffer;
	}

	static createVertexArray(gl) {
		const vao = gl.createVertexArray();
		gl.bindVertexArray(vao);
		return vao;
	}
}


export class Triangle extends Model {
	setup() {
		const data = new Float32Array([
			-0.2, -0.2, 0.0, 0.0, 0.0, 1.0,
			0.2, -0.2, 0.0, 0.0, 1.0, 0.0,
			0.0, 0.2, 0.0, 1.0, 0.0, 0.0,
		]);

		this.vbo = Model.createBuffer(this.gl, data, this.gl.STATIC_DRAW);
		this.vao = Model.createVertexArray(this.gl);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 24, 0);

		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 24, 12);
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
	}
}

export class TexMap extends Model {
	setup() {
		const data = new Float32Array([
			-0.1, -0.1, 0.0, 0.0, 0.0,
			0.1, -0.1, 0.0, 1.0, 0.0,
			-0.1, 0.1, 0.0, 0.0, 1.0,
			0.1, -0.1, 0.0, 1.0, 0.0,
			0.1,  0.1, 0.0, 1.0, 1.0,
			-0.1, 0.1, 0.0, 0.0, 1.0,
		]);

		this.vbo = Model.createBuffer(this.gl, data, this.gl.STATIC_DRAW);
		this.vao = Model.createVertexArray(this.gl);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 20, 0);

		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 20, 12);
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}

export class Cube1 extends Model {
	setup() {
		const pos = new Float32Array([
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,

			-0.5, -0.5, -0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,

			0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5,

			0.5, 0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,

			0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,

			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,

			-0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,


			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,

			0.5, 0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, -0.5,

			0.5, -0.5, -0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,

			0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,

			0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,

		]);
		const col = new Float32Array([
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 1, 1,
			0, 1, 1,
			0, 1, 1,

			0, 1, 1,
			0, 1, 1,
			0, 1, 1,

			1, 0, 1,
			1, 0, 1,
			1, 0, 1,

			1, 0, 1,
			1, 0, 1,
			1, 0, 1,

			1, 1, 0,
			1, 1, 0,
			1, 1, 0,

			1, 1, 0,
			1, 1, 0,
			1, 1, 0,

		]);

		this.vao = Model.createVertexArray(this.gl)

		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, pos, this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, col, this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(1);

	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 12 * 3);
	}
}



export class Cubes0 extends Model {
	setup(n) {
		this.n = n;
        const vertices = new Float32Array([
            -0.5, -0.5, -0.5,    0, 0, 0,
             0.5, -0.5, -0.5,    0, 0, 1,
             0.5,  0.5, -0.5,    0, 1, 0,
            -0.5,  0.5, -0.5,    0, 1, 1,
            -0.5, -0.5,  0.5,    1, 0, 0,
             0.5, -0.5,  0.5,    1, 0, 1,
             0.5,  0.5,  0.5,    1, 1, 0,
            -0.5,  0.5,  0.5,    1, 1, 1
        ]);

        const indices = new Uint16Array([
            0, 1, 2,  2, 3, 0,
            4, 5, 6,  6, 7, 4,
            3, 2, 6,  6, 7, 3,
            0, 1, 5,  5, 4, 0,
            1, 2, 6,  6, 5, 1,
            0, 3, 7,  7, 4, 0
        ]);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.vbo = Model.createBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 24, 0);
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 24, 12);

		this.ebo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

		this.instanceMatrixBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.instanceMatrixBuffer);

		const offsets = new Float32Array(n * 3);
		const rotationAngles = new Float32Array(n * 3);

		const hsFact = Math.floor(Math.sqrt(this.n));
		for (let i = 0; i < this.n; i++) {
			const x = (i % hsFact) * 2.0 - hsFact;
			const y = Math.floor(i / hsFact) * 2.0 - hsFact;
			const z = -30;
			offsets.set([x, y, z], i * 3);

			const angleX = Math.random() * Math.PI * 2;
			const angleY = Math.random() * Math.PI * 2;
			const angleZ = Math.random() * Math.PI * 2;
			rotationAngles.set([angleX, angleY, angleZ], i * 3);
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
		this.gl.bufferData(this.gl.ARRAY_BUFFER, offsets, this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(2);
		this.gl.vertexAttribPointer(2, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(2, 1);

		const rotationBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, rotationBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, rotationAngles, this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(3);
		this.gl.vertexAttribPointer(3, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(3, 1);
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawElementsInstanced(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0, this.n);
	}
}

export class Cubes1 extends Model {
	setup(n) {
		this.n = n;
		const vertices = new Float32Array([
			-0.5, -0.5, -0.5,    1, 0, 0,
			0.5, -0.5, -0.5,    1, 0, 0,
			0.5,  0.5, -0.5,    1, 0, 0,
			-0.5,  0.5, -0.5,    1, 0, 0,

			-0.5, -0.5,  0.5,    0, 1, 0,
			0.5, -0.5,  0.5,    0, 1, 0,
			0.5,  0.5,  0.5,    0, 1, 0,
			-0.5,  0.5,  0.5,    0, 1, 0,

			-0.5,  0.5, -0.5,    0, 0, 1,
			0.5,  0.5, -0.5,    0, 0, 1,
			0.5,  0.5,  0.5,    0, 0, 1,
			-0.5,  0.5,  0.5,    0, 0, 1,

			-0.5, -0.5, -0.5,    1, 1, 0,
			0.5, -0.5, -0.5,    1, 1, 0,
			0.5, -0.5,  0.5,    1, 1, 0,
			-0.5, -0.5,  0.5,    1, 1, 0,

			0.5, -0.5, -0.5,    1, 0.5, 0.5,
			0.5, -0.5,  0.5,    1, 0.5, 0.5,
			0.5,  0.5,  0.5,    1, 0.5, 0.5,
			0.5,  0.5, -0.5,    1, 0.5, 0.5,

			-0.5, -0.5, -0.5,    0.5, 0, 1,
			-0.5, -0.5,  0.5,    0.5, 0, 1,
			-0.5,  0.5,  0.5,    0.5, 0, 1,
			-0.5,  0.5, -0.5,    0.5, 0, 1
		]);

		const indices = new Uint16Array([
			0, 1, 2,  2, 3, 0,
			4, 5, 6,  6, 7, 4,
			8, 9, 10, 10, 11, 8,
			12, 13, 14, 14, 15, 12,
			16, 17, 18, 18, 19, 16,
			20, 21, 22, 22, 23, 20
		]);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.vbo = Model.createBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 24, 0);
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 24, 12);

		this.ebo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);


		const offsets = new Float32Array(n * 3);
		const rotations = new Float32Array(n * 3);

		const hsFact = Math.floor(Math.sqrt(this.n));
		for (let i = 0; i < this.n; i++) {
			const x = (i % hsFact) * 2.0 - hsFact;
			const y = Math.floor(i / hsFact) * 2.0 - hsFact;
			const z = -100;
			offsets.set([x, y, z], i * 3);

			const angleX = Math.random() * Math.PI * 2;
			const angleY = Math.random() * Math.PI * 2;
			const angleZ = Math.random() * Math.PI * 2;
			rotations.set([angleX, angleY, angleZ], i * 3);
		}

		this.offsetFactorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.offsetFactorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, offsets, this.gl.DYNAMIC_DRAW);
		this.gl.enableVertexAttribArray(2);
		this.gl.vertexAttribPointer(2, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(2, 1);

		this.rotationFactorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rotationFactorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, rotations, this.gl.DYNAMIC_DRAW);
		this.gl.enableVertexAttribArray(3);
		this.gl.vertexAttribPointer(3, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(3, 1);
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawElementsInstanced(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0, this.n);
	}
}

export class Cubes2 extends Model {
	setup(n) {
		this.n = 0;
		this.maxCubes = n;

		const vertices = new Float32Array([
			-0.5, -0.5, -0.5,  1, 0, 0,
			0.5, -0.5, -0.5,   1, 0, 0,
			0.5,  0.5, -0.5,   1, 0, 0,
			-0.5,  0.5, -0.5,  1, 0, 0,

			-0.5, -0.5,  0.5,  0, 1, 0,
			0.5, -0.5,  0.5,   0, 1, 0,
			0.5,  0.5,  0.5,   0, 1, 0,
			-0.5,  0.5,  0.5,  0, 1, 0,

			-0.5,  0.5, -0.5,  0, 0, 1,
			0.5,  0.5, -0.5,   0, 0, 1,
			0.5,  0.5,  0.5,   0, 0, 1,
			-0.5,  0.5,  0.5,  0, 0, 1,

			-0.5, -0.5, -0.5,  1, 1, 0,
			0.5, -0.5, -0.5,   1, 1, 0,
			0.5, -0.5,  0.5,   1, 1, 0,
			-0.5, -0.5,  0.5,  1, 1, 0,

			0.5, -0.5, -0.5,   1, 0.5, 0.5,
			0.5, -0.5,  0.5,   1, 0.5, 0.5,
			0.5,  0.5,  0.5,   1, 0.5, 0.5,
			0.5,  0.5, -0.5,   1, 0.5, 0.5,

			-0.5, -0.5, -0.5,  0.5, 0, 1,
			-0.5, -0.5,  0.5,  0.5, 0, 1,
			-0.5,  0.5,  0.5,  0.5, 0, 1,
			-0.5,  0.5, -0.5,  0.5, 0, 1
		]);

		const indices = new Uint16Array([
			0, 1, 2,  2, 3, 0,
			4, 5, 6,  6, 7, 4,
			8, 9, 10, 10, 11, 8,
			12, 13, 14, 14, 15, 12,
			16, 17, 18, 18, 19, 16,
			20, 21, 22, 22, 23, 20
		]);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.vbo = Model.createBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 24, 0);
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 24, 12);

		this.ebo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);

		this.offsets = new Float32Array(this.maxCubes * 3);
		this.rotations = new Float32Array(this.maxCubes * 3);

		this.offsetFactorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.offsetFactorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.offsets, this.gl.DYNAMIC_DRAW);
		this.gl.enableVertexAttribArray(2);
		this.gl.vertexAttribPointer(2, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(2, 1);


		this.rotationFactorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rotationFactorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.rotations, this.gl.DYNAMIC_DRAW);
		this.gl.enableVertexAttribArray(3);
		this.gl.vertexAttribPointer(3, 3, this.gl.FLOAT, false, 12, 0);
		this.gl.vertexAttribDivisor(3, 1);
	}

	addCube(x, y, z) {
		const i = this.n;
		if (i >= this.maxCubes) {
			console.warn("Maximum number of cubes reached.");
			return;
		}

		this.offsets.set([x, y, z], i * 3);

		const angleX = Math.random() * Math.PI * 2;
		const angleY = Math.random() * Math.PI * 2;
		const angleZ = Math.random() * Math.PI * 2;

		this.rotations.set([angleX, angleY, angleZ], i * 3);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.offsetFactorBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.offsets);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rotationFactorBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.rotations);

		this.n += 1;
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawElementsInstanced(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0, this.n);
	}
}
