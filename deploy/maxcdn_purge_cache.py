from maxcdn import MaxCDN

api = MaxCDN('windsmobi', '', '')

# Purge All Cache
api.delete('/zones/pull.json/470828/cache')
print('MaxCDN cache purged')
