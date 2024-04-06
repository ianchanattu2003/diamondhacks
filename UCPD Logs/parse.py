import pdfplumber
import os
import pandas as pd

situation = []
location = []
reportDate = []
caseNum = []
occurDate = []
occurTime = []
summary = []
disposition = []

i = 0
for file in os.listdir(os.path.join("UCPD Logs", "logs")):
    with pdfplumber.open(os.path.join("UCPD Logs", "logs", file)) as pdf:
        for page in pdf.pages:
            if file == "March 18, 2024.pdf" and page.page_number > 5:
                continue # they dumped every crime and location for some reason
            lines = page.extract_text().split('\n')
            for line in lines:
                if line == "UCSD POLICE DEPARTMENT" or line == "CRIME AND FIRE LOG/MEDIA BULLETIN" or line + ".PDF" == file.upper() or line + " UPDATED.PDF" == file.upper():
                    continue # ignore page headers
                match (i % 8):
                    case 0:
                        situation.append(line)
                    case 1:
                        location.append(line)
                    case 2:
                        if "Date Reported" not in line:
                            print(file + line)
                            continue
                        reportDate.append(line)
                    case 3:
                        if "Incident/Case#" not in line:
                            print(file + line)
                            continue
                        caseNum.append(line)
                    case 4:
                        if "Date Occurred" not in line:
                            print(file + line)
                            continue
                        occurDate.append(line)
                    case 5:
                        if "Time Occurred" not in line:
                            print(file + line)
                            continue
                        occurTime.append(line)
                    case 6:
                        if "Summary" not in line:
                            print(file + line)
                            continue
                        summary.append(line)
                    case 7:
                        if "Disposition" not in line:
                            print(file + line)
                            continue
                        disposition.append(line)
                
                i += 1


df = pd.DataFrame({"Situation": situation, "Location": location, "Date Reported": reportDate, "Incident/Case#": caseNum, "Date Occured": occurDate, "Time Occured": occurTime, "Summary": summary, "Disposition": disposition})
df.to_csv('data/logs.csv', index=False)