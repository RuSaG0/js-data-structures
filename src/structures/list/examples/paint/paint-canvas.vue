<template>
  <div class="paint">
    <div ref="canvasWrapper" class="paint__canvas-wrapper">
      <canvas
        class="paint__canvas"
        ref="canvas"
        height="400px"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
      />
    </div>

    <div class="paint__controls">
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LinkedList } from './LinkedList.ts'

const canvasWrapper = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let isDrawing = false
let lastX = 0
let lastY = 0

const stateList = new LinkedList<ImageData>()

const canUndo = ref(false)
const canRedo = ref(false)

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      saveState()
      updateCanvasWidth()
    }
  }

  window.addEventListener('resize', updateCanvasWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasWidth)
})

const startDrawing = (e: MouseEvent) => {
  isDrawing = true
  if (ctx && canvas.value) {
    const rect = canvas.value.getBoundingClientRect()
    lastX = e.clientX - rect.left
    lastY = e.clientY - rect.top
  }
}

const draw = (e: MouseEvent) => {
  if (!isDrawing || !ctx || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const currentX = e.clientX - rect.left
  const currentY = e.clientY - rect.top

  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(currentX, currentY)
  ctx.stroke()

  lastX = currentX
  lastY = currentY
}

const stopDrawing = () => {
  isDrawing = false
  saveState()
}

const saveState = () => {
  if (ctx && canvas.value) {
    const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height)
    stateList.add(imageData)
    updateButtonStates()
  }
}

const updateButtonStates = () => {
  canUndo.value = stateList.canUndo()
  canRedo.value = stateList.canRedo()
}

const undo = () => {
  const prevState = stateList.undo()
  if (prevState && ctx && canvas.value) {
    ctx.putImageData(prevState, 0, 0)
    updateButtonStates()
  }
}

const redo = () => {
  const nextState = stateList.redo()
  if (nextState && ctx && canvas.value) {
    ctx.putImageData(nextState, 0, 0)
    updateButtonStates()
  }
}

const clear = () => {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    saveState()
  }
}

const updateCanvasWidth = () => {
  if (canvas.value && canvasWrapper.value) {
    canvas.value.width = canvasWrapper.value.getBoundingClientRect().width - 10
    clear()
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;

.paint {
  display: flex;
  flex-direction: column;

  &__canvas-wrapper {
    overflow: hidden;
    display: flex;
    width: 100%;
    border: 1px solid #000;
  }

  &__canvas {
    cursor: crosshair;
  }

  &__controls {
    display: flex;
    margin-top: 10px;
    gap: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
      border: 1px solid #000;
      background: $color-primary-button;

      &:last-child {
        background: $color-accent;
        color: $color-main-text;

        &:hover {
          background: $color-main-text !important;
          color: $color-accent !important;
        }
      }

      &:not([disabled]):hover {
        background: $color-primary-button-hover;
        color: $color-main-text;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>
