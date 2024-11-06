export class Vector2 {
  constructor(
    public X: number,
    public Y: number,
  ) { }

  public Add(input: Vector2): void {
    this.X += input.X
    this.Y += input.Y
  }

  public Subtract(input: Vector2): void {
    this.X -= input.X
    this.Y -= input.Y
  }

  public Multiply(input: Vector2): void {
    this.X *= input.X
    this.Y *= input.Y
  }

  public Divide(input: Vector2): void {
    this.X /= input.X
    this.Y /= input.Y
  }

  public Equals(input: Vector2): boolean {
    return this.X === input.X && this.Y === input.Y
  }

  public Normalize(): void {
    const length = this.length
    if (length > Number.EPSILON) {
      this.X /= length
      this.Y /= length
    }
  }

  public Truncate(max: number): void {
    if (this.length > max) {
      this.Normalize()
      this.Multiply(new Vector2(max, max))
    }
  }

  public Distance(destination: Vector2): number {
    const Y = this.Y - destination.Y
    const X = this.X - destination.X
    return Math.sqrt((Y * Y) + (X * X))
  }

  public Round(): void {
    this.X = Math.round(this.X)
    this.Y = Math.round(this.Y)
  }

  public Copy(): Vector2 {
    return new Vector2(this.X, this.Y)
  }

  public get length(): number {
    return Math.sqrt((this.X * this.X) + (this.Y * this.Y))
  }

  public Flush(): void {
    this.X = 0
    this.Y = 0
  }
}
