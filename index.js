import { select as d3select,
         scaleLinear as d3scaleLinear,
         max as d3max,
         axisLeft as d3axisLeft,
         axisRight as d3axisRight,
         axisBottom as d3axisBottom,
         axisTop as d3axisTop } from 'd3'

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
  margin: { top: 20, right: 20, bottom: 40, left: 40 },

  // bars fill color
  barsFill: 'steelblue',

  // enable axis
  enableAxis: false,

  // axis orient
  axisOrient: { x: 'bottom', y: 'left' },

  // axis padding
  axisPadding: 5
}

/**
 * d3 axis methods map.
 */

const axisMap = {
  left: d3axisLeft,
  right: d3axisRight,
  top: d3axisTop,
  bottom: d3axisBottom
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
   * Dimensions without margin.
   */

  dimensions () {
    const { width, height, margin } = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    return [w, h]
  }

  /**
   * Initialize the chart.
   */

  init (options) {
    const { target, className, width, height, margin,
            enableAxis, axisOrient } = this
    const [w, h] = this.dimensions()

    this.chart = d3select(target)
      .append('svg')
      .attr('class', className)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.xScale = d3scaleLinear()
      .range([0, w])
    this.yScale = d3scaleLinear()
      .range([h, 0])

    if (enableAxis) {
      this.xAxis = axisMap[axisOrient.x](this.xScale)
      this.yAxis = axisMap[axisOrient.y](this.yScale)
    }
  }

  /**
   * Render axis.
   */

  renderAxis (data) {
    if (!this.enableAxis) return

    const { xScale, yScale, xAxis, yAxis, axisPadding } = this
    const [w, h] = this.dimensions()

    xScale.domain([0, data.length])
    yScale.domain([0, d3max(data, d => d.value)])

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h + axisPadding})`)
      .call(xAxis)

    this.chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${-axisPadding}, 0)`)
      .call(yAxis)
  }

  /**
   * Render bars.
   */

  renderBars (data) {
    const { barPadding, yScale, barsFill } = this
    const [w, h] = this.dimensions()
    const barWidth = w / data.length

    yScale.domain([0, d3max(data, d => d.value)])

    this.chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => yScale(d.value))
      .attr('width', barWidth - barPadding)
      .attr('height', d => h - yScale(d.value))
      .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)
      .style('fill', barsFill)
  }

  /**
   * Render the chart through the given `data`
   */

  render (data) {
    this.data = data
    this.renderAxis(data)
    this.renderBars(data)
  }
}
