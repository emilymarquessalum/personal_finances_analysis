[incomplete, the description below is a plan to be executed] 

# Personal Finances Analysis

# Goal

This is a system/analysis tool to monitor personal finances. In here, you can check the [list of features](). 

## Video Guides
[add]


## Prediction of Budget 
The prediction model is used for dynamic expense categories, such as transportation, eating out, etc. 

* Any dinamic cost category can be set to be event-based: N events of X cost (example: you can set that the eating out category happens only 4 times in a month, specifically on Saturdays,and that the average cost of an eating out event is 20 bucks). Visually this is represented by the ticket system;
* An evaluation-by-historic can be enabled. Given previous months, it will determine how much money will be spent at that specific month. Visually this is the actual predictive value shown below the current real value;
* event-based and evaluation-by-historic should, when possible, be simultaneously enabled. From this, a contrast can be determined: the target goal (how many events and cost per event are expected), and the current prediction (accounting for the costs that were actually noticed in historical behaviour). According to [Ray Charles Howard, on "Here’s How To Build a Better Personal Budget"](https://news.darden.virginia.edu/2024/08/22/heres-how-to-build-a-better-personal-budget/) people make better decisions when using "Optimistic Budgeting" (setting lower cost limits, even below what their previous costs were in previous months). Using only an evaluation-by-historic does not challenge the user to make better decisions. Alternatively, only event-based may end in less flexibility when the previously set eventXcost show ineffectiveness, or when the defined target is not met, leading to potencial debts. Finally, it can be hypothesized that irrealistic expectations that can't be met over a great period of time may cause a lack of motivation to maintain it;
* In future implementations, the predictions made will react to new inputs. If a cost is made in that month the model will recalculate it's prediction to account for that value. It will also show the expected debt in comparison to the target value and a suggestion of where to cut costs to remove that debt. 

 
 
# Other Tools

I have made a spreadsheet to compare different finance apps [here](https://docs.google.com/spreadsheets/d/1S8fQy32FnvG1-aOlGFe6YXfJ-gkyB_yVd4tIjk3JRzs/edit?usp=sharing).

 
