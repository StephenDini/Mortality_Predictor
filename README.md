# 💀 Mortality_Predictor

### Question that we want to answer

What are the socioeconomic and cultural factors that impact mortality rates around the world?

### Communication

As a group we have utilized Slack and Zoom as a means of communication. We have reached out to both individuals and as a
group in order to answer questions in a timely manor, as well as discuss goals, strategy, where we are in our portion of
the project, and any future meeting times that would be necessary to continue with the forward momentum of the project.

## 🚧 Project Information by Parts

### ETL Methodology

#### Data Approach

* All data files were cleaned and merged into a single data source for the machine learning model.
* A JSON and GEoJSON data file was created for the mapping portion.
* Some data was not available for all years so most recent data was used.

### Machine learning model

For the project, our group wants to see if a machine learning model can correlate socioeconomic and coltural factors to
mortality rates by country. Our project used supervised machine learning, specifically the Random Forest Classifier
method, given our data is labeled and we are looking for a discrete outcome. Several other methods were tested (see
mortality_machine_learning and mortality_machine_learning_2 in machine learning folder). Those methods were rejected
given that the balanced accuracy scores were lower than the Random Forest Classifer. We chose the balanced accuracy
score as the method for measuring how well the model performed based on best practices learned in class, as well as best
practice, according
to [machinemastery.com](https://machinelearningmastery.com/how-to-know-if-your-machine-learning-model-has-good-performance/)
for classification models.

#### Data Processing

Once ETL completed on datasets, there were 26 features to test against mortality rate. Mortality Rate columns for all
years were dropped, as well as the mortality state so the model could use "mortality_state' as the y variable. Country
name column was also dropped as it was not a numerical column. The original model resulted in a 70.9 balanced accuracy
score.

#### Optimizing Model
Using information and code found on machinelearningmastery.com, we optimized the model using sklearn BaggingClassifier model. This library automatically bins certain features to more accurately predict mortality state. Having the code auto classify features helps reduce bias in the data. The outcome of this optimization is 0.906. The ROC AUC score was 0.911. Both scores give "outstanding discrimination" according to [statology.org](https://www.statology.org/what-is-a-good-auc-score/). This means the machine learning optimized model is more than 90% likely to predict mortality state based on socioeconomic and cultural factors when weighted against each other. 

![Classification report](https://github.com/StephenDini/Mortality_Predictor/blob/main/pictures/bagging_classification_report.png)

### Interactive Website

The mockup for the site was created using paint and gives the overall flow of the site for us to follow.
The inspiration for the mockup was taken from the belly button module.
The website will consist of one main landing page and various other pages for chats and maps.
The landing page will layout the information about the project and a blurb the team behind the project.
The website is hosted on github pages utilizing [Bootstrap](https://getbootstrap.com/) and Javascript.
With the data cleaned, we decided to use an interactive map to showcase the results.
Different approaches have been combed through based on the various Modules that were used during this course.
These include WeatherPy and Mapping Earthquakes.
The latter is more promising with the data we have for this project.
Other modules that were looked at were UFO Sightings and Mission to Mars,
in order to look at what can be done with formatting the webpage for the map.
So far, a map has been created as seen in the Live_Map folder.
Further work is needed.

---

## 🪣 Results

---

## 🧮 Analysis

---

## 📝 Extra Details

### Programs used

#### IDE

- [Webstorm](https://www.jetbrains.com/webstorm/)

#### Web Apps

- [Jupyter Notebook](https://jupyter.org/)

#### Text Processors

- [Sublime Text](https://www.sublimetext.com/)
- [VS Code](https://code.visualstudio.com/)

#### Drinks Consumed

- 2 bottles of SideCart
- 1 bottle of Mead
- X Black Russians
- 1 bottle of Prosecco

---

## 💻 Credits

**Mortality_Predictor** is the final project of [Stephen Dini](https://github.com/StephenDini)
, [Joe](https://github.com/JleMxe), [Claudia Wilkis](https://github.com/cwilkis)
, [Andrea Darrah](https://github.com/andrealynn8201)

<a href="https://github.com/StephenDini/Mortality_Predictor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=StephenDini/Mortality_Predictor" />
</a>

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
    