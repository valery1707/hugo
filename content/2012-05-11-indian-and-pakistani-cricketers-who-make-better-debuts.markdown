---
image:
  feature: /images/threaded-blue-on-black-cropped.jpg
layout: post
title: "Indian and Pakistani cricketers - who make better debuts?"
date: 2012-05-11 23:26
comments: true
categories: data visualisation javascript d3.js cricket india pakistan
---
Recently a friend and I had an argument about who makes better debuts among Indian and Pakistani cricket players. Now, I am not into cricket. But I do watch the odd matches here and there and am generally aware of what is going on in the game. My stand was that Pakistani players make better debuts compared to Indian players, while my friend was adamant that Indian players make better debuts. My friend is more of a cricket guy than I ever was and he asked me what is the basis of my stand. It was just a gut feel for me and I had to leave it as there was no way for me to prove that my gut feel was correct. But I did want to try, though.

I decided to see if I could prove my theory. Luckily, Cricinfo has all this data, although they dont make it easy for you to get it. I wrote some scripts to pull this data and decided to visualise this using the awesome d3 library. In the end, this became more about figuring out d3 than winning the argument, but doing this was fun.

<!--more-->

This is what the end result looks like:

## Batsmen

<script type="text/javascript" src="/visualizations/debuts/d3.v2.js"></script>
<script type="text/javascript" src="/visualizations/debuts/utils.js"></script>
<link type="text/css" rel="stylesheet" href="/visualizations/debuts/stylesheet.css"></link>

<div class="visBatsmen">
</div>
<script type="text/javascript">

var w = 1000;
var h = 500;
var barPadding = 1;
var padding = 30;
var colorMap = {
    "India": "#1f77b4",
    "Pakistan": "#637939"
};

var svgBat = d3.select(".visBatsmen")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

function totalRuns(d) {
    return Number(d.performance.Runs);
};

function batAverage(d) {
    return Number(d.performance.BatAv);
};

function highScore(d) {
    return Number(d.performance.HS);
};

function team(d) {
    return d.country;
};

var prettyDataBatsmen = function(d) {
    return [d.name,
            utils.humanize(d.series),
            "Runs: " + totalRuns(d),
            "Batting Average: " + batAverage(d),
            "High Score: " + highScore(d)]
};

function writeLegend(data) {
    clearLegend(data);
    d3.select(".legendBatsmen")
        .selectAll("ul")
        .attr("class", "foo")
        .data(prettyDataBatsmen(data))
        .enter()
        .append("li")
        .text(function(stat) {
            return stat;
        });
};

function clearLegend(d) {
    d3.select(".legendBatsmen")
        .selectAll("li")
        .remove();
};

var sanitizeBatData = function(data) {
    return data.filter(function(d) {
        return !isNaN(totalRuns(d)) &&
            !isNaN(batAverage(d)) &&
            !isNaN(highScore(d)) &&
            (totalRuns(d) < 600);
    });
};

