import pandas as pd

vehicle = []
location = []
occurDate = []
occurTime = []
summary = []
reportSource = []

df = pd.read_csv('./data/logs.csv')

for index, row in df.iterrows():
    if "Theft" in row["Situation"]:
        if ("electric bicycle" in str(row["Summary"]).lower()):
            vehicle.append("Electric Bicycle")
        elif ("scooter" in str(row["Summary"]).lower()):
            vehicle.append("Electric Scooter")
        elif ("bicycle" in str(row["Summary"]).lower()):
            vehicle.append("Bicycle")
        else:
            continue
        location.append(row["Location"])
        occurDate.append(row["Date Occured"])
        occurTime.append(row["Time Occured"])
        summary.append(row["Summary"])
        reportSource.append("UCPD Logs")



newdf = pd.DataFrame({"Vehicle": vehicle, "Location": location, "Date Occured": occurDate, "Time Occured": occurTime, "Summary": summary, "Report Source": reportSource})
newdf.to_csv('data/sheets.csv', index=False)