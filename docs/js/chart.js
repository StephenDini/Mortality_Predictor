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

        let s = data.find(element => element['Country'] == sample);

        var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

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

function buildCharts(sample) {
    d3.json("./static/data/data_by_country.json").then((data) => {
        let s = data.find(element => element['Country'] == sample);

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

            let pictoTrace = {
                x: x,
                y: y,
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

        var scatterlayout = {
            title: "Mortality: Religion break down",
            font: {color: "RebeccaPurple"},
            xaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                visible: false,
                showticklabels: false,
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                visible: false,
                showticklabels: false,
            },
            margin: {
                pad: 12
            },
        };
        Plotly.newPlot("bar-plot", series, scatterlayout);
    });
}