d3.json("/visualizations/debuts/data/debuts.json", function(dataset) {
    dataset = sanitizeBatData(dataset);

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return totalRuns(d);})])
        .range([2 * padding, w - padding]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return batAverage(d);})])
        .range([h - 2 * padding, padding]);

    var radiusScale = d3.scale.sqrt()
        .domain([0, d3.max(dataset, function(d) {return highScore(d);})])
        .range([0, 20]);

    var circles = svgBat.append("g")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {return xScale(totalRuns(d));})
        .attr("cy", function(d) {return yScale(batAverage(d));})
        .attr("r", function(d) {return radiusScale((highScore(d)));})
        .attr("fill", function(d) {
            return colorMap[team(d)];
        })
        .attr("stroke", "white")
        .attr("opacity", 0.6)
        .on("mouseover", function(d){
            d3.select(this)
                .attr("r", function(d) {
                    return radiusScale(highScore(d)) + 5;
                })
                .attr("opacity", "1");
        })
        .on("mouseout", function(d){
            d3.select(this)
                .attr("r", function(d) {return radiusScale(highScore(d));})
                .attr("opacity", 0.6);
        })
        .sort(function(a, b) {
            return highScore(b) -  highScore(a);
        });

    circles.append("title")
        .text(function(d) {return prettyDataBatsmen(d);});

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(20)
        .orient("bottom");

    svgBat.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - 2 * padding) + ")")
        .call(xAxis);

    svgBat.append("text")
        .text("Total Runs")
        .attr("x", (w - 2 * padding)/2)
        .attr("y", h - padding);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient("left");

    svgBat.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" +  2 * padding + ", 0)")
        .call(yAxis);

    var yLabel = svgBat.append("g");
    yLabel.append("text")
        .text("Batting Average")
        .attr("text-anchor", "middle");
    yLabel.attr("transform", "translate(" + padding/2 + "," +  (h - padding)/2 +") rotate(270)");

    var xRule = svgBat.append("g")
        .selectAll(".rule")
        .data(yScale.ticks(10))
        .enter()
        .append("g")
        .attr("class", "rule")
        .attr("transform", function(d) {
            return "translate(" + 2 * padding + ", " + yScale(d) + ")";
        });

    xRule.append("line")
        .attr("x2", w - 3 * padding);

    var yRule = svgBat.append("g")
        .selectAll(".rule")
        .data(xScale.ticks(20))
        .enter()
        .append("g")
        .attr("class", "rule")
        .attr("transform", function(d) {
            return "translate(" + xScale(d) + "," + padding + ")";
        });

    yRule.append("line")
        .attr("y2", h - 3 * padding);
});
</script>
<div class="legendBowler">
</div>
_X-axis: Total Runs, Y-axis: Batting Average, Size of bubble: Highest Score, Blue: Indians, Green: Pakistanis. Move mouse over a bubble and see the alt-text for full stats._


This scatter-plot shows debut batting performances by all the test players to have ever played for India and Paskistan (Except those players whose batting averages were not computed). As you would have guessed, the blue bubbles are Indian players and the green ones are Pakistanis. The number of runs scored by the each batsman is on the x-axis and batting average in the debut series is on the y-axis. The size of the bubble is representative of the highest score the player scored in the debut series.

I learned some interesting things from this graph:

* Sunil Gavaskar made an amazing debut. His score card for his debut series in 1971 against the might West Indies of 1970's read like this - Matches: 4, Total Runs: 774, High Score: 220, Batting Average: 154.80, 100s: 4, 50s: 3. That is incredible and adding him to this plot would have totally skewed this plot. So technically, I did not learn about Gavaskar's amazing debut from this plot, but from the process of plotting it. But you get the idea.
* It looks like Indian batsmen have historically made slightly better debuts. From my not-so-keen-cricket-lover point of view, anybody who scored 150 runs at an average of 40 had a good debut series. (I chose that arbitrarily, but if you are more of a cricket fan than me, you would have better scales to spot a good debut, and you can draw your own conclusions :-)


## Bowlers

<div class="visBowler">
</div>

<script type="text/javascript">
var w = 850;
var h = 500;
var barPadding = 1;
var padding = 30;
var colorMap = {
    "India": "#1f77b4",
    "Pakistan": "#637939"
};

var svgBowler = d3.select(".visBowler")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

function bowlAv(d) {
    return Number(d.performance.BowlAv);
};

function wickets(d) {
    return Number(d.performance.W);
};

function bestBowling(d) {
    return Number(d.performance.BB.split("/")[0]);
};

function team(d) {
    return d.country;
};

var prettyDataBowler = function(d) {
    return [d.name,
            utils.humanize(d.series),
            "Bowling Average: " + bowlAv(d),
            "Wickets: " + wickets(d),
            "Best Bowling: " + d.performance.BB]
};

function writeLegend(data) {
    clearLegend(data);
    d3.select(".legendBowler")
        .selectAll("ul")
        .attr("class", "foo")
        .data(prettyDataBowler(data))
        .enter()
        .append("li")
        .text(function(stat) {
            return stat;
        });
};

function clearLegend(d) {
    d3.select(".legendBowler")
        .selectAll("li")
        .remove();
};

var sanitizeBowlData = function(data) {
    return data.filter(function(d) {
        return d.performance.W > 0 && d.performance.BowlAv < 110;
    });
};

