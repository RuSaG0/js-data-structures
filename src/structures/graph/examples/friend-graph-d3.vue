<template>
  <div ref="graph"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const graph = ref(null)

onMounted(() => {
  const nodes = [
    { id: 'Руслан' },
    { id: 'Тимофей' },
    { id: 'Алексей' },
    { id: 'Дарья' },
    { id: 'Елена' },
    { id: 'Фёдор' },
    { id: 'Галина' }
  ];

  const links = [
    { source: 'Руслан', target: 'Тимофей' },
    { source: 'Руслан', target: 'Алексей' },
    { source: 'Тимофей', target: 'Дарья' },
    { source: 'Алексей', target: 'Елена' },
    { source: 'Елена', target: 'Фёдор' },
    { source: 'Фёдор', target: 'Галина' },
    { source: 'Галина', target: 'Руслан' },
    { source: 'Дарья', target: 'Фёдор' }
  ];

  const width = 600
  const height = 400

  const svg = d3.select(graph.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))

  const link = svg.append('g')
    .attr('stroke', '#aaa')
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 2)

  const node = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 15)
    .attr('fill', '#69b3a2')
    .call(drag(simulation))

  const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text(d => d.id)
    .attr('font-size', 12)
    .attr('dx', 18)
    .attr('dy', 4)

  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    label
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  })

  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }
})
</script>

<style scoped>
svg {
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
