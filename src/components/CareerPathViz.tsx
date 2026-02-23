import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

export const CareerPathViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

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

    const simulation = d3.forceSimulation(data.nodes as Node[])
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#e5e7eb")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => {
        const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];
        return colors[d.group - 1];
      });

    node.append("text")
      .text(d => d.id)
      .attr("x", 12)
      .attr("y", 4)
      .style("font-size", "12px")
      .style("font-family", "Inter")
      .style("font-weight", "500")
      .style("fill", "#374151");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-zinc-900 mb-4">Career Path Visualization</h3>
      <div className="overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100">
        <svg ref={svgRef} className="w-full h-auto" />
      </div>
      <p className="text-xs text-zinc-500 mt-4 italic">Interactive visualization of potential career progressions based on your skills.</p>
    </div>
  );
};
