## Script to just request selected datapoints from dark sky
# Powered by Dark Sky; https://darksky.net/dev
# Uses ForecastIO Python 3 Wrapper: https://github.com/bitpixdigital/forecastiopy3
import time
import requests
import json
from forecastiopy import *
from datetime import datetime
import csv

def main():
    #for i in range(3):
    while True:
        dt = str(datetime.now())
        filename = str(datetime.now().date()) # Finds CSV filename with correct date
        pressure,precipIntensity,precipProbability,windSpeed,windGust = whatstheWeather() #calls the API request function
        updateCsv2(filename,dt,pressure,precipIntensity,precipProbability,windSpeed,windGust) #writes collected data to CSV file
        print('New entry to DataWeather_'+filename+'.csv at '+dt)
        time.sleep(120) # wait 2 min

def updateCsv2(fileName, dt, pressure, precipIntensity, precipProbability, windSpeed, windGust):
	with open("DataWeather_"+fileName+".csv", 'ab') as sky: # finds correct CSV file
		skyWriter = csv.writer(sky)
		skyWriter.writerow([dt,pressure,precipIntensity,precipProbability,windSpeed,windGust]) # appends calculated datapoints

def whatstheWeather():
    # API request url for current weather with unique API_key, and location co-ordinates
    my_API_key = 'YOUR KEY HERE'
    Loc = [51.495378,-0.100589]
    fio = ForecastIO.ForecastIO(my_API_key, latitude=Loc[0], longitude=Loc[1]) #uses ForecastIO Python 3 wrapper to format request URL

    if fio.error == -1:
        return 0,0,0,0,0

    current = FIOCurrently.FIOCurrently(fio) # Uses "current" class from wrapper




    #print('Latitude', fio.latitude, 'Longitude', fio.longitude)
    print('Timezone', fio.timezone, 'Offset', fio.offset)

    # prints necessary attributes from the response
    print('Pressure:',current.pressure)
    print('Precipitation Intensity:',current.precipIntensity)
    print('Precipitation Probability:', current.precipProbability)
    print('Wind Speed:', current.windSpeed)
    print('Wind Gust:', current.windGust)

    return current.pressure, current.precipIntensity, current.precipProbability, current.windSpeed, current.windGust

main()
