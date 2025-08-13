<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

const graph = ref<HTMLDivElement | null>(null)
let svg: d3.Selection<SVGSVGElement, unknown, any, undefined> | null = null
let simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> | null = null

let link
let node
let label

const width = 600
const height = 400

onMounted(() => {
  initGraph()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

class Graph {
  nodes: { id: string; x?: number; y?: number; fx?: number; fy?: number }[] = []
  links: { source: string; target: string }[] = []

  constructor() {
    svg = d3
      .select(graph.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    simulation = d3
      .forceSimulation(this.nodes)
      .force(
        'link',
        d3
          .forceLink(this.links)
          .id((d) => d.id)
          .distance(100),
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
      label.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })

    this.update()
  }

  addNode(id: string) {
    this.nodes.push({ id })
    this.update()
  }

  addLink(source: string, target: string) {
    this.links.push({ source, target })
    this.update()
  }

  update() {
    simulation?.nodes(this.nodes)
    simulation?.force('link')?.links(this.links)

    let linkGroup = svg.select('.link-group')
    if (linkGroup.empty()) {
      linkGroup = svg.append('g').attr('class', 'link-group')
    }

    let nodeGroup = svg.select('.node-group')
    if (nodeGroup.empty()) {
      nodeGroup = svg.append('g').attr('class', 'node-group')
    }

    let labelGroup = svg.select('.label-group')
    if (labelGroup.empty()) {
      labelGroup = svg.append('g').attr('class', 'label-group')
    }

    link = linkGroup.selectAll('line').data(this.links, (d) => `${d.source}-${d.target}`)

    link.exit().remove()
    link = link.enter().append('line').attr('stroke', '#aaa').attr('stroke-width', 2).merge(link)

    node = nodeGroup.selectAll('circle').data(this.nodes, (d) => d.id)

    node.exit().remove()
    node = node
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', '#69b3a2')
      .call(drag(simulation))
      .merge(node)

    label = labelGroup.selectAll('text').data(this.nodes, (d) => d.id)

    label.exit().remove()
    label = label
      .enter()
      .append('text')
      .text((d: any) => d.id)
      .attr('font-size', 12)
      .attr('dx', 18)
      .attr('dy', 4)
      .merge(label)

    simulation?.alpha(1).restart()
  }
}

function initGraph() {
  const graph = new Graph()

  graph.addNode('Руслан')
  graph.addNode('Тимофей')
  graph.addLink('Руслан', 'Тимофей')
  graph.addNode('Алексей')
  graph.addLink('Руслан', 'Алексей')
  graph.addNode('Дарья')
  graph.addLink('Тимофей', 'Дарья')
  graph.addNode('Елена')
  graph.addLink('Алексей', 'Елена')
  graph.addNode('Фёдор')
  graph.addLink('Елена', 'Фёдор')
  graph.addLink('Дарья', 'Фёдор')
  graph.addNode('Галина')
  graph.addLink('Фёдор', 'Галина')
  graph.addLink('Галина', 'Руслан')
}

function handleResize() {
  const containerWidth = graph.value?.clientWidth ?? width
  const containerHeight = height

  svg
    ?.attr('width', containerWidth)
    .attr('height', containerHeight)
    .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)

  simulation?.force('center', d3.forceCenter(containerWidth / 2, containerHeight / 2))
  simulation?.alpha(1).restart()
}

function drag(_simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> | null) {
  function dragstarted(event, d) {
    if (!event.active) _simulation?.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(event, d) {
    d.fx = event.x
    d.fy = event.y
  }

  function dragended(event, d) {
    if (!event.active) simulation?.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
}
</script>

<template>
  <div class="graph" ref="graph"></div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/breakpoints' as *;
@use '@/assets/styles/colors' as *;

.graph {
  max-width: calc(100vw - 40px - 240px - 20px - 40px);
  background-color: $app-background;
  border: 1px solid #ccc;

  @include tablet {
    max-width: calc(100vw - 20px - 180px - 10px - 40px);
  }

  @include mobile {
    max-width: calc(100vw - 20px);
  }
}
</style>
