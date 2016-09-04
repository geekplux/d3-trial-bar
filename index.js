import { select, scaleLinear, max } from 'd3'

const defaultOptions = {
  class: 'bar',
  width: 500,
  height: 200,
  barWidth: 50,
  barPadding: 5
}

export default class Bar {

  constructor (options) {
    this.init(options)
  }

  init (options) {
    const config = Object.assign(defaultOptions, options)

    const y = scaleLinear()
            .domain([0, max(config.data)])
            .range([0, config.height])

    this.chart = select(config.target)

    const svg = this.chart
            .append('svg')
            .attr('class', config.class)
            .attr('width', config.width)
            .attr('height', config.height)

    const group = svg
            .selectAll('g')
            .data(config.data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${i * config.barWidth}, 0)`)

    group
      .append('rect')
      .attr('y', d => config.height - y(d))
      .attr('width', config.barWidth - config.barPadding)
      .attr('height', y)

    group
      .append('text')
      .attr('x', config.barWidth / 2)
      .attr('y', config.height - 10)
      .attr('fill', '#fff')
      .attr('dy', '.35em')
      .text(d => d)
  }
}
