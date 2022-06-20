function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    // console.log(data);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // console.log(typeof metadata[0].id);
    // console.log(typeof parseInt(sample));
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id ==sample)
    var result = resultArray[0];
    // console.log(result);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    // PANEL.append('h6'.text(result.location))
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(participantID) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray = samples.filter(sampleObj => sampleObj.id == participantID); 
    // console.log(samplesArray);
    //  5. Create a variable that holds the first sample in the array.
    var result = samplesArray[0];
    // console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids=result.otu_ids;
    var otu_labels= result.otu_labels;
    var sample_values =result.sample_values;
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`
    ).reverse();

  //  console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var trace ={
      x: sample_values.slice (0,10).reverse(),
      y: yticks,
      type:"bar",
      orientation: 'h',
      text: otu_ids.slice(0,10).reverse()
    };
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title:"Top 10 Bacteria Cultures Found",
    xaxis: {title: "Samples"}
    };
    Plotly.newPlot('bar', barData, barLayout);

    //bubble chart.

    var trace ={
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      },
      text: otu_labels
    };

   var bubbleData = [trace];
   var bubbleLayout = {
    title: "Bacterial Cultures Per Sample",
    xaxis: {title: "OTU ID"}
          
    };
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
      
  });

  function buildCharts(washData) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
      // console.log(data);
 
  var washArray=metadata.filter(sampleObj=> sampleObj.id==washData);

 var washPerweek=wfreq

  var gaugeTrace = [{
    title: 'Scrubs per Week',
    type:'indicator',
    mode : 'guage + number',
    domain: {'x': [0,1], 'y': [0,1]},
    value: washPerweek,
    guage: {'axis': {'range':[0, 10], tickwidth : 1, tickcolor: "black" },
    'steps':[
      {'range': [0,2,], 'color': "red"},
      {'range': [2,4], 'color': "orange"},
      {'range': [4,6], 'color': "yellow"},
      {'range': [6,8], 'color': "light green"},
      {'range': [8,10], 'color': "green"}],
    'bar': {'color': "black"}     

    }}];
  
  var gaugeData= gaugeTrace;

  var gaugeLayout = { 
   title: 'Belly Buttom Washing Frequency'
  };

  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('guage', gaugeData, gaugeLayout);
  })}};
  console.log(data);