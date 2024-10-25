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

export class Cube extends Model {
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
