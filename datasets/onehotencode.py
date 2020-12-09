
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelBinarizer
from sklearn import preprocessing
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import MinMaxScaler

df = pd.read_csv("listing_training_cleaned.csv")

neighborhood = pd.DataFrame(LabelBinarizer().fit_transform(df["neighborhood"]), columns=sorted(df["neighborhood"].unique()))
roomType = pd.DataFrame(LabelBinarizer().fit_transform(df["room_type"]), columns=sorted(df["room_type"].unique()))
new_df = pd.concat([df, neighborhood, roomType], axis=1)
new_df = new_df.drop(["neighborhood", "room_type"], axis=1)
new_df = new_df.astype(float)
print(str(new_df))
theColumns = new_df.columns

# Impute missing values with the mean
imp = SimpleImputer(missing_values=np.nan, strategy='mean')
new_df = imp.fit_transform(new_df)
new_df = pd.DataFrame(new_df, columns=theColumns)

print("min:" + str(new_df['price'].min()))
print("max:" + str(new_df['price'].max()))

# Scale each feature into 0 to 1 range
minMaxScaler = MinMaxScaler()
#new_df[["price"]] = minMaxScaler.fit_transform(new_df[["price"]])
#new_df = pd.DataFrame(new_df, columns=theColumns)

# Write to the file
new_df.to_csv("listingTrainingData_Header.csv", index=False)
new_df.to_csv("listingTrainingData_NoHeader.csv", index=False, header=False)
