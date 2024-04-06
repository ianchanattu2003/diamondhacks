import pdfplumber
import os
import pandas as pd

longString = ""
headers = ["Situation", "Location", "Date Reported", "Incident/Case#", "Date Occured", "Time Occured", "Summary", "Disposition"]
df = pd.DataFrame

i = 0
for file in os.listdir("logs"):
    with pdfplumber.open(os.path.join("logs", file)) as pdf:
        for page in pdf.pages:
            if file == "March 18, 2024.pdf" and page.page_number > 5:
                continue #they dumped every crime and location for some reason
            lines = page.extract_text().split('\n')
            for line in lines:
                if line == "UCSD POLICE DEPARTMENT" or line == "CRIME AND FIRE LOG/MEDIA BULLETIN" or line + ".PDF" == file.upper() or line + " UPDATED.PDF" == file.upper():
                    continue #ignore page headers
                longString += line + "\n"

# f = open("output.txt", "a")
# f.write(longString)
# f.close()
                