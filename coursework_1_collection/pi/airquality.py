import serial, time
import csv
from datetime import datetime

# Define USB serial connection to PM particle sensor
ser = serial.Serial('/dev/ttyUSB0')

def main():
	while True:
		pm25List = [] # Temporary lists for storing data for each 2 min interval
		pm10List = []
		dt = str(datetime.now())
		filename = str(datetime.now().date()) # Finds CSV filename with correct date
		for i in range(6):
			pm25,pm10 = readSensor()
			pm25List.append(pm25)
			pm10List.append(pm10)
			print("Read Values: "+dt + ", "+str(pm25)+", "+str(pm10))
			time.sleep(20) # Data collection at 20s interval for 6 times
		
		# Calculates mean value over 2 mins
		pm25Final = sum(pm25List)/6
		pm10Final = sum(pm10List)/6

		updateCsv(filename, dt, pm25Final, pm10Final)
		print("Final Value 2 min: "+ dt + ", "+str(pm25Final)+", "+str(pm10Final))


def updateCsv(fileName, dt, pm25, pm10):
	with open("DataAirQuality_"+fileName+".csv", "a") as air: # finds correct CSV file
		airWriter = csv.writer(air)
		airWriter.writerow([dt,pm25,pm10]) # appends calculated datapoints


def readSensor():
	data = []
	for i in range(0,10): # Reads 10 bytes of data from sensor
		datum = ser.read()
		data.append(datum)

	#pm25 = convertPM(data[3],data[2])
        #pm10 = convertPM(data[5],data[4])

	pm25 = int.from_bytes(b''.join(data[2:4]), byteorder='little') / 100 # collects PM2.5 particle level
	pm10 = int.from_bytes(b''.join(data[4:6]),byteorder='little')/100 # collects PM10 particle level

	return pm25, pm10
"""
def convertPM(high,low):
	return (high*256+low)/10
"""
main()
