import { select, scaleLinear, max } from 'd3'

/**
 * Default config.
 */

const defaults = {
  // target element or selector to contain the svg
  target: null,

  // class of the svg
  className: 'bar',

  // width of chart
  width: 500,

  // height of chart
  height: 200,

  // padding between bars
  barPadding: 5,

  // margin
  margin: { top: 15, right: 0, bottom: 35, left: 60 },

  // fill color
  color: 'steelblue'
}

/**
 * BarChart.
 */

export default class Bar {

  /**
   * Construct with the given `config`.
   */

  constructor (options) {
    this.set(options)
    this.init()
  }

  /**
   * Set configuration options.
   */

  set (options) {
    Object.assign(this, defaults, options)
  }

  /**
   * Initialize the chart.
   */

  init (options) {
    const { target, className, width, height } = this

    this.y = scaleLinear()
            .range([0, height])

    this.chart = select(target)
            .append('svg')
            .attr('class', className)
            .attr('width', width)
            .attr('height', height)
  }

  /**
   * Render the chart through the given `data`
   */
  render (data) {
    const { width, height, barPadding, y, color } = this
    const barWidth = width / data.length

    y.domain([0, max(data, d => d.value)])

    const group = this.chart
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)

    group
      .append('rect')
      .attr('y', d => height - y(d.value))
      .attr('width', barWidth - barPadding)
      .attr('height', d => y(d.value))
      .style('fill', color)
  }
}
