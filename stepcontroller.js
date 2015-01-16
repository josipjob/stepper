
var angle = new Array();
var step = 3.75;
var r1 = 100;
var r2 = 80;
var r3 = 100;
var curr_angle = 0;
var speed = 5;
var message = {"speed": speed, "angle": curr_angle}
var trans_x = 150;
var trans_y = 150;
var in_transition=0;
var RTSmessage = [];
var pointer_data = [{"d":"M -10 0 L 0 90 L 10 0A 10 10 0 0 0-10 0","id":"pointer_ghost","a":0, "style":"opacity:0.5;"},
					{"d":"M -10 0 L 0 90 L 10 0A 10 10 0 0 0-10 0","id":"pointer","a":0, "style":"opacity:1;"}];

for (i=0;i<360;i=i+step)
	angle.push(i);


//var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 300,
    height = 300;

pointer_length = 90
pointer_radius = 10

centerX = trans_x
centerY = trans_y

topX = centerX - 0
topY = centerY + pointer_length

leftX = centerX - pointer_radius
leftY = centerY - 0

rightX = centerX - -(pointer_radius)
rightY = centerY - 0

var slider = d3.select("#wrapper")
		.append("label")
		.attr("id","slider-value")
        .html("Speed: " + speed + " s/step");

var slider = d3.select("#wrapper")
		.append("input")
        .attr("type","range")
		.attr("id","slider")
		.attr("min", 0.005)
	    .attr("max", 0.5)
	    .attr("step", 0.005)
	    .attr("class", "col-centered")
	    //.style("max-width","300px")
	    .attr("viewBox","0 0 300 300")
		.attr("preserveAspectRatio","xMidYMin meet")
	    .on("input", function() { update(this.value);});

// Initial starting speed 
update(0.005);

function update(newSpeed) {
  // adjust the text on the range slider
	d3.select("#slider-value").text("Speed: " + newSpeed + " s/step");
	d3.select("#slider").property("value", newSpeed);
  // update the speed
	message.speed = newSpeed;
}

var svg = d3.select("#wrapper")//.select("#angleSelector")
		.append("svg")
        .attr("id","svg1")
//		.attr("width", width)
//	    .attr("height", height)
		.attr("viewBox","0 0 300 300")
		.attr("preserveAspectRatio","xMidYMin meet")
	    //.on("mousemove", mousemove)
    	//.on("mousedown", mousedown)
        .on("click", click);

// Define the gradient
var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

// Define the gradient colors
gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "AliceBlue")
    .attr("stop-opacity", 1);

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "LightBlue")
    .attr("stop-opacity", 1);

var ring = d3.select("svg")
		.append("circle")
		.attr("cx",trans_x)
		.attr("cy",trans_y)
		.attr("r",r1+30)
		.style("fill", "url(#gradient)"	)
        .style("stroke","black");

var circle = d3.select("svg")
		.append("circle")
		.attr("cx",trans_x)
		.attr("cy",trans_y)
		.attr("r",r1)		
		.style("fill", "white")
        .style("stroke","#B90925");

var circle2 = d3.select("svg")
		.append("circle")
		.attr("cx",trans_x)
		.attr("cy",trans_y)
		.attr("r",r2)		
		.style("fill", "url(#gradient)") 
		.style("stroke","DarkBlue");

var lines = svg.selectAll("line")
		.data(angle)
		.enter()
		.append("line")
        .attr("x1",function(d){ if (d%45 == 0){ return (r2-10)*Math.cos(d* (Math.PI/180)) + trans_x;}
                      else{  return (r2)*Math.cos(d* (Math.PI/180)) + trans_x;}})
        .attr("y1",function(d){ if (d%45 == 0){ return (r2-10)*Math.sin(d* (Math.PI/180)) + trans_y;}
                      else {return r2*Math.sin(d* (Math.PI/180)) + trans_y;}})
		.attr("x2",function(d){ return r3*Math.cos(d* (Math.PI/180)) + trans_x})
		.attr("y2",function(d){ return r3*Math.sin(d* (Math.PI/180)) + trans_y})
        .attr("id",function(d,i){ return i})
		.style("stroke","black")
		.style("stroke-width",function(d){ if (d%45 == 0){ return 2;}
                                          else {return 1}});

var angles_txt = svg.selectAll("text")
		.data(angle)
		.enter()
		.append("text")
        .attr("text-anchor","middle")
        .attr("x",function(d){ if (d%45 == 0){ return (r1+15)*Math.cos(d* (Math.PI/180)) + trans_x;}
                      else{  return (r2)*Math.cos(d* (Math.PI/180)) + trans_x;}})
        .attr("y",function(d){ if (d%45 == 0){ return (r1+15)*Math.sin(d* (Math.PI/180)) + trans_y+5;}
                      else {return r2*Math.sin(d* (Math.PI/180)) + trans_y;}})
		.attr("id",function(d){return d;})
		.text(function(d){ if (d%45 == 0){ return (360-(d-90))%360;} else {return ""}})
		.style("font-weight", "bold")
		.style("font-size",function(d){ if (d%45 == 0){ return 16;}
                                          else {return 12}});

var gpointers = svg.selectAll(".container")
    	.data(pointer_data)
		.enter()
		.append("g")
    	.classed("container", true)
    	.attr("transform", "translate(150, 150)")
    	.append("path")
        .attr("id",function(d){return d.id})
		.attr("d",function(d){return d.d})
		.attr("style",function(d){return d.style})
        //.attr("d", "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY + "A 10 10 0 0 0"  + leftX + " " + leftY)
        .style("fill", "Black")
        .style("stroke","#B90925");        

function click() {
	var position = d3.mouse(this),
    mouse_point = {"x": position[0], "y": position[1]};
    rotateElement(trans_x,trans_y,mouse_point.x,mouse_point.y);
}

function rotateElement(originX,originY,towardsX,towardsY){
	if (in_transition==0)
	{
		var degrees = Math.atan2(towardsY-originY,towardsX-originX)*180/Math.PI -90;
        degrees = Math.round(degrees/step)*step		//quantization
	
		if (degrees<=0)
        {
            curr_angle = Math.abs(degrees);
        }
        else
        {
            curr_angle = 360-degrees;
        }

	gpointers.filter("#pointer_ghost").attr("transform",function(d,i){
		d.a =  curr_angle;
		return "rotate("+ (360 - d.a ) +")";		
	});

	gpointers.filter("#pointer")
		.transition()
		.each("end",function(){in_transition=0;})
		.each("start",function(){in_transition=1;})
		.duration(function(d){
			var delta = Math.abs(d.a - curr_angle);
			if (delta<=180)
			{
				trans_duration = 1000*message.speed*delta/step;
			}
			else
			{
				trans_duration = 1000*message.speed*(360 - delta)/step;
			}
			return trans_duration;
		})
		.ease("linear")
		.attr("transform",function(d) {
				d.a =  curr_angle;
				message.angle = curr_angle;
				RTSmessage=JSON.stringify(message);
				console.log(RTSmessage);
			//	console.log(message);
			//alert(JSON.dump(message));
			return "rotate("+ (360 - d.a ) +")";
		});
	}
}