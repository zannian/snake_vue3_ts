<template>
  <div class="stage">
    <div
      class="snake"
      v-for="(item, index) in body"
      :style="{ left: item[0] * 50 + 'px', top: item[1] * 50 + 'px' }"
      :key="index"
    ></div>
    <div class="food" :style="{ left: fp[0] * 50 + 'px', top: fp[1] * 50 + 'px' }"></div>
    <div class="gg" v-if="gg == true">菜</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Snake from '@/game/snake'
import Food from '@/game/food'
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      body: [] as Array<Array<number>>,
      fp: [] as Array<number>,
      gg: false
    }
  },
  methods: {
  },
  created() {
    const snake = new Snake(5, 5)
    const food = new Food()
    this.fp = food.pst
    document.body.addEventListener('keydown', (e) => {
      if (e.code == 'ArrowUp' && snake.preDir != Direction.Down) {
        snake.dir = Direction.Up
      } else if (e.code == 'ArrowDown' && snake.preDir != Direction.Up) {
        snake.dir = Direction.Down
      } else if (e.code == 'ArrowRight' && snake.preDir != Direction.Left) {
        snake.dir = Direction.Right
      } else if (e.code == 'ArrowLeft' && snake.preDir != Direction.Right) {
        snake.dir = Direction.Left
      }
    })
    // this.body = snake.body
    setInterval(() => {

      snake.move()
      if (snake.body[0][0] === this.fp[0] && snake.body[0][1] === this.fp[1]) {
        snake.eat()
        food.refresh(snake.body)
        this.fp = food.pst
      }
      if (!snake.alive) return this.gg = true
      this.body = snake.body

    }, 300)

  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.stage {
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  border: 2px solid slategrey;
  box-shadow: 0px 2px 3px gray;
  background-color: steelblue;
  position: relative;
  .snake {
    width: 50px;
    height: 50px;
    position: absolute;
    background-color: green;
  }
  .food {
    width: 50px;
    height: 50px;
    position: absolute;
    background-color: #912266;
  }
  .gg {
    position: relative;
    z-index: 999;
    text-align: center;
    line-height: 800px;
    font-size: 200px;
    font-family: "楷体", "楷体_GB2312";
    color: #7c3131;
    background: #ffffff57;
  }
}
</style>
