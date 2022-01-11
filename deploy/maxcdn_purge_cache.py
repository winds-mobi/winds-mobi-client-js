import os
from maxcdn import MaxCDN

api = MaxCDN("windsmobi", os.environ["MAXCDN_KEY"], os.environ["MAXCDN_SECRET"])

# Purge All Cache
api.delete("/zones/pull.json/470828/cache")
print("MaxCDN cache purged")
