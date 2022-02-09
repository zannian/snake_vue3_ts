export default class Food {
  pst: Array<number>
  constructor() {
    this.pst = [5, 8]
  }
  refresh(body: Array<Array<number>>): void {
    const pst = this.random(body)
    pst && (this.pst = pst)
  }
  random(body: Array<Array<number>>): Array<number> | void {
    const x = Math.floor(Math.random() * 24)
    const y = Math.floor(Math.random() * 16)
    let flag = true
    body.forEach((value) => {
      if (value[0] !== x || value[1] !== y) flag = false
    })
    if (!flag) return [x, y]
    this.random(body)
  }
}
