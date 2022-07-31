// noinspection JSSuspiciousNameCombination,EqualityComparisonWithCoercionJS

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json('./static/data/data_by_country.json').then((data) => {
        var sampleCountry = []

        data.forEach((element) => {
            sampleCountry.push(element['Country']);
        });

        sampleCountry.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        // var firstSample = 'Australia';
        var firstSample = 'Albania';
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
    d3.json("./static/data/data_by_country.json").then((data) => {
        // let s;
        //
        // data.forEach((element) => {
        //   if(element['Country'] == sample){
        //     s = (element);
        //   }
        // });

        // let s = data.forEach((element) => {if (element['Country'] == sample) {
        //   return element;
        // }});
        let s = data.find(element => element['Country'] == sample);

        // var metadata = data.metadata;
        // // Filter the data for the object with the desired sample number
        // var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // var result = resultArray[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        // TODO: work on implementing charts for
        Object.entries(
            PANEL.append("h6").text(
                `Buddhists: ${s['Buddhists']}
           `
            ));
        Object.entries(
            PANEL.append("h6").text(
                `Christians: ${s['Christians']}`
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Folk_Religions: ${s['Folk_Religions']} \n
           `
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Hindus: ${s['Hindus']} \n
           `
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Jews: ${s['Jews']} \n
           `
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Muslims: ${s['Muslims']} \n
           `
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Other_Religions: ${s['Other_Religions']} \n`
            ));
        Object.entries(
            PANEL.append("h6").text(
                `
           Unaffiliated: ${s['Unaffiliated']} \n`
            ));

        document.getElementById('mortality').innerHTML = `<h3>` + s['Country'] + ': ' + parseFloat(s['mortality_rate'] * 10).toFixed(2) + `</h3>`;
    });
}

// TODO: Mortality vs Top Lit
// TODO: Mortality vs Bot Lit
// TODO: Mortality vs Religion Break down per Country
// TODO: Mortality vs Religion make up of each Country
// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file
    d3.json("./static/data/data_by_country.json").then((data) => {
        let s = data.find(element => element['Country'] == sample);


        // // 3. Create a variable that holds the samples array.
        // var samples = data.samples;
        // // 4. Create a variable that filters the samples for the object with the desired sample number.
        // var samples_array = samples.filter(sampleObj => sampleObj.id == sample);
        // //  5. Create a variable that holds the first sample in the array.
        // var result = samples_array[0];

        // colors taken from https://www.heavy.ai/blog/12-color-palettes-for-telling-better-stories-with-your-data
        let colors = ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var mortality_rate = ['mortality_rate', s['mortality_rate'], colors[0], 1];
        var Buddhists = ['Buddhists', s['Buddhists'], colors[1], 2];
        var Christians = ['Christians', s['Christians'], colors[2], 3];
        var Folk_Religions = ['Folk_Religions', s['Folk_Religions'], colors[3], 4];
        var Hindus = ['Hindus', s ['Hindus'], colors[4], 5];
        var Jews = ['Jews', s['Jews'], colors[5], 6];
        var Muslims = ['Muslims', s['Muslims'], colors[6], 7];
        var Unaffiliated = ['Unaffiliated', s['Unaffiliated'], colors[7], 8];
        var Other_Religions = ['Other_Religions', s['Other_Religions'], colors[8], 9];

        var contained_religion = [Buddhists, Christians, Folk_Religions, Hindus, Jews, Muslims, Other_Religions, Unaffiliated]

        let sorted_rel = contained_religion.sort((a, b) => a[1] - b[1]);

        // console.log(sorted_rel)

        // Test
        // var {mortality_rate}= s;
        // var {Buddhists} = s;
        // var {Christians} = s;
        // var {Folk_Religions} = s;
        // var {Hindus} = s;
        // var {Jews} = s;
        // var {Muslims} = s;
        // var {Other_Religions} = s;

        var labels = ['Buddhists', 'Christians', 'Folk_Religions', 'Hindus', 'Jews', 'Muslims', 'Other_Religions'];

        // 7. Create the yticks for the bar chart.
        // Hint: Get the top 10 otu_ids and map them in descending order
        //  so the otu_ids with the most bacteria are last.
        // var top_otu_ids = otu_ids.slice(0,10).reverse();
        // var top_otu_labels = otu_labels.slice(0,10).reverse();
        // var top_sample_values = sample_values.slice(0,10).reverse();

        // var yticks = mortality_rate_labels.map(ytick => ytick);

        let series = [];
        let count = 0;
        let xpos = 0;
        let ypos = 0;

        for (var i = 0; i < sorted_rel.length; i++) {
            let x = [];
            let y = [];

            for (var z = 0; z < sorted_rel[i][1]; z++) {
                if (xpos == 10) {
                    xpos = 0;
                    ypos += 1;
                }

                x.push(xpos);
                y.push(ypos);
                xpos += 1;
                count += 1;
            }

            if (i == sorted_rel.length - 1 && ypos <= 10 && xpos != 10) {

                for (var c = xpos; c < 10; c++) {
                    if (xpos == 10) {
                        xpos = 0;
                        ypos += 1;
                    }

                    x.push(xpos);
                    y.push(ypos);
                    xpos += 1;
                }
            }

            // 8. Create the trace for the bar chart.
            let pictoTrace = {
                x: x,
                y: y,
                // test: mortality_rate_labels,
                // mode: 'markers',
                name: sorted_rel[i][0],
                type: "scatter",
                marker: {
                    color: sorted_rel[i][2],
                },
                legendrank: sorted_rel[i][3],
                mode: "text",
                hoverinfo: 'none',
                text: '\uf54c',
                textposition: "middle center",
                textfont: {
                    "family": "FontAwesome",
                    "size": 18,
                    "color": sorted_rel[i][2],
                },
            };

            series.push(pictoTrace)
        }

        // 9. Create the layout for the bar chart.
        var scatterlayout = {
            title: "Mortality: Religion break down",
            font: {color: "RebeccaPurple"},
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                visible: false,
                showticklabels: false,
                // range: [ 0, 10 ]

            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                visible: false,
                showticklabels: false,
                // range: [0, 10]

            },
            margin: {
                pad: 12
            },

        };
        // 10. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bar-plot", series, scatterlayout);

        //
        // // 1. Create the trace for the bubble chart.
        // var bubbleData = [{
        //   x: otu_ids,
        //   y: sample_values,
        //   text: otu_labels,
        //   mode: "markers",
        //   marker: {color: otu_ids, size: sample_values},
        // }
        // ];
        //
        // // 2. Create the layout for the bubble chart.
        // var bubbleLayout = {
        //   title: 'Bacteria Cultures Per Sample',
        //   font:{color: "RebeccaPurple"},
        //   margin: {
        //     l: 80,
        //     r: 80,
        //     b: 100,
        //     t: 100
        //   }
        // };
        //
        // // 3. Use Plotly to plot the data with the layout.
        // Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout);
        //
        //
        // // 3. Create a variable that holds the washing frequency.
        // metadata = data.metadata;
        // metadata_array = metadata.filter(metaObj => metaObj.id == sample)
        // meta_result = metadata_array[0]
        //
        // var wfreq = meta_result.wfreq;
        // console.log(wfreq)
        //
        // // 4. Create the trace for the gauge chart.
        // var gaugeData = [
        //   {
        //
        //     value: wfreq,
        //
        //     type: "indicator",
        //
        //     mode: "gauge+number",
        //
        //     gauge: {
        //
        //       axis: { range: [0, 10] },
        //       bar: {color: "black"},
        //       steps: [
        //
        //         { range: [0, 2], color: "red" },
        //         { range: [2, 4], color: "orange" },
        //         { range: [4, 6], color: "yellow" },
        //         { range: [6, 8], color: "lightgreen" },
        //         { range: [8, 10], color: "green" },
        //
        //       ],
        //   }
        // }
        // ];
        //
        // // 5. Create the layout for the gauge chart.
        // var gaugeLayout = {
        //   title: '<b>Belly Button Washing Frequency</b><br>Scrubs Per Week',
        //   font:{color: "RebeccaPurple"},
        //   margin: {
        //     l: 50,
        //     r: 50,
        //     b: 50,
        //     t: 65
        //   }
        // };
        //
        // // 6. Use Plotly to plot the gauge data and layout.
        // Plotly.newPlot("gauge-plot", gaugeData, gaugeLayout);
    });
}
