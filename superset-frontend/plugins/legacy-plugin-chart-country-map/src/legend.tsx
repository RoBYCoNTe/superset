import d3 from 'd3';

export type LegendProps = {
  top: number;
  left: number;
  title?: string;
  data: any;
  width: number;
  height: number;
  svg: any;
  domain: number[];
  fontSize: number;
  padding: number;
  display:
    | 'None'
    | 'Top'
    | 'TopLeft'
    | 'TopRight'
    | 'Bottom'
    | 'BottomLeft'
    | 'BottomRight';
  orientation: 'Horizontal' | 'Vertical';
  format: (value: number) => any;
  colorScale: any;
  colorSchema: any;
};

function legend({
  top = 0,
  left = 0,
  title,
  data,
  width = 250,
  height = 30,
  svg,
  fontSize = 7,
  padding = 2,
  display = 'None',
  orientation = 'Horizontal',
  format = v => Math.ceil(v),
  colorScale,
  colorSchema,
}: LegendProps): void {
  if (display === 'None') {
    svg.selectAll('.legend').remove();

    return;
  }
  const isHorizontal = orientation === 'Horizontal';
  const mHeight = isHorizontal ? Math.max(60, height * 0.1) : height / 2;
  const mWidth = width / (isHorizontal ? 2 : 4);
  let mLeft = left;
  let mTop = top;

  switch (display) {
    case 'TopRight':
      mLeft = left + width / 2;
      break;
    case 'Bottom':
      mTop = height - mHeight;
      break;
    case 'BottomLeft':
      mTop = height - mHeight;
      break;
    case 'BottomRight':
      mTop = height - mHeight;
      mLeft = left + width / 2;
      break;
    default:
      break;
  }

  const min = Math.min(...data.map((d: { metric: number }) => d.metric));
  const max = Math.max(...data.map((d: { metric: number }) => d.metric));
  const colors = colorSchema.colors || [];
  const domainValues = d3.range(min, max, (max - min) / colors.length);

  const textVSpace = fontSize + padding * 4;
  const additionalTop = title ? textVSpace : 0;

  const w = mWidth / (isHorizontal ? colors.length : 1);
  const h =
    (mHeight - additionalTop - (isHorizontal ? textVSpace : 0)) /
    (isHorizontal ? 1 : colors.length);

  if (title) {
    svg
      .selectAll('text.legend.legend-title')
      .data([title])
      .enter()
      .append('text')
      .attr('class', 'legend legend-title')
      .attr('x', mLeft + mWidth / 2)
      .attr('y', mTop + fontSize + padding * 2)
      .attr('font-size', fontSize)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .text(title);
  }

  svg
    .selectAll('rect.legend.legend-rect')
    .data(domainValues)
    .enter()
    .append('rect')
    .attr('class', 'legend legend-rect')
    .attr('x', (_: any, i: number) => (isHorizontal ? mLeft + i * w : mLeft))
    .attr('y', (_: any, i: number) =>
      isHorizontal ? mTop + additionalTop : mTop + additionalTop + h * i,
    )
    .attr('range', (d: any) => `${d}`)
    .attr('width', w)
    .attr('height', h)
    .attr('fill', (v: number) => colorScale(v))
    .attr('stroke', 'white')
    .attr('stroke-width', padding);

  svg
    .selectAll('text.legend.legend-label')
    .data(domainValues)
    .enter()
    .append('text')
    .attr('class', 'legend legend-label')
    .attr('x', (d: any, i: number) =>
      isHorizontal ? mLeft + (i * w + w / 2) : mWidth / 2,
    )
    .attr('y', (d: any, i: number) =>
      isHorizontal
        ? h + mTop + additionalTop + padding * 4
        : mTop + additionalTop + h * i + padding * 5,
    )
    .attr('width', w)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .text((d: any, i: number) => {
      if (i === 0) {
        return `${format(d)} - ${format(domainValues[i + 1])}`;
      }
      if (i === domainValues.length - 1) {
        return `${format(domainValues[i - 1])} - ${format(d)}`;
      }
      return `${format(domainValues[i - 1])} - ${format(domainValues[i + 1])}`;
    })
    .attr('font-size', fontSize)
    .attr('font-weight', 'normal')
    .attr('fill', (d: any) => {
      if (isHorizontal) {
        return 'black';
      }
      const color = d3.rgb(colorScale(d));
      const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
      return luminance > 128 ? 'black' : 'white';
    });
}

export default legend;
