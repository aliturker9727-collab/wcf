"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    Add(input) {
        this.X += input.X;
        this.Y += input.Y;
    }
    Subtract(input) {
        this.X -= input.X;
        this.Y -= input.Y;
    }
    Multiply(input) {
        this.X *= input.X;
        this.Y *= input.Y;
    }
    Divide(input) {
        this.X /= input.X;
        this.Y /= input.Y;
    }
    Equals(input) {
        return this.X === input.X && this.Y === input.Y;
    }
    Normalize() {
        const length = this.length;
        if (length > Number.EPSILON) {
            this.X /= length;
            this.Y /= length;
        }
    }
    Truncate(max) {
        if (this.length > max) {
            this.Normalize();
            this.Multiply(new Vector2(max, max));
        }
    }
    Distance(destination) {
        const Y = this.Y - destination.Y;
        const X = this.X - destination.X;
        return Math.sqrt((Y * Y) + (X * X));
    }
    Round() {
        this.X = Math.round(this.X);
        this.Y = Math.round(this.Y);
    }
    Copy() {
        return new Vector2(this.X, this.Y);
    }
    get length() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    }
    Flush() {
        this.X = 0;
        this.Y = 0;
    }
}
exports.Vector2 = Vector2;
