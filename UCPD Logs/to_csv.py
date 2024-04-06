import pandas as pd

situation = []
location = []
reportDate = []
caseNum = []
occurDate = []
occurTime = []
summary = []
disposition = []


with open("output.txt", 'r') as file:
    for line in file:
        print("")

df = pd.DataFrame({"Situation": situation, "Location": location, "Date Reported": reportDate, "Incident/Case#": caseNum, "Date Occured": occurDate, "Time Occured": occurTime, "Summary": summary, "Disposition": disposition})
df.to_csv('data/logs.csv', index=False)