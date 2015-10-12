PopCorn Garage
==============

[PopCorn Garage](http://www.popcorngarage.com/) is a game where the goal is to discover the 66 references to cult movies from pop culture hidden in a single picture.


Finding the solution
====================

Create a list of movies to test
-------------------------------

The program iterates over a list of movies and test each of them against the PopCorn Garage script that tells if there is reference of the movie in the picture.

To get the list of movies we use the [YQL console](https://developer.yahoo.com/yql/console/) to parse the content of:  
1. [500 Greatest Movies of All Time](http://www.imdb.com/list/ls003073623/?start=1&view=compact&sort=listorian:asc)  
2. [3000 Best Movies and T.V. Series](http://www.imdb.com/list/ls058293270/?start=1&view=compact&sort=listorian:asc)

For each of these lists, use the corresponding YQL request:  
1. ``` select * from html where url="http://www.imdb.com/list/ls003073623/?start=1&view=compact&sort=listorian:asc" and xpath="//table/tbody/tr/td[contains(@class,'title')]/a"```       
Note: use start=1, then start=251  
2. ``` select * from html where url="http://www.imdb.com/list/ls058293270/?start=1&view=compact&sort=listorian:asc" and xpath="//table/tbody/tr/td[contains(@class,'title')]/a"```       
Note: use start=1, then start=251, then start=501, ......, then start=2501, then start=2751


Test each movie for it's appearance
-----------------------------------

Make a POST request to the following address to test each movie:  
```
http://www.popcorngarage.com/scripts/lookup.php
```  

Each request must pass 2 parameters:  
- ```title``` : the movie title  
- ```lang```  : the language of the movie title (```en``` or ```fr```)


Run the program
===============

Type the following commands:  
1. ```npm install```  
2. ```node index.js```

Each movie name is displayed in the console, either in green if it's found, or in red if not.  
A complete list of all the found movies is displayed at the end.  [You can find the results here](/RESULTS.md).  
  
