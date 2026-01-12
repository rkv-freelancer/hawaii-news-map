# https://extensionpay.com/articles/browser-extensions-make-money
# Feedfinder.py

# https://docs.astral.sh/uv/
# https://drivendata.github.io/cookiecutter-data-science/
# https://dev.to/jps27cse/understanding-backend-folder-structure-a-beginners-guide-8a7

# Obtain RSS Feeds 
from pydantic import BaseModel, ConfigDict

# Read a Parser
import requests
import feedparser
import urllib.parse

"""
item
│
├── title (string)
├── link (URL string)
├── dc:creator (string)
├── pubDate (string)
│
├── category (array of strings)ow ow 
│     ├── category
│     ├── category
│     └── … (0…N)
│
├── guid (string + isPermaLink attr)
│
├── description (string/HTML)
│
├── enclosure (optional)
│     ├── url
│     ├── type
│     └── length
│
└── dcterms:modified (string – ISO 8601)

"""

# Print To Console.log
def findFeed(url: str): 
    f = feedparser.parse(url)
    if len(f.entries) > 0:
        print("-" * 20)
        print(f"Found: {len(f.entries)}")
        print("-" * 20, "\n")
        
        # Check if it is a `Paywall`
        
        # Obtain As Index
        for entry in f.entries: 
            print(f"Title: {entry.get("title", "No title available")}")
            print(f"Link: {entry.get("link", 'No link available')}")
            
            # Use .get() method to safely access elements that might not exist in every feed
            print(f"Description: {entry.get('description', 'No summary available')}") 
            print("-" * 20)
        
if __name__ == "__main__": 
    # Main URL 
    # Add To Multiple Feeds
    url_local_news: str = "https://www.khon2.com/top-stories/feed/"
    findFeed(url = url_local_news)


# Prenium Stories? 

# Feed To LLM to Generate Geo Information for News Article
# Attempt #1: No to Categories (Multiple  News), `<![CDATA[ ... ]]>`
# Attempt #2: 

