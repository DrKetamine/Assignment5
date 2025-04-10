import numpy as np
import pandas as pd
import json
import csv
import os

thefile = "CondomSet"
unprocessedPath = "datasetsPreProcessed/CondomSet.csv"
data = pd.read_csv(unprocessedPath)

def columnDelete (file):
    file.drop('Government Campaigns', inplace=True, axis=1)
    file.drop('Contraceptive Usage Rate (%)', inplace=True, axis=1)
    file.drop('HIV Prevention Awareness (%)', inplace=True, axis=1)
    file.drop('Online Sales (%)', inplace=True, axis=1)
    file.drop('Sex Education Programs (Yes/No)', inplace=True, axis=1)

    return file

newFile = columnDelete(data)



csvFile = pd.DataFrame(newFile)
csvFile.to_json("datasetsProcessed/" + thefile + ".json", orient = "records", date_format = "epoch", double_precision = 10, force_ascii = True, date_unit = "ms", default_handler = None)
