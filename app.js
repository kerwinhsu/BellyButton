function buildMetadata(sample) {
    var url=`metadata/${sample}`;
    //var url="metadata/" + sample;
    // console.log(url);
    d3.json(url).then(function(response){
      console.log(response);
      var data=response;
      var sampleData=d3.select("#sample-metadata");
      sampleData.html("");
      Object.entries(data).forEach(([key,value])=>{
          sampleData.append("p").text(`${key}:${value}`);
      });
    });
}

function buildCharts(sample) {
     var url=`/samples/${sample}`;
    //var url="/samples/" + sample;
    console.log(url);
    d3.json(url).then(function(response){
      console.log(response);
      var data=response;
      var size=data.otu_ids;
      var xValues = data.otu_ids;
      var yValues = data.sample_values;
      var color=data.otu_ids;
      var otu_labels = data.otu_labels;
     // var bubble=document.getElementById('#bubble');
      var bubbleChart = {
        x: xValues,
        y: yValues,
        type:"bubble", 
        mode:`markers`,
        marker:{
          color:color,
          size: size,
          values:"otu_labels"
        }
      };

      var data=[bubbleChart];

      var bubblelayout = {
        title:"Top 10 Samples",
        xaxis:"OTU ID"
        
      };
    
      Plotly.newPlot('bubble', bubbleChart, bubblelayout);      

    
    d3.json(url).then(function(response){
      //var pie=document.getElementById('#pie');
      var pieValues=response.sample_values.slice(0,10);
      var pieLabels=response.otu_ids.slice(0,10);
      var pieChart={
        values:pieValues,
        labels:pieLabels,
        type:"pie"
       };
       
      Plotly.newPlot('pie', pieChart);
    });
     

    });
      
};

function init() { 
  var selector = d3.select("#selDataset");
  
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
