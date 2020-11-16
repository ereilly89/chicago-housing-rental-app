import pandas as pd
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority")
mydb = myclient["RentalDB"]

listing = pd.read_csv("listings.csv")

# Listings

"""
mycol = mydb["Listing"]
listings = listing[["id","listing_url","name","description", "neighborhood_overview", "picture_url", "host_id", "host_url", "host_name", "host_since","neighbourhood_cleansed","latitude","longitude","property_type","room_type","bathrooms","bedrooms","beds","amenities","price","minimum_nights","maximum_nights", "number_of_reviews",	"review_scores_rating",	"review_scores_accuracy","review_scores_cleanliness","review_scores_checkin", "review_scores_communication","review_scores_location", "review_scores_value", "reviews_per_month"]]

listDict = listings.to_dict('records')
list = []
for key in listDict:
    list.append(key)
mycol.insert_many(list)
"""

# Hosts

"""
mycol = mydb["Hosts"]
hosts = listing[["host_id", "host_url", "host_name", "host_since", "host_location", "host_about", "host_neighbourhood", "host_listings_count"]]
pd.DataFrame.drop_duplicates(hosts)

listDict = hosts.to_dict('records')
list = []
for key in listDict:
    list.append(key)
mycol.insert_many(list)
"""

# Reviews

"""
reviews = pd.read_csv("reviews.csv")
mycol = mydb["Review"]

listDict = reviews.to_dict('records')
list = []
for key in listDict:
    list.append(key)
mycol.insert_many(list)
"""

# Tenants

"""
reviews = mydb["Review"]
list = []
for x in reviews.find():
    row_dict = {}
    row_dict["tenant_id"] = x["reviewer_id"]
    row_dict["name"] = x["reviewer_name"]
    list.append(row_dict)
users = mydb["Tenant"]
users.insert_many(list)
"""
