import pandas as pd
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority")
mydb = myclient["RentalDB"]

listing = pd.read_csv("listings.csv")

# Generate Listings Collection

"""
mycol = mydb["Listing"]
listings = listing[["id","listing_url","name","description", "neighborhood_overview", "picture_url", "host_id", "host_url", "host_name", "host_since","neighbourhood_cleansed","latitude","longitude","property_type","room_type","bathrooms","bedrooms","beds","amenities","price","minimum_nights","maximum_nights", "number_of_reviews",	"review_scores_rating",	"review_scores_accuracy","review_scores_cleanliness","review_scores_checkin", "review_scores_communication","review_scores_location", "review_scores_value", "reviews_per_month"]]

listDict = listings.to_dict('records')
list = []
for key in listDict:
    list.append(key)
mycol.insert_many(list)
"""

# Generate Hosts Collection

"""
mycol = mydb["Host"]

hosts = listing[["host_id", "host_url", "host_name", "host_since", "host_location", "host_about", "host_neighbourhood", "host_listings_count"]]
hosts = hosts.drop_duplicates(subset=["host_id"])

listDict = hosts.to_dict('records')
list = []
for key in listDict:
    key["host_id"] = str(key["host_id"])
    key["password"] = "$2b$10$0WLUV8Qq5sJgx1BZTZ/hAujp9nL0SJMRzSfqxFOEg9Pqt9cw/R7mC"
    list.append(key)
mycol.insert_many(list)
"""

# Generate Reviews Collection

"""
reviews = pd.read_csv("reviews.csv")
mycol = mydb["Review"]

listDict = reviews.to_dict('records')
list = []
for key in listDict:
    list.append(key)
mycol.insert_many(list)
"""

# Generate Tenants Collection

"""
reviews = mydb["Review"]
list = []
for x in reviews.find():
    row_dict = {}
    row_dict["tenant_id"] = str(x["reviewer_id"])
    row_dict["first"] = x["reviewer_name"]
    row_dict["last"] = ""
    row_dict["password"] = "$2b$10$0WLUV8Qq5sJgx1BZTZ/hAujp9nL0SJMRzSfqxFOEg9Pqt9cw/R7mC"
    list.append(row_dict)
users = mydb["Tenant"]
users.insert_many(list)
"""
