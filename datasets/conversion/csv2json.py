import csv,json

dataset = 1; # 0 for air quality, 1 for weather
# also check no. of attrbitues in elem below

if dataset == 1:

    csvFilePath = open('DataWeather_MASTER.csv', 'r')
    jsonFilePath = open('DataWeather_CONVERTED.json', 'w')
    fieldnames = ("Time","Pressure","PrecipProbability","PrecipIntensity","WindSpeed","WindGust")

else:
    csvFilePath = open('DataAirQuality_MASTER.csv', 'r')
    jsonFilePath = open('DataAirQuality_CONVERTED.json', 'w')
    fieldnames = ("Time","PM25","PM10")
"""
reader = csv.DictReader(csvFilePath, fieldnames)
for row in reader:
    json.dump(row, jsonFilePath)
    jsonFilePath.write('\n')

"""
data = list()

with csvFilePath as csvFile:
    reader = csv.reader(csvFile)
#    for rec in csv.reader(csvFile, delimiter=','):

    data = list(list(rec) for rec in csv.reader(csvFile, delimiter=',')) #reads csv into a list of lists

for elem in data:
    #elem[0] = elem[0].replace(' ', 'T')
    elem[1] = float(elem[1])
    elem[2] = float(elem[2])
    elem[3] = float(elem[3])
    elem[4] = float(elem[4])
    elem[5] = float(elem[5])

with jsonFilePath as jsonFile:
    json.dump(data, jsonFile)
