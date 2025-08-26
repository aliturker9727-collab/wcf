"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector4 = void 0;
class Vector4 {
    constructor(X, Y, Z, W) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.W = W;
    }
    Add(input) {
        this.X += input.X;
        this.Y += input.Y;
        this.Z += input.Z;
        this.W += input.W;
    }
    Subtract(input) {
        this.X -= input.X;
        this.Y -= input.Y;
        this.Z -= input.Z;
        this.W -= input.W;
    }
    Multiply(input) {
        this.X *= input.X;
        this.Y *= input.Y;
        this.Z *= input.Z;
        this.W *= input.W;
    }
    Divide(input) {
        this.X /= input.X;
        this.Y /= input.Y;
        this.Z /= input.Z;
        this.W /= input.W;
    }
    Equals(input) {
        return this.X === input.X && this.Y === input.Y && this.Z === input.Z && this.W === input.W;
    }
    Normalize() {
        const length = this.length;
        if (length > Number.EPSILON) {
            this.X /= length;
            this.Y /= length;
            this.Z /= length;
            this.W /= length;
        }
    }
    Truncate(max) {
        if (this.length > max) {
            this.Normalize();
            this.Multiply(new Vector4(max, max, max, max));
        }
    }
    Distance(destination) {
        const X = this.X - destination.X;
        const Y = this.Y - destination.Y;
        const Z = this.Z - destination.Z;
        const W = this.W - destination.W;
        return Math.sqrt((W * W) + (Z * Z) + (Y * Y) + (X * X));
    }
    Round() {
        this.X = Math.round(this.X);
        this.Y = Math.round(this.Y);
        this.Z = Math.round(this.Z);
        this.W = Math.round(this.W);
    }
    Copy() {
        return new Vector4(this.X, this.Y, this.Z, this.W);
    }
    get length() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
    }
    Flush() {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
        this.W = 0;
    }
}
exports.Vector4 = Vector4;
