export default class Model {
    constructor(gl) {
        this.gl = gl;
        this.vbo = null;
        this.vao = null;
        this.ebo = null;
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

export class Cube extends Model {
    setup() {
        const vertices = new Float32Array([
            -0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,
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
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

        this.ebo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
    }

    render() {
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
    }
}
