[incomplete, the description below is a plan to be executed] 

# Personal Finances Analysis

# Goal

This is a system/analysis tool to monitor personal finances, with the following features:
* Add income and expenses that can be recurrent or repeat for a period of time;
* Create **budgets** for categories of expenses that suggests a limit to how much should be spent in that category in the month;
* Consider **predictions** based on previous costs for budgets to manage future months;
* Create saving boxes to keep money in. Additionally, set that box as a **future goal** to have an estimation of when it can be achieved with the current habits of costs (example: a retirement box, a video-game-console box, a new-computer box, etc).
* Visualize **historical** data including graphs for different costs, goal achievements and difference between real values and previous predicted values by the model;


## Prediction of Budget 
The prediction model is used for dynamic expense categories, such as transportation, eating out, etc. 

* Any dinamic cost category can be set to be event-based: N events of X cost (example: you can set that the eating out category happens only 4 times in a month, specifically on Saturdays,and that the average cost of an eating out event is 20 bucks). Visually this is represented by the ticket system;
* An evaluation-by-historic can be enabled. Given previous months, it will determine how much money will be spent at that specific month. Visually this is the actual predictive value shown below the current real value;
* event-based and evaluation-by-historic should, when possible, be simultaneously enabled. From this, a contrast can be determined: the target goal (how many events and cost per event are expected), and the current prediction (accounting for the costs that were actually noticed in historical behaviour). According to [Ray Charles Howard, on "Here’s How To Build a Better Personal Budget"](https://news.darden.virginia.edu/2024/08/22/heres-how-to-build-a-better-personal-budget/) people make better decisions when using "Optimistic Budgeting" (setting lower cost limits, even below what their previous costs were in previous months). Using only an evaluation-by-historic does not challenge the user to make better decisions. Alternatively, only event-based may end in less flexibility when the previously set eventXcost show ineffectiveness, or when the defined target is not met, leading to potencial debts. Finally, it can be hypothesized that irrealistic expectations that can't be met over a great period of time may cause a lack of motivation to maintain it;
* In future implementations, the predictions made will react to new inputs. If a cost is made in that month the model will recalculate it's prediction to account for that value. It will also show the expected debt in comparison to the target value and a suggestion of where to cut costs to remove that debt. 



## Automations:
* Future implementations will have functionality to import expenses data from a csv generated by a bank account, to reconcile the current informed expenses to the real expenses. Additionally newly added items can have their budget categories automatically identified;


## Relevant Graphs

* Line chart of gains, expenses and savings over time. With option to show objectives and special purchases in specific parts of the graph as icons or text;
* Pie chart to see ammount spent in each category in %;


# Other Tools

This section is to list some apps that were taken in consideration when building this tool. They are ordered by decreasing relevance relative to my perspective of quality and personal preference.
To simplify writting, I will be using the following emojis at the end of each app to represent:
* 🍓, from 1 to 4, to represent quality of UI/UX;
* 🌐 to free (or self-hosted) sync capabilities OR export/import functionality, 🕸️ when not;
* 🌟 to open souce projects that accept or receive contributions as of 2024;
* 👛 to budget systems that allow viewing resulting costs of the value expected for a category VS the current value spent. for FREE;
* 🚀 Has a functionality that takes in consideration the costs from previous months when calculating an expense that will exist in a future month (essencially, some prediction-like system for non-constant values);
* 🔮 Has functionality to help tracking when a certain goal would be achievable if the current budget habits are followed; 

And, to start, this is how I view my system: 🌟🕸️

[Projection lab](https://app.projectionlab.com/): web application used for long term planning. Visualization of savings over many years, capabilities to set up events that trigger changes in value of income and costs, and creation of multiple plans, to account for different possibilities. **However, the paid version doesn't allow you to save information, serving as mere experimentation.** Despite not being usable for free, this is still very inspiring, so much so it will stay on top of this list untill dethroned by a free app with similar functionality; 🍓🍓🍓🕸️🔮


[Minhas Finanças](): Very good app to track your money and expenses, allowing you to see your expenses and accumulated value through several months. The budget functionality, similar to GoodBudget, is very good but is unfortunetely locked by a paid subscription (that's a big disadvantadge from my perspective as a user). Syncing  with other devices and exporting the data to csv are also both locked. This doesn't allow the user to own their own data. Despite that, unless you really need that control over your data, this is the best configuration of features for a free price; 🍓🍓🍓🍓🕸️


[Actual Budget](https://actualbudget.org): Open Source and self-hosted, very interesting system. It utilizes an envelop budget system, which I enjoy. It has a slightly different philosophy from my personal preference, in the way it forces a lot of manual insertions to setup every month. The intention is to learn with your previous months and plan every month budget individually, instead of assuming the same costs for every month, which also helps in relation to irregular expenses. Additionally, there are options to set the budget of a category to be the average of X previous expenses. That's a feature I have been wanting to find in other systems, and it really adds to the quality of this system. Any personal-finances strategy should allow and ask for some amount of month variability because not all months are the same, while also giving you some kind of cool to apply the knowledge of previous months when calculating the costs of next months. It loses some features I like with different strategies, such as: Ease of use (not having to set up things all the time is preferable), see the result of following a set of habits over a series of months (which can technically be done in Actual but requires you to set every month manually making it less practical). Overall the features don't make it bad to use and its preferable over many other options. The design principles simply don't allign completely what works best for me, but it gets very close while offering desired functionalities;   🍓🍓🌐🌟👛🚀


[Cashew](): Open Source app, does not accept external contributions. Has limited visualization of future months, the budget functionality isn't accounted in a calculation of expenses (you can't directly see how much money you would have in the end of the month given you were to use all the money available in a specific), no direct functionality to accumulate money from previous months. 🍓🍓🌐


[Goodbudget](goodbudget.com): very minimalistic app, with budget categories with a maximum value associated with them where you put the expenses made. The limitation of the number of budgets, and the lack of export functionality make this not ideal. 🍓🕸️


[YNAB](https://www.ynab.com): Paid only (the reason why, despite very good, this is in last place). 🍓🍓🍓🕸️



# + Conceptual Financial Study

## Unplanned Purchases

In the situation of making new spendings that weren't planned (example: buy new glasses after having broken your original ones), there are many ways one could do the purchase in relation to their planning:

### Non-sparingly
Either not having a strict budget (and, often, not even tracking their expenses) and using money available in debit, or using money that is free in their current budget (money not set to anything in particular, that would be passed to another month if not used). If the behavior of spending free-money is seen consistently in many months, it might be useful to add an "extra" category to a budget of expenses that has an expected cost (average of extra expenses of other months) and should be considered accordingly to make financial decisions. The "extra" category should be used with caution, and should not be used by expenses that have an obvious cyclic nature and can therefore be their own expense type (example: if you have a habit of buying technology related items monthly to your pleasure, even if it started as something not recurrent, if it becomes consistent it's better to be true to your current behavior and set it as a budget to care for on its own)

### Using savings. 
Paying the purchase with money that was saved in previous months. This may come from an emergency savings, although ideally only if the item in question does indeed count as a life emergency. 
Other types of purchases can benefit from having a more diverse savings category system. 
Emergency savings is a good one, but there can be others: 
* Special Savings: you can use it to buy optional things for your own pleasure (Example: A game that recently came out);
* Gift Savings: there are many festivities that may make you want to buy a gift. By making a gifts saving you can control how much of your budget monthly can go to it, then sum it over a year and divide by the number of gifts you wish to give to have an individual-budget for each one of your gifts;
This may, however, sound too conservative, and will depend on your goals: if you are setting budgets so you can feel safe with your money, doing these savings might actually make you feel the opposite by causing you to always be afraid of every purchase you make. Ideally, the strictness of the budget should be set at a comfortable level. If you are in a situation where you cant spend much money, being strict is useful. Interestingly, it may also be useful if you have a lot of money, because by restricting yourself on how much money goes into each box you can avoid choice paralysis (having so many choices because of your financial freedom, but not knowing where to aim first), whilst still giving you freedom to indulge yourself and others (having more money would mean the absolute value you could save for gifts would be large enough to buy essentially any reasonable gift you might want to give, and therefore wont restrict you too badly). In many ways, making a strict budget categories system has the same benefits of doing any kind of financial planning;
 
### Making cuts 
Use money discounted from dynamic expenses (such as transportation, eating out...). 

### Credit Box Refill 
Use your credit card after a previous credit expense was finished paying. If you imagine your credit limit as a group of boxes, where an expense will occupy that box whilst not finished paying, this strategy would be to wait for an already used box to become empty. This way you will always be paying some money to a "box" of the credit card, continuously using that money to pay off the credit card and eventually replacing it with another expense. In essence, you are giving away part of your salary, turning that into a constant cost (just like a rent). The advantadge of doing that within the specific wording used in this item (the items below show a contrast) is that you didnt add an additional cost: if you were being capable of paying your credit card at a previous month, then you are still capable to pay for the next months (please note: this is assuming you dont go over the box you just de-occupied).

### Credit Box Expansion 
Use your credit card beyond the current boxes of credit This brings you closer to a state in which you have no control over your money, and should be considered with care. Differently from the previous strategy, you dont necessarily know if you will be able to pay the cost of next month without going in debt in another category (and therefore having to put more money into credit and snowballing).

### Credit Box Dropout 
Use money that was previously unavailable because of a box. This is different from the first idea: instead of filling the box again, you use the money that is now free to pay in debit. Obviously this is a superior strategy because it doesn't put you back into the cycle of refilling the box.

