(function () {

    let fontSize = "12px";
    let svgHeight = 325;
    let svgWidth = 900;
    let radius = 6;
    let margin = { top: 20, right: 20, bottom: 30, left: 40 };

    programmaticRisingSvg();
    topPerformingVerticalsSvg();
    function programmaticRisingSvg() {
        let element = d3.select("#programmaticRisingSvg");
        let svg = element.append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + svgWidth + " " + (svgHeight));

        let data = [
            { "title": "Africa", "value1": "10", "value2": "15", "text1": "0.1%", "text2": "0.1%" },
            { "title": "LATAM", "value1": "25", "value2": "30", "text1": "0.4%", "text2": "0.6%" },
            { "title": "Middle East", "value1": "100", "value2": "110", "text1": "2.0%", "text2": "3.9%" },
            { "title": "APAC", "value1": "175", "value2": "150", "text1": "10.4%", "text2": "6.2%" },
            { "title": "Europe", "value1": "240", "value2": "250", "text1": "19.4%", "text2": "21.7%" },
            { "title": "North America", "value1": "500", "value2": "490", "text1": "67.7%", "text2": "67.4%" },
        ];

        generate(svg, data);
    }

    function topPerformingVerticalsSvg() {
        let element = d3.select("#topPerformingVerticalsSvg");
        let svg = element.append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + svgWidth + " " + (svgHeight));

        let data = [
            { "title": "Health & Parma", "value1": "80", "value2": "70", "text1": "3.1%", "text2": "2.9%" },
            { "title": "Games", "value1": "165", "value2": "115", "text1": "7.0%", "text2": "4.7%" },
            { "title": "Tech", "value1": "200", "value2": "330", "text1": "8.8%", "text2": "13.3%" },
            { "title": "Entertainment", "value1": "230", "value2": "270", "text1": "9.2%", "text2": "10.7%" },
            { "title": "Retail", "value1": "290", "value2": "180", "text1": "11.7%", "text2": "7.5%" },
            { "title": "CPG", "value1": "480", "value2": "440", "text1": "18.9%", "text2": "16.9%" },
        ];

        generate(svg, data, false);
    }

    function generate(svg, data, pathLineRequired = true) {
        let width = svgWidth - margin.left - margin.right;
        let height = svgHeight - (10 * margin.top) - margin.bottom;
        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + (10 * margin.top) + ")");

        let xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        let yScale = d3.scaleLinear().rangeRound([height, 0]);

        xScale.domain(data.map(function (d) { return d.title }));
        yScale.domain([0, 275]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        g.append("g")
            .selectAll(".bar-bg")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar-bg")
            .attr("x", function (d) { return xScale(d.title) + 25 + xScale.bandwidth() / 4; })
            .attr("y", function (d) { return yScale(d.value2); })
            .attr("width", xScale.bandwidth() / 2 - 35)
            .attr("height", function (d) { return height - yScale(d.value2); });

        g.append("g")
            .selectAll(".bar-fg")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar-fg")
            .attr("x", function (d) { return xScale(d.title) + 5 + xScale.bandwidth() / 4; })
            .attr("y", function (d) { return yScale(d.value1); })
            .attr("width", xScale.bandwidth() / 2 - 35)
            .attr("height", function (d) { return height - yScale(d.value1); });

        g.append("g")
            .selectAll(".cir")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "cir")
            .attr("r", radius)
            .attr("cx", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2); })
            .attr("cy", function (d) { return yScale(d3.max([d.value1, d.value2])) - 15; })
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("r", radius * 1.5)
                    .attr("class", "cirhover");
                svg.select(".vline" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 1);
                svg.select(".tcir" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 1);
                if (filter === 0 || filter === 1) {
                    svg.select(".tvalue" + d.value1)
                        .transition().duration(200)
                        .style("opacity", 1);
                    svg.select(".bar-fg-hover" + d.value1)
                        .transition().duration(200)
                        .style("opacity", 1);
                }
                if (filter === 0 || filter === 2) {
                    svg.select(".tvalue" + d.value2)
                        .transition().duration(200)
                        .style("opacity", 1);
                    svg.select(".bar-bg-hover" + d.value1)
                        .transition().duration(200)
                        .style("opacity", 1);
                }
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr("r", radius)
                    .attr("class", "cir");
                svg.select(".vline" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 0);
                svg.select(".tvalue" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 0);
                svg.select(".tvalue" + d.value2)
                    .transition().duration(200)
                    .style("opacity", 0);
                svg.select(".tcir" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 0);
                svg.select(".bar-fg-hover" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 0);
                svg.select(".bar-bg-hover" + d.value1)
                    .transition().duration(200)
                    .style("opacity", 0);
            });

        g.append("g")
            .selectAll(".vline")
            .data(data)
            .enter()
            .append("line")
            .attr("class", function (d) {
                let c1 = "vline";
                let c2 = "vline" + d.value1;
                return c1 + " " + c2;
            })
            .attr("x1", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) })
            .attr("y1", function (d) { return yScale(d3.max([d.value1, d.value2])) - 25 })
            .attr("x2", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) })
            .attr("y2", function (d) { return yScale(d3.max([d.value1, d.value2])) - 90 });

        g.append("g")
            .selectAll(".tcir")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) {
                let c1 = "tcir";
                let c2 = "tcir" + d.value1;
                return c1 + " " + c2;
            })
            .attr("r", radius / 2)
            .attr("cx", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2); })
            .attr("cy", function (d) { return yScale(d3.max([d.value1, d.value2])) - 95; });

        g.append("g")
            .selectAll(".bar-fg-hover")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", function (d) {
                let c1 = "bar-fg-hover";
                let c2 = "bar-fg-hover" + d.value1;
                return c1 + " " + c2;
            })
            .attr("x", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) + 15; })
            .attr("y", function (d) { return yScale(d3.max([d.value1, d.value2])) - 110; })
            .attr("width", 5)
            .attr("height", 5);

        g.append("g")
            .selectAll(".tvalue1")
            .data(data)
            .enter()
            .append("text")
            .attr("class", function (d) {
                let c1 = "tvalue1";
                let c2 = "tvalue" + d.value1;
                return c1 + " " + c2;
            })
            .text(function (d) { return d.text1 })
            .attr("x", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) + 30; })
            .attr("y", function (d) { return yScale(d3.max([d.value1, d.value2])) - 105; });

        g.append("g")
            .selectAll(".bar-bg-hover")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", function (d) {
                let c1 = "bar-bg-hover";
                let c2 = "bar-bg-hover" + d.value1;
                return c1 + " " + c2;
            })
            .attr("x", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) + 15; })
            .attr("y", function (d) { return yScale(d3.max([d.value1, d.value2])) - 90; })
            .attr("width", 5)
            .attr("height", 5);

        g.append("g")
            .selectAll(".tvalue2")
            .data(data)
            .enter()
            .append("text")
            .attr("class", function (d) {
                let c1 = "tvalue2";
                let c2 = "tvalue" + d.value2;
                return c1 + " " + c2;
            })
            .text(function (d) { return d.text2 })
            .attr("x", function (d) { return xScale(d.title) + (xScale.bandwidth() / 2) + 30; })
            .attr("y", function (d) { return yScale(d3.max([d.value1, d.value2])) - 85; });

        if (pathLineRequired) {
            let line = d3.line()
                .x(function (d, i) { return xScale(d.title) + (xScale.bandwidth() / 2) })
                .y(function (d) { return yScale(d3.max([d.value1, d.value2])) - 15 });

            g.append("path")
                .attr("class", "pathline")
                .attr("d", line(data));
        }

        let buttonG = svg.append("g")
            .attr("transform", "translate(-10,0)");
        let filter = 0;
        let button1G = buttonG.append("g")
            .on("click", function () {
                filter = 0;
                svg.select(".rectBtnDefault1").attr("class", "rectBtnActive rectBtnDefault1");
                svg.select(".textBtnDefault1").attr("class", "textBtnActive textBtnDefault1");

                svg.select(".rectBtnDefault2").attr("class", "rectBtnDefault rectBtnDefault2");
                svg.select(".textBtnDefault2").attr("class", "textBtnDefault textBtnDefault2");

                svg.select(".rectBtnDefault3").attr("class", "rectBtnDefault rectBtnDefault3");
                svg.select(".textBtnDefault3").attr("class", "textBtnDefault textBtnDefault3");

                svg.selectAll(".bar-bg").transition().duration(1000).attr("transform", "translate(0,0)").style("opacity", 1);
                svg.selectAll(".bar-fg").transition().duration(1000).attr("transform", "translate(0,0)").style("opacity", 1);

                svg.selectAll(".cir").transition().duration(1000).attr("cy", function (d) {
                    return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 15 : (filter === 1 ? yScale(d.value1) - 15 : yScale(d.value2) - 15);
                });

                svg.selectAll(".vline")
                    .attr("y1", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 25 : (filter === 1 ? yScale(d.value1) - 25 : yScale(d.value2) - 25);
                    })
                    .attr("y2", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 90 : (filter === 1 ? yScale(d.value1) - 90 : yScale(d.value2) - 90);
                    });

                svg.selectAll(".tcir")
                    .attr("cy", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 95 : (filter === 1 ? yScale(d.value1) - 95 : yScale(d.value2) - 95);
                    });


                d3.event.stopPropagation();
            });

        let button2G = buttonG.append("g")
            .on("click", function () {
                filter = 1;
                svg.select(".rectBtnDefault1").attr("class", "rectBtnDefault rectBtnDefault1");
                svg.select(".textBtnDefault1").attr("class", "textBtnDefault textBtnDefault1");

                svg.select(".rectBtnDefault2").attr("class", "rectBtnActive rectBtnDefault2");
                svg.select(".textBtnDefault2").attr("class", "textBtnActive textBtnDefault2");

                svg.select(".rectBtnDefault3").attr("class", "rectBtnDefault rectBtnDefault3");
                svg.select(".textBtnDefault3").attr("class", "textBtnDefault textBtnDefault3");

                svg.selectAll(".bar-bg").transition().duration(1000).attr("transform", "translate(0,0)").style("opacity", 0);
                svg.selectAll(".bar-fg").transition().duration(1000).attr("transform", "translate(13.25,0)").style("opacity", 1);

                svg.selectAll(".cir").transition().duration(1000).attr("cy", function (d) {
                    return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 15 : (filter === 1 ? yScale(d.value1) - 15 : yScale(d.value2) - 15);
                });

                svg.selectAll(".vline")
                    .attr("y1", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 25 : (filter === 1 ? yScale(d.value1) - 25 : yScale(d.value2) - 25);
                    })
                    .attr("y2", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 90 : (filter === 1 ? yScale(d.value1) - 90 : yScale(d.value2) - 90);
                    });

                svg.selectAll(".tcir")
                    .attr("cy", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 95 : (filter === 1 ? yScale(d.value1) - 95 : yScale(d.value2) - 95);
                    });

                d3.event.stopPropagation();
            });

        let button3G = buttonG.append("g")
            .on("click", function () {
                filter = 2;
                svg.select(".rectBtnDefault1").attr("class", "rectBtnDefault rectBtnDefault1");
                svg.select(".textBtnDefault1").attr("class", "textBtnDefault textBtnDefault1");

                svg.select(".rectBtnDefault2").attr("class", "rectBtnDefault rectBtnDefault2");
                svg.select(".textBtnDefault2").attr("class", "textBtnDefault textBtnDefault2");

                svg.select(".rectBtnDefault3").attr("class", "rectBtnActive rectBtnDefault3");
                svg.select(".textBtnDefault3").attr("class", "textBtnActive textBtnDefault3");

                svg.selectAll(".bar-fg").transition().duration(1000).attr("transform", "translate(0,0)").style("opacity", 0);
                svg.selectAll(".bar-bg").transition().duration(1000).attr("transform", "translate(-7.25,0)").style("opacity", 1);

                svg.selectAll(".cir").transition().duration(1000).attr("cy", function (d) {
                    return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 15 : (filter === 1 ? yScale(d.value1) - 15 : yScale(d.value2) - 15);
                });

                svg.selectAll(".vline")
                    .attr("y1", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 25 : (filter === 1 ? yScale(d.value1) - 25 : yScale(d.value2) - 25);
                    })
                    .attr("y2", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 90 : (filter === 1 ? yScale(d.value1) - 90 : yScale(d.value2) - 90);
                    });

                svg.selectAll(".tcir")
                    .attr("cy", function (d) {
                        return filter === 0 ? yScale(d3.max([d.value1, d.value2])) - 95 : (filter === 1 ? yScale(d.value1) - 95 : yScale(d.value2) - 95);
                    });

                d3.event.stopPropagation();
            });

        button1G.append("rect")
            .attr("class", "rectBtnActive rectBtnDefault1")
            .attr("x", 10)
            .attr("y", 10)
            .attr("width", 100)
            .attr("height", 30)
            .attr("rx", "15")
            .attr("ry", "15")
            .on("mouseover", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            });

        button1G.append("text")
            .attr("class", "textBtnActive textBtnDefault1")
            .text("All (Q1 & Q2)")
            .attr("x", 26)
            .attr("y", 30)
            .on("mouseover", function () {
                d3.select(".rectBtnDefault1").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault1").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault1").classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(".rectBtnDefault1").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault1").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault1").classed("rectBtnActive"));
            });

        button2G.append("rect")
            .attr("class", "rectBtnDefault rectBtnDefault2")
            .attr("x", 120)
            .attr("y", 10)
            .attr("width", 150)
            .attr("height", 30)
            .attr("rx", "15")
            .attr("ry", "15")
            .on("mouseover", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            });

        button2G.append("rect")
            .attr("class", "bar-fg1")
            .attr("x", 130)
            .attr("y", 22.5)
            .attr("width", 7.5)
            .attr("height", 7.5);

        button2G.append("text")
            .attr("class", "textBtnDefault textBtnDefault2")
            .text("Q2 2016 (Apr - Jun)")
            .attr("x", 148)
            .attr("y", 30)
            .on("mouseover", function () {
                d3.select(".rectBtnDefault2").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault2").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault2").classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(".rectBtnDefault2").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault2").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault2").classed("rectBtnActive"));
            });

        button3G.append("rect")
            .attr("class", "rectBtnDefault rectBtnDefault3")
            .attr("x", 280)
            .attr("y", 10)
            .attr("width", 150)
            .attr("height", 30)
            .attr("rx", "15")
            .attr("ry", "15")
            .on("mouseover", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(this).classed("rectBtnDefaultHover", !d3.select(this).classed("rectBtnDefaultHover") && !d3.select(this).classed("rectBtnActive"));
            });

        button3G.append("rect")
            .attr("class", "bar-bg1")
            .attr("x", 290)
            .attr("y", 22.5)
            .attr("width", 7.5)
            .attr("height", 7.5);

        button3G.append("text")
            .attr("class", "textBtnDefault textBtnDefault3")
            .text("Q1 2016 (Jan - Mar)")
            .attr("x", 308)
            .attr("y", 30)
            .on("mouseover", function () {
                d3.select(".rectBtnDefault3").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault3").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault3").classed("rectBtnActive"));
            })
            .on("mouseout", function () {
                d3.select(".rectBtnDefault3").classed("rectBtnDefaultHover", !d3.select(".rectBtnDefault3").classed("rectBtnDefaultHover") && !d3.select(".rectBtnDefault3").classed("rectBtnActive"));
            });

    }

}());