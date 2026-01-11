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