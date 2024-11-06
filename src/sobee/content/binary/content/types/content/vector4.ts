export class Vector4 {
  constructor(
    public X: number,
    public Y: number,
    public Z: number,
    public W: number,
  ) { }

  public Add(input: Vector4): void {
    this.X += input.X
    this.Y += input.Y
    this.Z += input.Z
    this.W += input.W
  }

  public Subtract(input: Vector4): void {
    this.X -= input.X
    this.Y -= input.Y
    this.Z -= input.Z
    this.W -= input.W
  }

  public Multiply(input: Vector4): void {
    this.X *= input.X
    this.Y *= input.Y
    this.Z *= input.Z
    this.W *= input.W
  }

  public Divide(input: Vector4): void {
    this.X /= input.X
    this.Y /= input.Y
    this.Z /= input.Z
    this.W /= input.W
  }

  public Equals(input: Vector4): boolean {
    return this.X === input.X && this.Y === input.Y && this.Z === input.Z && this.W === input.W
  }

  public Normalize(): void {
    const length = this.length
    if (length > Number.EPSILON) {
      this.X /= length
      this.Y /= length
      this.Z /= length
      this.W /= length
    }
  }

  public Truncate(max: number): void {
    if (this.length > max) {
      this.Normalize()
      this.Multiply(new Vector4(max, max, max, max))
    }
  }

  public Distance(destination: Vector4): number {
    const X = this.X - destination.X
    const Y = this.Y - destination.Y
    const Z = this.Z - destination.Z
    const W = this.W - destination.W
    return Math.sqrt((W * W) + (Z * Z) + (Y * Y) + (X * X))
  }

  public Round(): void {
    this.X = Math.round(this.X)
    this.Y = Math.round(this.Y)
    this.Z = Math.round(this.Z)
    this.W = Math.round(this.W)
  }

  public Copy(): Vector4 {
    return new Vector4(this.X, this.Y, this.Z, this.W)
  }

  public get length(): number {
    return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W))
  }

  public Flush(): void {
    this.X = 0
    this.Y = 0
    this.Z = 0
    this.W = 0
  }
}