d3.json("/visualizations/debuts/data/debuts.json", function(dataset) {
    dataset = sanitizeBowlData(dataset);

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return bowlAv(d);})])
        .range([2 * padding, w - padding]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return wickets(d);})])
        .range([h - 2 * padding, padding]);

    var radiusScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return bestBowling(d);})])
        .range([0, 20]);

    var circles = svgBowler.append("g")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {return xScale(bowlAv(d));})
        .attr("cy", function(d) {return yScale(wickets(d));})
        .attr("r", function(d) {return radiusScale((bestBowling(d)));})
        .attr("fill", function(d) {
            return colorMap[team(d)];
        })
        .attr("stroke", "white")
        .attr("opacity", 0.6)
        .on("mouseover", function(d){
            d3.select(this)
                .attr("r", function(d) {
                    return radiusScale(bestBowling(d)) + 5;
                })
                .attr("opacity", "1");
        })
        .on("mouseout", function(d){
            d3.select(this)
                .attr("r", function(d) {return radiusScale(bestBowling(d));})
                .attr("opacity", 0.6);
        })
        .sort(function(a, b) {
            return bestBowling(b) -  bestBowling(a);
        });

    circles.append("title")
        .text(function(d) {return prettyDataBowler(d);});

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(20)
        .orient("bottom");

    svgBowler.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - 2 * padding) + ")")
        .call(xAxis);

    svgBowler.append("text")
        .text("Bowling Average")
        .attr("x", (w - 2 * padding)/2)
        .attr("y", h - padding);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(10)
        .orient("left");

    svgBowler.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" +  2 * padding + ", 0)")
        .call(yAxis);

    var yLabel = svgBowler.append("g");
    yLabel.append("text")
        .text("Wickets")
        .attr("text-anchor", "middle");
    yLabel.attr("transform", "translate(" + padding/2 + "," +  (h - padding)/2 +") rotate(270)");

    var xRule = svgBowler.append("g")
        .selectAll(".rule")
        .data(yScale.ticks(10))
        .enter()
        .append("g")
        .attr("class", "rule")
        .attr("transform", function(d) {
            return "translate(" + 2 * padding + ", " + yScale(d) + ")";
        });

    xRule.append("line")
        .attr("x2", w - 3 * padding);

    var yRule = svgBowler.append("g")
        .selectAll(".rule")
        .data(xScale.ticks(20))
        .enter()
        .append("g")
        .attr("class", "rule")
        .attr("transform", function(d) {
            return "translate(" + xScale(d) + "," + padding + ")";
        });

    yRule.append("line")
        .attr("y2", h - 3 * padding);
});
</script>
<div class="legendBowler">
</div>

_X-axis: Bowling Average, Y-axis: Wickets taken, Size of bubble: Best bowling performance, Blue: Indians, Green: Pakistanis. Move mouse over a bubble and see the alt-text for full stats. Bowling average: Less the better_


This scatter-plot shows debut bowling performances by all the test players to have ever played for India and Paskistan (Except those players who took no wickets and hence is not of interest to us). The X-axis shows bowling average and the Y-axis shows number of wickets. The size of the bubble is representative of the number of wickets the bowler had in his best bowling performance in the debut series. Since it is indicative of only the wickets, players with best performances of 2/12 and 2/76 would be shown with bubbles of same size.

Interesting bits:

* Pakistani bowlers make better debuts than Indian bowlers. In the crowd of players with a bowling average of less than 35 and 5 wickets of above, Pakistani players dominate. (Again, disclaimer about arbitrary scales to measure a good performance :-)
* There are a number of Indian bowlers like Dilip Doshi, Shivlal Yadav, Ravichandran Ashwin and Srinivas Venkataraghavn whose debut performances were clear outliers.


## The Code

All the code I used to pull data from Cricinfo, the actual dataset and the Javascript code that generated these plots is available [here](https://github.com/sdqali/debuts) on Github. Feel free to use the dataset to create better visualisations than mine.

## Credits

Srijayanth ([@craftybones](https://twitter.com/craftybones)) helped me a lot with d3 and choosing the colors for the visualisation.
