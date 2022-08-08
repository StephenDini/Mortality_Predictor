# 💀 Mortality_Predictor

### Question that we want to answer

What are the socioeconomic and cultural factors that impact mortality rates around the world?

### Presentation link
[Presentation](https://docs.google.com/presentation/d/1LWGuXp3NOTsw_bEFNLJiMto2QfCeRlse0vZF0vOMeIQ/edit#slide=id.g13ea42ae2c7_0_71)

## 🚧 Project Information by Parts

## Extract/Transform/Load

### Data Used
* Mortality Rate by Country
* Alcohol Consumption by Country
* Population Growth Rates by Country
* GDP Per Capita by Country
* GDP by Country
* Religion breakdown by Country
* Literacy Rate by Country
* Country Coordinates

### Data Approach

* All data files were cleaned and merged into a single data source for the machine learning model.
* A GeoJSON data file was created for the mapping portion.
* Some data was not available for all years so most recent data was used.

---

## 🧮 Analysis

## Machine learning model
For the project, our group wants to see if a machine learning model can correlate socioeconomic and cultural factors to mortality rates by country. Our project used supervised machine learning, specifically the Random Forest Classifier, given our data is labeled and we are looking for a discrete outcome. Several other methods were tested (see mortality_machine_learning and mortality_machine_learning_2 in machine learning folder). Those methods were rejected given that the balanced accuracy scores were lower than the Random Forest Classifier. We chose the balanced accuracy score as the method for measuring how well the model performed based on best practices learned in class, as well as best practice, according to [machinemastery.com](https://machinelearningmastery.com/how-to-know-if-your-machine-learning-model-has-good-performance/) for classification models. 

#### Data Processing
Once ETL completed on datasets, there were 26 features to test against mortality rate. In order to test classification, mortality rate was transformed into "mortality state" by taking mortality rate 2015 into splitting into categories of high, medium, and low numerically 3,2,1. Mortality Rate columns for all years were then dropped, as well as the mortality rate so the model could use "mortality_state' as the y variable. Country name, latitude, and longitude was also dropped. The original model resulted in a 71.9 balanced accuracy score.
![Original model](/docs/pictures/Machine%20Learning%20original%20Random%20Forest%20Classifier.png)

#### Optimizing Model
Using information and code found on machinelearningmastery.com, we optimized the model using sklearn BaggingClassifier model. This library automatically bins certain features to more accurately predict mortality state. Having the code auto classify features helps reduce bias in the data. The outcome of this optimization is 0.906. The ROC AUC score was 0.911. Both scores give "outstanding discrimination" according to [statology.org](https://www.statology.org/what-is-a-good-auc-score/). This means the machine learning optimized model is more than 90% likely to predict mortality state based on socioeconomic and cultural factors when weighted against each other. 

![Classification report](/docs/pictures/bagging_classification_report.png)

### Limitations of machine learning model
The bagging classifier automatically selects the features, so any change or addition to the dataset can significantly alter the learning model. Given that latitude and longitude were added after the initial model was created, these columns were dropped as to not alter the model. The high accuracy and ROC AUC scores from the optimized model could indicate overfitting. However, we limited the number of features to 4 in order to reduce the complexity of the model to avoid overfitting. 

---

## 🗺️ Map
### Process for Interactive Map
As a group, we used an interactive map to best display the user interactivity portion of our project. We chose this as the information we wanted to portray was specifically about different data from different countries.

Using Jupyter Notebook, we were able to collect the country coordinates into a DataFrame and added it to the data already collected.  We then used VS Code to create HTML, CSS and JS files to launch the website.

#### Our tasks to make the map included:
1. Create a base map.
2. Create a separate layer for each factor we can conceivably represent on a map.
3. Allow markers to have their own pop-ups based on which layer is being selected, so exact data for each country to be displayed.
4. Create a legend for each layer to show what the color markers on the map mean.
![Live_Map ](https://user-images.githubusercontent.com/93801125/183296275-dce66a7b-f3b3-49c6-846b-dc32c15beb05.png)

5. Create a pop-up or a user to see to give any information for the interactivity, that may not be readily apparent.
![Live_Map_Popup](https://user-images.githubusercontent.com/93801125/183296306-3bd184e0-e0d2-4a1f-80f3-ec078ef7c2e3.png)

Using Leaflet to create a basic map, D3 to bring the map to life, and GeoJSON to bring the data in to be manipulated, created an informative and easily read, interactive component.

### Encountering Map Limitations

One of the first limitations we encountered, was deciding which data could/should be displayed when making the map.  We decided only one year of GDP and Alcohol should be displayed with the most recent year being used. If we used all the years we had, it would make the map very crowded and less informative. We also had to cut out religion, since there are many religions within each country, and not an easy way to represent that within a map.

Another limitation that we ran into, was that we weren't able to be more specific in legend placement.  Leaflet only allowed 'topleft', 'topright', 'bottomleft' and 'bottomright'. If bottom left was selected twice, it would stack them instead of laying them across the bottom, where we preferred. We also wanted the layers to come in with its own legend but were having trouble launching this specification. We also had to consider how the legends were possibly going to be displayed if more than one layer was selected.

---

## 👌 Interactive Website

The mockup for the site was created using paint and gives the overall flow of the site for us to follow. The inspiration for the mockup was taken from the belly button module. The website will consist of one main landing page and various other pages for charts and maps. The landing page will layout the information about the project and a blurb the team behind the project. The website is hosted on GitHub pages utilizing [Bootstrap](https://getbootstrap.com/) and Javascript. 

---

## 📝 Extra Details

## Programs used

### IDE

- [Webstorm](https://www.jetbrains.com/webstorm/)

### Web Apps

- [Jupyter Notebook](https://jupyter.org/)

### Text Processors

- [Sublime Text](https://www.sublimetext.com/)
- [VS Code](https://code.visualstudio.com/)

## Drinks Consumed

- 2 bottles of SideCart
- 1 bottle of Mead
- 4 Black Russians
- 7 Old Fashions (Monkey Shoulder Blended Scotch used)
- 2 Margaritas (original with salted rim)
- 1 bottle of Prosecco

---

## 💻 Credits

**Mortality_Predictor** is the final project of [Stephen Dini](https://github.com/StephenDini)
, [Joe Eck](https://github.com/JleMxe), [Claudia Wilkis](https://github.com/cwilkis)
, [Andrea Darrah](https://github.com/andrealynn8201)

[![...](/docs/pictures/adjusted_image.png)](https://github.com/StephenDini/Mortality_Predictor/graphs/contributors)

Made with [contrib.rocks](https://contrib.rocks).

---

## 📌 Sources

* Mortality Rate by Country
  * File name: 1855dc1a-df9c-4bdc-bab6-21f17897cebc.csv
  * Source: https://www.who.int/data/gho/data/indicators/indicator-details/GHO/adult-mortality-rate-(probability-of-dying-between-15-and-60-years-per-1000-population)
* Alcohol Consumption by Country
  * File name: alcohol-consumption.csv
  * Source: https://www.kaggle.com/datasets/sveneschlbeck/alcohol-consumption-per-capita-year-and-country
* Population Growth Rates by Country
  * File name: API_SP.POP.GROW_DS2_en_csv_v2_4251293.csv
  * Source: https://data.worldbank.org/indicator/SP.POP.GROW
* GDP by Country
  * File name: API_NY.GDP.MKTP.CD_DS2_en_csv_v2_4251000.csv
  * Source: https://data.worldbank.org/indicator/NY.GDP.MKTP.CD
* GDP Per Capita by Country
  * File name: API_NY.GDP.PCAP.CD_DS2_en_csv_v2_4251004.csv
  * https://data.worldbank.org/indicator/NY.GDP.PCAP.CD
* Religion breakdown by Country
  * File name: Religious_Composition_by_Country_2010-2050.xlsx
  * Source: https://www.pewresearch.org/religion/2015/04/02/religious-projection-table/
* Literacy Rate by Country
  * File name: literacy-rate-by-country
  * Source: https://ourworldindata.org/global-education
* Country Coordinates
  * Coordinates.csv
  * Source: https://www.geeksforgeeks.org/how-to-find-longitude-and-latitude-for-a-list-of-regions-or-country-using-python/
