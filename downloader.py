# https://commedesgarcons.s-ul.eu/47AVdPQa

import io
import zipfile
import urllib.request
req = urllib.request.Request(
    "https://commedesgarcons.s-ul.eu/47AVdPQa"
)
print("Downloading Files...")
with urllib.request.urlopen(req) as response:
    print("Extracting Files...")
    zipfile.ZipFile(io.BytesIO(response.read())).extractall()
print("Done!")