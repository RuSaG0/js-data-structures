<template>
  <div class="canvas-container">
    <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    <div class="controls">
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LinkedList } from '@/structures/list/examples/paint/LinkedList.ts'

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const stateList = new LinkedList<ImageData>();

const canUndo = ref(false);
const canRedo = ref(false);

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      saveState();
    }
  }
});

const startDrawing = (e: MouseEvent) => {
  isDrawing = true;
  if (ctx && canvas.value) {
    const rect = canvas.value.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
  }
};

const draw = (e: MouseEvent) => {
  if (!isDrawing || !ctx || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  lastX = currentX;
  lastY = currentY;
};

const stopDrawing = () => {
  isDrawing = false;
  saveState();
};

const saveState = () => {
  if (ctx && canvas.value) {
    const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
    stateList.add(imageData);
    updateButtonStates();
  }
};

const updateButtonStates = () => {
  canUndo.value = stateList.canUndo();
  canRedo.value = stateList.canRedo();
};

const undo = () => {
  const prevState = stateList.undo();
  if (prevState && ctx && canvas.value) {
    ctx.putImageData(prevState, 0, 0);
    updateButtonStates();
  }
};

const redo = () => {
  const nextState = stateList.redo();
  if (nextState && ctx && canvas.value) {
    ctx.putImageData(nextState, 0, 0);
    updateButtonStates();
  }
};

const clear = () => {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    saveState();
  }
};
</script>

<style lang="scss" scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  canvas {
    border: 1px solid #000;
    cursor: crosshair;
  }

  .controls {
    margin-top: 10px;

    button {
      margin: 0 5px;
      padding: 5px 10px;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
