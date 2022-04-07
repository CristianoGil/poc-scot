# poc-scot
SCoT - Sistema de Contra-ordenaçôes de Transito


### Install the Ionic CLI​

Before proceeding, make sure your computer has [Node.js](https://ionicframework.com/docs/reference/glossary#node) installed. See these instructions to set up an environment for Ionic.

Install the Ionic CLI with npm:
```shell
npm install -g @ionic/cli
```

The first time, you will need to run:
```shell
cd poc-scot
npm install
```
Update backoff API links in file `./src/utils/const.ts`

````
URL_API_SCOT: link for endpoint to get information about NIF to full fill PDF
URL_API_SCOT_SIGNATURE: Link for endpoint to sign document
````

## Development
Run the App to 
```shell
ionic serve
```

## Production
Build for production
```shell
ionic build browser --verbose
```
This will create a production-ready build of your app in the project's `./dist` directory.

Run production locally with nodejs static file server:
```shell
npm install -g serve
# -s flag means serve it in Single-Page Application mode
# which deals with the routing problem below
serve -s dist
```
