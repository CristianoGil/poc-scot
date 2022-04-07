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
npm install
```


Update backoff API links in file `./src/utils/const.ts`
````
URL_API_SCOT: link for endpoint to get information about NIF to full fill PDF
URL_API_SCOT_SIGNATURE: Link for endpoint to sign document
````

## Development
Run the App
```shell
ionic serve
```