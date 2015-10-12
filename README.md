1. Get the list of the best 500 movies from IMDB  

- Use the YQL console : https://developer.yahoo.com/yql/console/  
- Get the result from these requests:  

```
select * from html where url="http://www.imdb.com/list/ls003073623/?start=1&view=compact&sort=listorian:asc" and xpath="//table/tbody/tr/td[contains(@class,'title')]/a"  
```  

```
select * from html where url="http://www.imdb.com/list/ls003073623/?start=251&view=compact&sort=listorian:asc" and xpath="//table/tbody/tr/td[contains(@class,'title')]/a"
```

