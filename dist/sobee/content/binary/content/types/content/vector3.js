"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = void 0;
class Vector3 {
    constructor(X, Y, Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    Add(input) {
        this.X += input.X;
        this.Y += input.Y;
        this.Z += input.Z;
    }
    Subtract(input) {
        this.X -= input.X;
        this.Y -= input.Y;
        this.Z -= input.Z;
    }
    Multiply(input) {
        this.X *= input.X;
        this.Y *= input.Y;
        this.Z *= input.Z;
    }
    Divide(input) {
        this.X /= input.X;
        this.Y /= input.Y;
        this.Z /= input.Z;
    }
    Equals(input) {
        return this.X === input.X && this.Y === input.Y && this.Z === input.Z;
    }
    Normalize() {
        const length = this.length;
        if (length > Number.EPSILON) {
            this.X /= length;
            this.Y /= length;
            this.Z /= length;
        }
    }
    Truncate(max) {
        if (this.length > max) {
            this.Normalize();
            this.Multiply(new Vector3(max, max, max));
        }
    }
    Distance(destination) {
        const X = this.X - destination.X;
        const Y = this.Y - destination.Y;
        const Z = this.Z - destination.Z;
        return Math.sqrt((Z * Z) + (Y * Y) + (X * X));
    }
    Round() {
        this.X = Math.round(this.X);
        this.Y = Math.round(this.Y);
        this.Z = Math.round(this.Z);
    }
    Copy() {
        return new Vector3(this.X, this.Y, this.Z);
    }
    get length() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
    }
    Flush() {
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
    }
}
exports.Vector3 = Vector3;
