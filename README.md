# Personal Finances Analysis

![image](plans.png)

# Step 1: Finances File
Firstly, I created a googlesheet file with the intention of organizing my finances file in a way that fitted my personal goals. 
This included the creation of 3 pages:

- "Finances": current month expenses; 
- "Historic": resultant values of expenses from previous months;
- "Investments": how much money I have invested and into what;

## "Finances" 
Finances should:
* Be as clear as possible on the overall expenses that I have every month consistently;
* Be easy for me to know if I will end the month positively;
* Hold which things I have yet to pay in that month (which prevents me from forgetting to do it);
* Allow me to make decisions on what to cut with ease (example: in a month where my salary will be delayed, I might have to cut on a particular item, so I turn it off in its respective row);
Every month these values will change and "be lost", because the current file only worries about that month, which helps it to not become cluttered.
There is a a "category" column which, besides "Normal Expenses" and "Earnings", also allows me to set things like "ifood" or "transportation", values whose cost are less predictable for every month. For example, rent doesn't change and is seen as a normal expense, cost in transportation does change and will be part of a type of expense which will be called "dynamic expense" in this project. Not only do I want to keep track of these dynamic expenses, I want to have as many details as possible from them: "what" was purchased, "where" it was purchased, "when" it was purchased, and even why when possible.  
At the end of every month the finances file must be duplicated in order to keep record of every detail from previous months.


## "Historic"
The historic must retain an overview of all my expenses, holding things such as "water bill", "month market cost",
"rent", and also the final value of the month for each dynamic expense. I would then put graphs in this section, showing how my expenses of each category changed over the months. Currently this page would be set manually, which is troublesome. 
 

#### How could We Improve the Usability/Responsiveness of this tool?
It is noticeble that the main problem with this file is the manual work to keep a consistent historic.
The historic data being manually derived from finances is not a good idea. 
It would be fairly useful if, with the click of a button, all that recorded information from the finances file was recorded to a historic, and then cleared from the finances file in order to start a new month, updating everything related to the historic itself. I assume this is not something I could practically make for myself in a single file with sheets alone, although my current knowledge of its capabilities is limited so it could be possible. 
In a future venture, we might conclude possible fixes for this problem, such as using a different tool, or, possibly, making a new sheet for each month (either making a new page, or a new file altogether) and then inputting the file(s) in PowerBI or python code in order to display the new updated historic. This historic only gets fully updated once a month, so an added step to get it can be reasonable.
With that said, although cumbersome, this initial organization has everything we need about the expectations of interaction and what data will exist in this scenario. Future iterations of this project might require coming back to these definitions.


# Step 2: Correlation Analysis
This repository has a ipynb file <a target="_blank" href="https://colab.research.google.com/github/emilymarquessalum/personal_finances_analysis/blob/main/finances.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a> that was used to analyze data from my personal finances.
The analysis made is fully aware that the usefulness of many of the models used on it will be insignificant for predictions, given the small sample. It is supposed to act as an exploratory view of the data, bringing and testing different levels of hypothesis about its behaviour. 
There is further explanation in the file, but in summary the following steps were employed:
* Data cleaning (removing empty and redundant information) and analysis of correlation;
* Linear regression using "time" (index) as input variable;
* Simple Auto Regression;


$ Step 3: Dashboard in Power BI


# Data secrecy

Since the financial data that was explored was personal, I followed measures to keep my actual data privated.
Firstly, I considered the following reference: https://mostly.ai/blog/data-anonymization-in-python

But ultimately decided for a practical approach: Copying the original file and filling out fake information. 
Every dataset can count a different narrative, and therefore the fake data might be modified in the future to reflect 
relations found in the original data, with the intention of keeping the actual data hiddent whilst still discussing 
about what was learned.
