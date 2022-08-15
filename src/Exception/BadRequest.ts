class BadRequest extends Error {
  private readonly code = 'BAD_REQUEST'
  private readonly alert: string

  constructor(private readonly status: number, readonly message: string) {
    super(message)
    this.alert = message
  }

  public getMessage() {
    return this.alert
  }

  public getStatus() {
    return this.status
  }

  public getCode() {
    return this.code
  }
}

export default BadRequest
