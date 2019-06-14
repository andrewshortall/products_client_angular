+++
title = "Products client (Angular)"
+++

# Products client (Angular)

This is the frontend client for the [Products module](https://docs.walhall.io/marketplace/products-module), written in Angular.

## Develop this client

-  To **build** the project: `ng build`  
  -  The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
-  To **run tests** using [Karma](https://karma-runner.github.io/0.13/index.html): `ng test`
-  To **run end-to-end tests** using [Protractor](https://www.protractortest.org/#/): `ng e2e`

## File structure

-  `/pages`: Components that have roots assigned to them.
-  `/state`: State-related files and data models.
-  `routing.module.ts`: Where the client's routes are defined.
-  `ngModule`: Where components, services, pipes, etc. are defined.

## Services

This client connects to the following services:

-  [Products service (Django)](https://docs.walhall.io/marketplace/products-module/products-service)

<!-- Document the ways in which this client connects to the service. Methods used, data models used, endpoints used, etc. -->

## API documentation (Compodoc)

Run `npm run compodoc` to generate [Compodoc](https://compodoc.github.io/compodoc/) documentation to the `/documentation` directory.

## License

Copyright &#169;2019 Humanitec GmbH.

This code is released under the Humanitec Affero GPL. See the **LICENSE** file for details.
