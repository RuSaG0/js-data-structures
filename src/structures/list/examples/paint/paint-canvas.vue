<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { LinkedList } from './types.ts'

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

const getEventCoordinates = (e: MouseEvent | TouchEvent) => {
  if (!canvas.value) return { clientX: 0, clientY: 0 }
  const rect = canvas.value.getBoundingClientRect()
  if ('touches' in e) {
    return {
      clientX: e.touches[0].clientX - rect.left,
      clientY: e.touches[0].clientY - rect.top
    }
  } else {
    return {
      clientX: e.clientX - rect.left,
      clientY: e.clientY - rect.top
    }
  }
}

const startDrawing = (e: MouseEvent | TouchEvent) => {
  isDrawing = true
  const { clientX, clientY } = getEventCoordinates(e)
  lastX = clientX
  lastY = clientY
}

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing || !ctx || !canvas.value) return
  e.preventDefault()
  const { clientX, clientY } = getEventCoordinates(e)
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(clientX, clientY)
  ctx.stroke()
  lastX = clientX
  lastY = clientY
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
    canvas.value.width = canvasWrapper.value.clientWidth - 10
    clear()
  }
}
</script>

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
        @touchstart="startDrawing"
        @touchmove="draw"
        @touchend="stopDrawing"
      />
    </div>
    <div class="paint__controls">
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

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
      cursor: pointer;
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
