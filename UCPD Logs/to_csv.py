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
            count = 1
        elif(count == 1):
            location.append(line)
            count = 2
        elif(count == 2):
            if(line.find("Date Reported") != -1):
                cut = line.split(' ', 2)
                if len(cut) < 3:
                    reportDate.append("")
                else:
                    reportDate.append(cut[2])

            elif(line.find("Incident/Case#") != -1):
                cut = line.split(' ', 1)
                if len(cut) < 2:
                    caseNum.append("")
                else:
                    caseNum.append(cut[1])

            elif(line.find("Date Occurred") != -1):
                cut = line.split(' ', 2)
                if len(cut) < 3:
                    occurDate.append("")
                else:
                    occurDate.append(cut[2])

            elif(line.find("Time Occurred") != -1):
                cut = line.split(' ', 2)
                if len(cut) < 3:
                    occurTime.append("")
                else:
                    occurTime.append(cut[2])

            elif(line.find("Summary") != -1):
                cut = line.split(' ', 1)
                if len(cut) < 2:
                    summary.append("")
                else:
                    summary.append(cut[1])

            elif(line.find("Disposition") != -1):
                cut = line.split(' ', 1)
                if len(cut) < 2:
                    disposition.append("")
                else:
                    disposition.append(cut[1])
                count = 0
        

df = pd.DataFrame({"Situation": situation, "Location": location, "Date Reported": reportDate, "Incident/Case#": caseNum, "Date Occured": occurDate, "Time Occured": occurTime, "Summary": summary, "Disposition": disposition})
os.makedirs('data', exist_ok=True)  
df.to_csv('data/logs.csv', index=False)
