# 💀  Mortality_Predictor

### Question that we want to answer
What are the socioeconomic and cultural factors that impact mortality rates around the world?

### Communication
As a group we have utilized Slack and Zoom as a means of communication.  We have reached out to both individuals and as a group in order to answer questions in a timely manor, as well as discuss goals, strategy, where we are in our portion of the project, and any future meeting times that would be necessary to continue with the forward momentum of the project.

## 🚧 Project Information by Parts

### ETL Methodology

#### Data Files and Sources
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
    

#### Approach
* Data files were first read in as dataframes
* Each dataframe was then examined for content and layout
* Some data was not available for all years
    * Literacy
        * Most current year available for each country was used
    * Religion
        * 2010 was used as the breakdown in religion over time in a country tends to be a very slow moving process
* Cleaning of each dataframe was perform
    * Data types were examined and modified as needed (made numeric for Machine Learning)
    * Rows with Nulls were dropped
    * Complex or cryptic column headings were renamed
    * In two cases (Alcohol and Mortality Rates) the various years were not represented by columns. Rather, they were all in one column with the data spread out after in columns. This presented a problem as the data needed to be columnated. The beginning is shown below.

![Alcohol Pre Transformation](./pictures/alcohol_dataframe_1.png)
![Mortality Pre Transformation](./pictures/mortality_dataframe_1.png)

* The dataframes were split into individual dataframes by year
* The Year column was then dropped from each
* The resulting dataframes were then merged back together
* The end results were transformed dataframes usable for machine learning

![Alcohol Pre Transformation](./pictures/alcohol_dataframe_2.png)
![Mortality Pre Transformation](./pictures/mortality_dataframe_2.png)

* Un-needed columns were dropped
* Cleansed and transformed dataframes were then merged into a single data frame
* Column mortality_rate was added to show the 2015 mortality rate data as a percentage
* Column mortality_state was added binning denoting whether the mortality_rate is high(3), medium(2), or low(1) using breakpoints as follows:
    *   Greater than 20% is considered high
    *   Between 10% and 20% is considered medium
    *   Less than 10% is considered low
*   The above breakpoints were chosen as it produces a reasonable distribution of data between the bins.

![Mortality Breakpoints](./pictures/mortality_state_breakpoints.png)



* Data types were checked again just to makes nothing was missed
* The data frame was saved as a csv file to be used in machine learning
* Specific columns were selected and saved in json and GEOJSON format files for the mapping purposes.

### Machine learning model
For the project, our group wants to see if a machine learning model can correlate socioeconomic and coltural factors to mortality rates by country. Our project used supervised machine learning, specifically the Random Forest Classifier method, given our data is labeled and we are looking for a discrete outcome. Several other methods were tested (see mortality_machine_learning and mortality_machine_learning_2 in machine learning folder). Those methods were rejected given that the balanced accuracy scores were lower than the Random Forest Classifer. We chose the balanced accuracy score as the method for measuring how well the model performed based on best practices learned in class, as well as best practice, according to [machinemastery.com](https://machinelearningmastery.com/how-to-know-if-your-machine-learning-model-has-good-performance/) for classification models.

#### Data Processing
Once ETL completed on datasets, there were 26 features to test against mortality rate. Mortality Rate columns for all years were dropped, as well as the mortality state so the model could use "mortality_state' as the y variable. Country name column was also dropped as it was not a numerical column. The original model resulted in a 70.9 balanced accuracy score.

#### Optimizing Model

### Interactive Website
With the data cleaned, we decided to use an interactive map to showcase the results.  Different approaches have been combed through based on the various Modules that were used during this course.  These include WeatherPy and Mapping Earthquakes.  The latter is more promising with the data we have for this project.  Other modules that were looked at were UFO Sightings and Mission to Mars, in order to look at what can be done with formatting the webpage for the map.  So far, a map has been created as seen in the Live_Map folder.  Further work is needed.

---

## 🪣 Results

---

## 🧮 Analysis

---

## 📝 Summary

---

## 💻 Credits

**Mortality_Predictor** is the final project of [Stephen Dini](https://github.com/StephenDini), [Joe](https://github.com/JleMxe), [Claudia Wilkis](https://github.com/cwilkis), [Andrea Darrah](https://github.com/andrealynn8201)

<a href="https://github.com/StephenDini/Mortality_Predictor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=StephenDini/Mortality_Predictor" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

---

## 📌 Sources

