import pandas as pd
import os

situation = []
location = []
reportDate = []
caseNum = []
occurDate = []
occurTime = []
summary = []
disposition = []

count = 0
with open("output.txt", 'r',errors='ignore') as file:
    for line in file:
        if(count == 0):
            situation.append(line)
            count= 1
        elif(count == 1):
            location.append(line)
            count = 2
        elif(count == 2):
            if(line.find("Date Reported") != -1):
                reportDate.append(line)
            elif(line.find("Incident/Case#") != -1):
                caseNum.append(line)
            elif(line.find("Date Occurred") != -1):
                occurDate.append(line)
            elif(line.find("Time Occurred") != -1):
                occurTime.append(line)
            elif(line.find("Summary") != -1):
                summary.append(line)
            elif(line.find("Disposition") != -1):
                disposition.append(line)
                count = 0
        

df = pd.DataFrame({"Situation": situation, "Location": location, "Date Reported": reportDate, "Incident/Case#": caseNum, "Date Occured": occurDate, "Time Occured": occurTime, "Summary": summary, "Disposition": disposition})
os.makedirs('data', exist_ok=True)  
df.to_csv('data/logs.csv', index=False)