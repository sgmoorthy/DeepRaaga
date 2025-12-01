import urllib.request
import json
import time

url = "http://localhost:8000/api/generate"
data = {
    "raga": "Mayamalavagowla",
    "duration": 10
}
headers = {'Content-Type': 'application/json'}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)

print(f"Testing API at {url}...")
try:
    with urllib.request.urlopen(req) as response:
        print("Status Code:", response.getcode())
        result = json.load(response)
        print("Response:", json.dumps(result, indent=2))
except Exception as e:
    print("Error:", e)
