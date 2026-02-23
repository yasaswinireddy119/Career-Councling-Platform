import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const CareerPathViz = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    const data = {
      nodes: [
        { id: "Junior Dev", group: 1 },
        { id: "Mid-level Dev", group: 1 },
        { id: "Senior Dev", group: 1 },
        { id: "Tech Lead", group: 2 },
        { id: "Engineering Manager", group: 2 },
        { id: "Product Manager", group: 3 },
        { id: "CTO", group: 4 },
      ],
      links: [
        { source: "Junior Dev", target: "Mid-level Dev", value: 1 },
        { source: "Mid-level Dev", target: "Senior Dev", value: 1 },
        { source: "Senior Dev", target: "Tech Lead", value: 1 },
        { source: "Senior Dev", target: "Engineering Manager", value: 1 },
        { source: "Senior Dev", target: "Product Manager", value: 1 },
        { source: "Tech Lead", target: "CTO", value: 1 },
        { source: "Engineering Manager", target: "CTO", value: 1 },
      ]
    };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id((d) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#f1f5f9")
      .attr("stroke-opacity", 1)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 10)
      .attr("fill", "white")
      .attr("stroke", (d) => {
        const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
        return colors[d.group - 1];
      })
      .attr("stroke-width", 3)
      .attr("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.05))");

    node.append("text")
      .text(d => d.id)
      .attr("x", 16)
      .attr("y", 4)
      .style("font-size", "11px")
      .style("font-family", "Inter")
      .style("font-weight", "700")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "0.05em")
      .style("fill", "#64748b");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/60 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
          <h3 className="text-xl font-bold text-zinc-900">Career Path Visualization</h3>
        </div>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">Interactive Graph</span>
      </div>
      <div className="overflow-hidden rounded-2xl bg-zinc-50/50 border border-zinc-100">
        <svg ref={svgRef} className="w-full h-auto" />
      </div>
      <div className="mt-6 flex items-center justify-center space-x-6">
        {[
          { label: 'Entry', color: 'bg-brand-500' },
          { label: 'Management', color: 'bg-emerald-500' },
          { label: 'Product', color: 'bg-amber-500' },
          { label: 'Executive', color: 'bg-red-500' },
        ].map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
