export class Vector3 {
  constructor(
    public X: number,
    public Y: number,
    public Z: number,
  ) { }

  public Add(input: Vector3): void {
    this.X += input.X
    this.Y += input.Y
    this.Z += input.Z
  }

  public Subtract(input: Vector3): void {
    this.X -= input.X
    this.Y -= input.Y
    this.Z -= input.Z
  }

  public Multiply(input: Vector3): void {
    this.X *= input.X
    this.Y *= input.Y
    this.Z *= input.Z
  }

  public Divide(input: Vector3): void {
    this.X /= input.X
    this.Y /= input.Y
    this.Z /= input.Z
  }

  public Equals(input: Vector3): boolean {
    return this.X === input.X && this.Y === input.Y && this.Z === input.Z
  }

  public Normalize(): void {
    const length = this.length
    if (length > Number.EPSILON) {
      this.X /= length
      this.Y /= length
      this.Z /= length
    }
  }

  public Truncate(max: number): void {
    if (this.length > max) {
      this.Normalize()
      this.Multiply(new Vector3(max, max, max))
    }
  }

  public Distance(destination: Vector3): number {
    const X = this.X - destination.X
    const Y = this.Y - destination.Y
    const Z = this.Z - destination.Z
    return Math.sqrt((Z * Z) + (Y * Y) + (X * X))
  }

  public Round(): void {
    this.X = Math.round(this.X)
    this.Y = Math.round(this.Y)
    this.Z = Math.round(this.Z)
  }

  public Copy(): Vector3 {
    return new Vector3(this.X, this.Y, this.Z)
  }

  public get length(): number {
    return Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z))
  }

  public Flush(): void {
    this.X = 0
    this.Y = 0
    this.Z = 0
  }
}
