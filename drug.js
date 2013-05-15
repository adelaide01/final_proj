var radius = 700,
    //x = d3.scale.linear().range([0,radius]),
    //y = d3.scale.linear().range([0,radius]),
    format = d3.format(",d");


var vis = d3.select("#graph").append("svg")
    .attr("width", radius)
    .attr("height", radius)
    .attr("class", "pack")
    .append("g")
    .attr("transform", "translate(0, 0)");

d3.json("test17.json", function(json){

  var pack = d3.layout.pack()
      .size([radius, radius])
      .value(function(d) {  
        return d.size; 
      });
 
  var node = vis.data([json]).selectAll("g.node")
             .data(pack.nodes)

  node.enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


  node.append("circle")
      .style("fill","#FF8400")
      .style("stroke","63aad4")
      .style("stroke-width", 2)
      .attr("r", function(d) { return d.r; });

  node.append("title")
    .text(function(d) { return d.name + (d.children ? "" :  ": $" + format(d.size)); }); /*text popup upon mouseover*/


  node.on("click", function (event) {

        var photo = event.photo;
        $("#photo").empty();
        $("<img/>").attr("src", photo).appendTo("#photo"); 
        

        var name = event.name;
        if (name === "Click on a circle for info") {
          $("#info").hide();
          return;
        }
        if (name === "arthritis") {
          $("#info").hide();
          return;
        }

        if (name === "asthma") {
          $("#info").hide();
          return;
        }
        if (name === "cancer") {
          $("#info").hide();
          return;
        }
        if (name === "kidney") {
          $("#info").hide();
          return;
        }
        if (name === "cholesterol") {
          $("#info").hide();
          return;
        }
        if (name === "psych") {
          $("#info").hide();
          return;
        }
        if (name === "HIV") {
          $("#info").hide();
          return;
        }
        if (name === "diabetes") {
          $("#info").hide();
          return;
        }
        if (name === "pain relief") {
          $("#info").hide();
          return;
        }
        if (name === "respiratory") {
          $("#info").hide();
          return;
        }
        if (name === "ADD") {
          $("#info").hide();
          return;
        }
        if (name === "multiple sclerosis") {
          $("#info").hide();
          return;
        }
        if (name === "generic") {
          $("#info").hide();
          return;
        }
        if (name === "Boehringer Ingelheim Pharmaceuticals Inc.") {
          $("#info").hide();
          return;
        }
        if (name === "GlaxoSmithKline") {
          $("#info").hide();
          return;
        }
        if (name === "Genentech Inc.") {
          $("#info").hide();
          return;
        }
        if (name === "Sanofi-Aventis") {
          $("#info").hide();
          return;
        }
        if (name === "Gilead Sciences Inc.") {
          $("#info").hide();
          return;
        }
        if (name === "Novo Nordisk Inc.") {
          $("#info").hide();
          return;
        }

        
        $("#drug-name").text(name);

        var aka = event.aka;     
        $("#aka").text(aka);

        var treats = event.treats;
        $("#treats").text(treats);
        
        var manufacturer = event.manufacturer;
        $("#manufacturer").text(manufacturer);
        
        var sales = event.sales;
        $("#sales").text(sales);

        var units_sold = event.units_sold;
        $("#units_sold").text(units_sold);

        var info = event.info;
        $("#info").show();

        /*  $(".leaf").hover(function(){
          $("#info").show();    
        })
          $(".leaf").mouseleave(function(){
          $("#info").hide();  
          });*/

      });
 


  var text_labels=node.filter(function(d) { return !d.children; }).append("text")
  text_labels.attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .style("opacity", function(d) { return d.r > 19.5 ? 1 : 0; })
      .text(function(d) { return d.name });

  
  // Transition to new value from sales to units.
  $("#units_btn").click(function(e) {               

    pack.value(function(d) {
      return d.units_sold;
    });

    node.data([json]).selectAll("g")
      .data(pack.nodes)
   
    node.transition()
      .duration(2000)
      .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; 
      });

    node.each(function(nodeData) {
      d3.select(this)
        .selectAll("circle")
        .data([nodeData])
        .transition()
        .style("fill","#f1efd7")
        .style("stroke","63aad4")
        .style("stroke-width", 2)
        .duration(2000)
        .attr("r", function(d) {return nodeData.r;});
});
    text_labels.transition().duration(2000).style("opacity", function(d) { return d.r > 20 ? 1 : 0; })


});



  $("#sales_btn").click(function(e) {
    pack.value(function(d) {
      return d.size;
    });

    node.data([json]).selectAll("g")
      .data(pack.nodes)
   
    node.transition()
      .duration(2000)
      .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; 
      });
    node.each(function(nodeData) {
      d3.select(this)
        .selectAll("circle")
        .data([nodeData])
        .transition()
        .style("fill","#ff8400")
        .duration(2000)
        .attr("r", function(d) {return nodeData.r;});
});
    text_labels.transition().duration(2000).style("opacity", function(d) { return d.r > 20 ? 1 : 0; })    

});    


});
    


