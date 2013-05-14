var radius = 700,
    x = d3.scale.linear().range([0,radius]),
    y = d3.scale.linear().range([0,radius]),
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
        .attr("r", function(d) { return d.r; });

  node.append("title")
    .text(function(d) { return d.name + (d.parent ? "" : ": $" + format(d.size)); }); /*text popup upon mouseover*/


  node.on("click", function (event) {

        var photo = event.photo;
        $("#photo").empty();
        $("<img/>").attr("src", photo).appendTo("#photo"); 
        

        var name = event.name;
        if (name === "Click on a circle for info") return;
        if (name === "arthritis") return;
        if (name === "asthma") return;
        if (name === "cancer") return;
        if (name === "kidney") return;
        if (name === "cholestrol") return;
        if (name === "psych") return;
        if (name === "HIV") return;
        if (name === "diabetes") return;
        if (name === "pain relief") return;
        if (name === "respiratory") return;
        if (name === "ADD") return;
        if (name === "multiple sclerosis") return;
        if (name === "generic") return;
        if (name === "Boehringer Ingelheim Pharmaceuticals Inc.") return;
        if (name === "GlaxoSmithKline") return;
        if (name === "Genentech Inc.") return;
        if (name === "Sanofi-Aventis") return;
        if (name === "Gilead Sciences Inc.") return;
        if (name === "Novo Nordisk Inc.") return;

        
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

/*        $(".leaf").hover(function(){
          $("#info").show();    
        })
          $(".leaf").mouseleave(function(){
          $("#info").hide();  
          });*/

      });
 


  var text_labels=node.filter(function(d) { return !d.children; }).append("text")
  text_labels.attr("text-anchor", "middle")
      .attr("dy", ".3em")    
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
        .duration(2000)
        .attr("r", function(d) {return nodeData.r;});
});
    text_labels.text(function(d) { return d.name });  

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
        .duration(2000)
        .attr("r", function(d) {return nodeData.r;});
});
    text_labels.text(function(d) { return d.name });  

});    


});
    
    


