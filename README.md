## Web app for permutation cipher

https://permutation-cipher.herokuapp.com/

![App screenshot](app-screenshot.png?raw=true "Title")

## Running locally
Start server:
```
DEVELOPMENT=1 python3 run.py
```
`DEVELOPMENT=1` enables CORS on the server to work properly with webpack dev server.

Start frontend:
```
npm start
```

## Running tests
Server:
```
python3 PermutationCipherServer/test_crypto.py
```

Frontend:
```
npm t
```
