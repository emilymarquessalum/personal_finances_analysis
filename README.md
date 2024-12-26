[incomplete, the description below is a plan to be executed] 

# Personal Finances Analysis

# Goal

This is a system/analysis tool with clear steps to monitor personal finance information in a **spreadsheet**, visualize **historical** data and have **predictions** of specific cost categories. Each month has its own file, to keep a simplified format to short term decision making. A group of files can then be read for advanced functionality. 

1. Visualization:
* By saving every month expense file in a folder, we can have it **read with python code**, to transform them into a complete **historic**!
* This historic will show the monthly analysis results in a **PowerBI** report, showing the current consuming behaviour (with graphs of costs over several months);
* It will also show future months and years, with how much money will be saved overtime;
* A separate file can be used to set goals for the future (example: purchase a house) setting either a year-target or a savings-targer for it to happen. These goals will be shown in the graphs. Additionally, these goals can change values (example: setting so that the cost "rent" goes from X to Y once the house goal is reached);


2. Prediction Model
The prediction model is mainly used for dynamic expense categories, such as transportation, eating out, etc. Any type of leisure is often a dynamic expense, although the model is not limited to it.

* Any dinamic cost category can be set to be event-based: N events of X cost (example: you can set that the eating out category happens only 4 times in a month, specifically on Saturdays,and that the average cost of an eating out event is 20 bucks);
* An evaluation-by-historic can be enabled. Given previous months, it will determine how much money will be spent at all days of a specific month;
* event-based and evaluation-by-historic should , when possible, be simultaneously enabled. From this, a contrast can be determined: the target goal (how many events and cost per event are expected), and the current prediction (accounting how many events/cost-per-event were actually noticed in historical behaviour). According to [Ray Charles Howard, on "Here’s How To Build a Better Personal Budget"](https://news.darden.virginia.edu/2024/08/22/heres-how-to-build-a-better-personal-budget/) people make better decisions when using "Optimistic Budgeting" (setting lower cost limits, even below what their previous costs were in previous months). Using only an evaluation-by-historic does not challenge the user to make better decisions. Alternatively, only event-based may end in less flexibility when the previously set eventXcost show ineffectiveness, or when the defined target is not met, leading to potencial debts. Finally, it can be hypothesized that irrealistic expectations that can't be met over a great period of time may cause a lack of motivation to maintain it;
* The predictions made are set in calendar format, and react to new inputs. If a cost was predicted to be 20 in a specific day, and the actual value was 30, the model will recalculate each day to account for that value. It will also show the expected debt and a suggestion of where to cut costs to remove that debt. 



3. Automations:
* Future implementations will have functionality to import expenses data from a csv generated by a bank account, to the expected format of the finances file;


# Other Tools

[Projection lab](https://app.projectionlab.com/): web application used for long term planning. Visualization of savings over many years, capabilities to set up events that trigger changes in value of income and costs, and creation of multiple plans, to account for different possibilities. In that sense, this tool was a good inspiration. **However, the paid version doesn't allow you to save information, serving as mere experimentation.** 



# Step 1: Finances File

<!-- 
(removed for now)
Firstly, the file that organizes the finances of a particular month includes 2 pages:
- "Finances": current month expenses; 
- "Investments": how much money I have invested and into what. This will not be used in the analysis section, to limit the scope of this project, but can be visualized in the final PowerBI report;
-->

## "Finances" 

### Specific Structure chosen

There are 6 values that are calculated from the columns of costs, and they define which values each cost needs to have. Those are: Positive Value, Minimum Expense, Maximum Expense, Current, Final Minimum and Final Maximum. 

* Positive Value: Sum of all my earnings that I will be getting this month;
* Minimum Expense: Sum of all the minimal value of all my expenses that I expect to use this month;
* Maximum Expense: Sum of all the maximum value of all my expenses that I expect to use this mont;
* Current: My Positive Value, subtracted by all expenses that I already paid. That is, the ammount of money I expect myself to have at that exact moment;
* Final Minimum: My Positive Value, subtracted by all minimum values of my expenses. This is the most ammount of money I expect to have by the end of the month;
* Final Maximum: My Positive Value, subtracted by all maximum values of my expenses. This is the least ammount of money I epxect to have by the end of the month;

To account for that, each row of cost has 7 columns: 
* Paid: a checkbox that represents if that cost was already paid for the month;
* On: a checkbox, tells if the cost will be considerede in any of the calculations;
* Type: a dropdown, which includes the differentiation between costs and gains, and also serves a purpose in the dynamic-cost type system (explained below);
* Name: Just gives a name for the cost, will be relevant when using analysis because it will identify the expense which will be minitored through N months;
* Description: Can have any value, but its common usage is defining a date, or other useful specification for later time;
* Minimum expense and Maximum Expense. The minimum and maximum expense value can be used in two scenarios: for expenses which I am not exactly sure on the exact value I will pay, but I have a reasonable range that I can work with, or to represent a "current cost" vs "maximum cost" that I am allowed to use in any given cost.

Additionally, the file has special rows colored in blue, that instead of having these fields simply have a name, and are used to separate expenses of different categories.  

### Dynamic-Cost Type System
There are special types that are used when a particular spending is of a group of several separate spendings throughout
the month, such as "uber" or "ifood". In order to keep track both of the overall value of this expense, and the individual ones,
we make it be a "type" and keep all expenses of that type turned off. Then, we have a special row whose cost is the sum of all
expenses of that special type. These special costs will be called "dynamic expense" in this project. Not only do I want to keep track of these dynamic expenses, I want to have as many details as possible about them: "what" was purchased, "where" it was purchased, "when" it was purchased, and even why when possible.  
At the end of every month the finances file must be duplicated in order to keep record of every detail from previous months.

![image](https://github.com/user-attachments/assets/6c75f407-461e-4c9f-ab13-052363bfd9b2)


# Step 2: Correlation Analysis
This repository has a ipynb file <a target="_blank" href="https://colab.research.google.com/github/emilymarquessalum/personal_finances_analysis/blob/main/finances.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a> that was used to research the data from my personal finances, and see which tools would prove most useful to be passed to the official modular code.
The analysis made is fully aware that the usefulness of many of the models on it will be statistically non-significant for predictions, given the small sample. It as an exploratory view of the data, bringing and testing different levels of hypothesis about its behaviour. 
There is further explanation in the file, but in summary the following steps were employed:
* Data cleaning (removing empty and redundant information) and analysis of correlation;
* Linear regression using "time" (index) as input variable;
* Simple Auto Regression;
* Logistical Regression and Decision Trees;
* Predictions for every combination of Factors;

The results of this research will be considered in the next step.

# Step 3: Python Code
A python project will be created to read a group of finances files and create a historic file from them.
Additionally, it will make a page in the file for predictions that will be generated from the data. 
This project doesn't require an interface, as it will only have a single functionality and only files as input. 

# Step 4: Dashboard in Power BI
Divided into 3 Pages:
- **Spending Behavior:** Shows the evolution of spending throughout each month, the dynamic expenses, and the final results of the month;
- **Forecasts:** Based on the studied models, it presents expected cost data for the upcoming months;
- **Investments:** A simple screen that shows the current investment amounts. It will be a straightforward screen for this project.# Data secrecy

Since the financial data that was explored was personal, I followed measures to keep my actual data privated.
Firstly, I considered the following reference: https://mostly.ai/blog/data-anonymization-in-python

But ultimately decided for a practical approach: Copying the original file and filling out fake information. 
Every dataset can count a different narrative, and therefore the fake data might be modified in the future to reflect 
relations found in the original data, with the intention of keeping the actual data hiddent whilst still discussing 
about what was learned.
