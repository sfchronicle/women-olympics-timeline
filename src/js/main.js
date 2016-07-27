require("component-responsive-frame/child");
var d3 = require('d3');

var events = [];
var years = []; // x-axis text values
var t = []; // circles on axis

for (var i = 0; i < timelineData.length; i++) {
	events.push(timelineData[i].id);
	years.push(timelineData[i].y);
	t.push(timelineData[i].t);
}

for (var i = 0; i < timelineData.length; i++) {
	var a = document.getElementById(events[i]);
	a.insertAdjacentHTML("beforeend","<div class='eventtext'><span class='date'>" + timelineData[i].date + "</span> <span class='text'>" + timelineData[i].event + "</span> <br>" + timelineData[i].words + "</div>");

	if (timelineData[i].image != '') {
		a.insertAdjacentHTML("beforeend","<img src='" + timelineData[i].image + "'><br><div class='caption'>" + timelineData[i].caption + " <span class='attr'> " + timelineData[i].credit + "</span></div>");
	}
	else if (timelineData[i].date == '1972') {
		a.insertAdjacentHTML("beforeend",'<div style="width: 100%; margin: 20px 0; padding: 70px 25px 25px 50px; background-color: #6c85a5; color: white; font-family: FarnhamText; text-align: right; position: relative"><div style="position: absolute; font-size: 150px; top: 60px; left: 2%; color: rgba(255,255,255,0.3)">“</div><span style="font-size: 20px">“No person in the United States shall, on the basis of sex, be excluded from participation in, be denied the benefits of, or be subjected to discrimination under any education program or activity receiving federal financial assistance.”</span><br><br><span style="font-family: Antennaextralight; font-style: italic">— Title IX of the Educational Amendments of 1972</span></div>');
	}
	else {
		a.style.paddingBottom = "20px";
	}
}

// code for timeline

var xScale = d3.scaleLinear()
  .domain([1896,2015])
  .range([0,645]);

// setting dimensions for the svg
if (screen.width > 600) {
  var width = 460;
  var margin = {
    top: -10,
    right: 45,
    bottom: 20,
    left: 45
  };
} else if (screen.width <= 600 && screen.width > 480) {
  var width = 430;
  var margin = {
    top: -10,
    right: 25,
    bottom: 20,
    left: 25
  };
} else if (screen.width <= 480 && screen.width > 370) {
    var width = 320;
    var margin = {
      top: -10,
      right: 25,
      bottom: 20,
      left: 25
    };
} else if (screen.width <= 370) {
  var width = 280;
  var margin = {
    top: -10,
    right: 20,
    bottom: 20,
    left: 20
  };
}

var height = 50;

var xAxisGroup = d3.select("#ticker").append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x-axis scale
var x = d3.scaleLinear()
    .rangeRound([0,width]);

x.domain(d3.extent(timelineData, function(d) {
  return d.date;
}));

var xAxis = d3.axisTop()
  .scale(x)
  .tickFormat(d3.format(".0f"))
  .tickValues(["1896","1972","1974","1977","1984","1991","1991","1995","1996","1996","1996","1999","2000","2012","2015"]
  )
  .tickSize(0)
  .tickPadding(15);

xAxisGroup.append("g")
    .attr("class", "axistop")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

var axistop = xAxisGroup.selectAll(".axistop");

var ticks = axistop.selectAll(".tick")

ticks.selectAll("line").remove();
ticks.each(function() {
  d3.select(this)
    .append("circle")
      .attr("r", 5)
      .attr("fill","white")
      .style("stroke","rgb(178, 178, 178)")
      .style("stroke-width","1px");
  d3.selectAll("circle")
    .attr("id", function(d,i) {return "t-" + i})
  d3.selectAll("text")
    .attr("id", function(d,i) {return "y-" + i})
});

// sticky timeline

function activate() {
  var window_top = document.body.scrollTop;
  var div_top = document.getElementById('stick-here').getBoundingClientRect().top + window_top;
  var timeline = document.getElementById('ticker');
  var timeline_ph = document.getElementById('timeline-placeholder');

  if (window_top > div_top) {
      timeline.classList.add('sticky');
      timeline_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
  } else {
      timeline.classList.remove('sticky');
      timeline_ph.style.display = 'none'; // removes placeholder
  }

  for (var i = 0; i < events.length; i++ ) {
  	var a = document.getElementById(events[i]);
  	var at = document.getElementById(t[i]);
  	var ay = document.getElementById(years[i]);

    var ed_top = a.getBoundingClientRect().top + window_top - 62;
	var ede_top = a.getBoundingClientRect().bottom + window_top - 62;

	var r = document.getElementById('t-6');
    var u = document.getElementById('t-10');
    var v = document.getElementById('t-9');
    var w = document.getElementById('t-8');

    if (window_top > ed_top && window_top < ede_top) {
    	if (timelineData[i].date == 1991) {
    		if (i == 5) {
    			r.style.fillOpacity = 0;
    			r.style.strokeOpacity = 0;
    		}
    		else {
    			r.style.fillOpacity = 1;
    			r.style.strokeOpacity = 1;
    		}
	        at.classList.add('active');
	        ay.classList.add('active');
    	}
    	else if (timelineData[i].date == 1996) {
    		if (i == 8) {
    			u.style.fillOpacity = 0;
    			u.style.strokeOpacity = 0;
    			v.style.fillOpacity = 0;
    			v.style.strokeOpacity = 0;
    			w.style.fillOpacity = 1;
    			w.style.strokeOpacity = 1;
    		}
    		else if (i == 9) {
    			u.style.fillOpacity = 0;
    			u.style.strokeOpacity = 0;
    			v.style.fillOpacity = 1;
    			v.style.strokeOpacity = 1;
    			w.style.fillOpacity = 0;
    			w.style.strokeOpacity = 0;
    		}
    		else if (i == 10) {
    			u.style.fillOpacity = 1;
    			u.style.strokeOpacity = 1;
    			v.style.fillOpacity = 0;
    			v.style.strokeOpacity = 0;
    			w.style.fillOpacity = 0;
    			w.style.strokeOpacity = 0;
    		}
	        at.classList.add('active');
	        ay.classList.add('active');
    	}
    	else {
	        at.classList.add('active');
	        ay.classList.add('active');
    	}
    }
	else {
        at.classList.remove('active');
        ay.classList.remove('active');
	}

    // removes years if there is an overlap
    if (document.getElementById(years[13]).classList.contains('active') ) {
      document.getElementById(years[14]).style.display = "none";
    }
    else {
      document.getElementById(years[14]).style.display = "";
    }

  }

}

window.onscroll = function() {activate()};