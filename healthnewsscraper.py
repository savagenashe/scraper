import requests
from bs4 import BeautifulSoup
import json

url = "https://www.afro.who.int/countries/ghana/news"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

article_containers = soup.find_all("article", class_="news")
articles = []

for container in article_containers:
    title = container.find("h3", class_="teaser-full__title").text.strip()
    date = container.find("div", class_="date").text.strip()
    content = container.find("div", class_="content").text.strip()
    read_more_rel_url = container.find("div", class_="read_more").find("a")["href"]
    read_more_full_url = "https://www.afro.who.int" + read_more_rel_url
    
    article = {
        "title": title,
        "date": date,
        "content": content,
        "read_more": read_more_full_url
    }
    
    articles.append(article)

json_data = json.dumps(articles)

print(json_data)
