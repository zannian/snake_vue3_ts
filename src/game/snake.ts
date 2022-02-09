enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

export default class Snake {
  dir: number
  body: Array<Array<number>>
  last: Array<number>
  alive: boolean
  preDir: number
  constructor(x: number, y: number) {
    this.dir = Direction.Right
    this.body = [[x, y]]
    this.last = []
    this.alive = true
    this.preDir = Direction.Right
  }

  move(): void {
    const body = this.body.slice()
    switch (this.dir) {
      case Direction.Up:
        body.unshift([this.body[0][0], this.body[0][1] - 1])
        this.preDir = Direction.Up
        break
      case Direction.Down:
        body.unshift([this.body[0][0], this.body[0][1] + 1])
        this.preDir = Direction.Down
        break
      case Direction.Right:
        body.unshift([this.body[0][0] + 1, this.body[0][1]])
        this.preDir = Direction.Right
        break
      case Direction.Left:
        body.unshift([this.body[0][0] - 1, this.body[0][1]])
        this.preDir = Direction.Left
        break
    }
    this.last = body.pop() as Array<number>
    // 边界控制
    if (
      body[0][0] >= 24 ||
      body[0][0] < 0 ||
      body[0][1] < 0 ||
      body[0][1] >= 16
    ) {
      this.alive = false
    }
    body.forEach((value, index) => {
      if (value[0] == body[0][0] && value[1] == body[0][1] && index != 0)
        return (this.alive = false)
    })
    this.body = body
  }
  eat(): void {
    this.body.push(this.last)
  }
  //   moveRight(): void {
  //     const body = this.body.slice()
  //     body.unshift([this.body[0][0] + 1, this.body[0][1]])
  //     body.pop()
  //     this.body = body
  //   }
  //   moveLeft(): void {
  //     this.body = this.body.map((value) => {
  //       value[0]--
  //       return value
  //     })
  //   }
  //   moveUp(): void {
  //     this.body = this.body.map((value) => {
  //       value[1]--
  //       return value
  //     })
  //   }
  //   moveDown(): void {
  //     this.body = this.body.map((value) => {
  //       value[1]++
  //       return value
  //     })
  //   }
}
