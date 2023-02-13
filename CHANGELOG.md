# Changelog

## [1.13.2](https://github.com/sandworm-hq/sandworm-utils/compare/utils-v1.13.1...utils-v1.13.2) (2023-02-13)


### Bug Fixes

* ci pipeline package visibility ([8fb9ca0](https://github.com/sandworm-hq/sandworm-utils/commit/8fb9ca00ed11e7464b819dcfb7f4a5a4330b4760))

## [1.13.1](https://github.com/sandworm-hq/sandworm-utils/compare/utils-v1.13.0...utils-v1.13.1) (2023-02-13)


### Bug Fixes

* code style issues ([d3665ef](https://github.com/sandworm-hq/sandworm-utils/commit/d3665ef0c4156cebb099f95e78af21119a6b7769))

## [1.13.0](https://github.com/sandworm-hq/sandworm-utils/compare/utils-v1.12.1...utils-v1.13.0) (2023-02-13)


### Features

* `loadDependencies` arg to exclude dev deps ([5624aed](https://github.com/sandworm-hq/sandworm-utils/commit/5624aed994428a7569482b8c993e60b8dffc89de))
* `loadDependencies` now returns package tree ([d31c542](https://github.com/sandworm-hq/sandworm-utils/commit/d31c54285b45804fe48924f17c31a557cfde2b86))
* add shared functionality ([6722e33](https://github.com/sandworm-hq/sandworm-utils/commit/6722e33f31930862a9b0ff8f67d4c52fb84df73b))
* forward events to Inspector ([1862309](https://github.com/sandworm-hq/sandworm-utils/commit/1862309f675214a9f2321ec1f2f4f5850c2bab87))
* get local package sizes ([7acd48c](https://github.com/sandworm-hq/sandworm-utils/commit/7acd48cf5ee607d3fa39a11b761a642674080fd3))
* graph generation ([f6c9f4e](https://github.com/sandworm-hq/sandworm-utils/commit/f6c9f4e7cf4f7c2b0a219c2cc8f2324a0c92975e))
* initial release ([84442e0](https://github.com/sandworm-hq/sandworm-utils/commit/84442e0da39e1ec1573b14663f3ec46151affa25))
* make all methods support both promise&async ([4facc94](https://github.com/sandworm-hq/sandworm-utils/commit/4facc94e83e011b07aac6cda3e28c287828e1589))
* more standard graph node properties ([a649f79](https://github.com/sandworm-hq/sandworm-utils/commit/a649f79705ff123101866f5fc83376b21bd01461))
* support registry metadata collection ([9d4c194](https://github.com/sandworm-hq/sandworm-utils/commit/9d4c19458a120b62aa23dc081302f7a98244359b))
* support stringified license data ([e1b8838](https://github.com/sandworm-hq/sandworm-utils/commit/e1b8838b2f70a7458edb868edb8620a1eb04e929))
* update Sandworm to v1.3.1 ([63da401](https://github.com/sandworm-hq/sandworm-utils/commit/63da4015ccc5df02d543f1f35f0af732ca8707f8))
* update Sandworm to v1.3.2 ([a77c1a9](https://github.com/sandworm-hq/sandworm-utils/commit/a77c1a9b2ffc7c8958d41fdf62223624dfa2d0c1))


### Bug Fixes

* `loadDependencies` returns unique items ([77bf47a](https://github.com/sandworm-hq/sandworm-utils/commit/77bf47a83b8701437723fc6de8d0dbe29423fba5))
* `loadSandworm` config option name ([de05544](https://github.com/sandworm-hq/sandworm-utils/commit/de05544792bb84865fc0e26c032d778b79d21a3f))
* better deprecated manifest license handling ([df50b52](https://github.com/sandworm-hq/sandworm-utils/commit/df50b52f252d25c090b0664a23791b611803f35a))
* crash when post-processing empty graphs ([94d35dd](https://github.com/sandworm-hq/sandworm-utils/commit/94d35ddc254878c9512df7aac63a8e2ed83969e4))
* crash when using pnpm with no dependencies ([b9f64f8](https://github.com/sandworm-hq/sandworm-utils/commit/b9f64f8e1eb83aaba533902df3ffef1a25ff99b5))
* json license data parsing ([9a9779e](https://github.com/sandworm-hq/sandworm-utils/commit/9a9779e7326a757df6d996bfd9fb94d5005dc069))
* package size no longer includes node modules ([3f4e463](https://github.com/sandworm-hq/sandworm-utils/commit/3f4e463561b53edb232e2f0a88b8f1bba3c11726))
* remove disconnected nodes from all packages ([192315e](https://github.com/sandworm-hq/sandworm-utils/commit/192315e86e8eb584e2452fa33982c4fdc56b95b6))
* support older, non-standard manifest licenses ([7504cb4](https://github.com/sandworm-hq/sandworm-utils/commit/7504cb4f85aad6ab2f8544eaf361aa6215d23f76))

## [1.12.1](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.12.0...sandworm-utils-v1.12.1) (2023-01-27)


### Bug Fixes

* json license data parsing ([9a9779e](https://github.com/sandworm-hq/sandworm-utils/commit/9a9779e7326a757df6d996bfd9fb94d5005dc069))

## [1.12.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.11.2...sandworm-utils-v1.12.0) (2023-01-27)


### Features

* support stringified license data ([e1b8838](https://github.com/sandworm-hq/sandworm-utils/commit/e1b8838b2f70a7458edb868edb8620a1eb04e929))

## [1.11.2](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.11.1...sandworm-utils-v1.11.2) (2023-01-24)


### Bug Fixes

* remove disconnected nodes from all packages ([192315e](https://github.com/sandworm-hq/sandworm-utils/commit/192315e86e8eb584e2452fa33982c4fdc56b95b6))

## [1.11.1](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.11.0...sandworm-utils-v1.11.1) (2023-01-22)


### Bug Fixes

* package size no longer includes node modules ([3f4e463](https://github.com/sandworm-hq/sandworm-utils/commit/3f4e463561b53edb232e2f0a88b8f1bba3c11726))

## [1.11.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.10.4...sandworm-utils-v1.11.0) (2023-01-13)


### Features

* get local package sizes ([7acd48c](https://github.com/sandworm-hq/sandworm-utils/commit/7acd48cf5ee607d3fa39a11b761a642674080fd3))

## [1.10.4](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.10.3...sandworm-utils-v1.10.4) (2023-01-10)


### Bug Fixes

* crash when post-processing empty graphs ([94d35dd](https://github.com/sandworm-hq/sandworm-utils/commit/94d35ddc254878c9512df7aac63a8e2ed83969e4))

## [1.10.3](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.10.2...sandworm-utils-v1.10.3) (2023-01-10)


### Bug Fixes

* crash when using pnpm with no dependencies ([b9f64f8](https://github.com/sandworm-hq/sandworm-utils/commit/b9f64f8e1eb83aaba533902df3ffef1a25ff99b5))

## [1.10.2](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.10.1...sandworm-utils-v1.10.2) (2022-12-05)


### Bug Fixes

* better deprecated manifest license handling ([df50b52](https://github.com/sandworm-hq/sandworm-utils/commit/df50b52f252d25c090b0664a23791b611803f35a))

## [1.10.1](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.10.0...sandworm-utils-v1.10.1) (2022-12-05)


### Bug Fixes

* support older, non-standard manifest licenses ([7504cb4](https://github.com/sandworm-hq/sandworm-utils/commit/7504cb4f85aad6ab2f8544eaf361aa6215d23f76))

## [1.10.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.9.0...sandworm-utils-v1.10.0) (2022-12-04)


### Features

* more standard graph node properties ([a649f79](https://github.com/sandworm-hq/sandworm-utils/commit/a649f79705ff123101866f5fc83376b21bd01461))

## [1.9.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.8.1...sandworm-utils-v1.9.0) (2022-11-28)


### Features

* graph generation ([f6c9f4e](https://github.com/sandworm-hq/sandworm-utils/commit/f6c9f4e7cf4f7c2b0a219c2cc8f2324a0c92975e))

## [1.8.1](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.8.0...sandworm-utils-v1.8.1) (2022-10-08)


### Bug Fixes

* `loadDependencies` returns unique items ([77bf47a](https://github.com/sandworm-hq/sandworm-utils/commit/77bf47a83b8701437723fc6de8d0dbe29423fba5))

## [1.8.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.7.0...sandworm-utils-v1.8.0) (2022-10-08)


### Features

* `loadDependencies` arg to exclude dev deps ([5624aed](https://github.com/sandworm-hq/sandworm-utils/commit/5624aed994428a7569482b8c993e60b8dffc89de))

## [1.7.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.6.0...sandworm-utils-v1.7.0) (2022-10-08)


### Features

* `loadDependencies` now returns package tree ([d31c542](https://github.com/sandworm-hq/sandworm-utils/commit/d31c54285b45804fe48924f17c31a557cfde2b86))

## [1.6.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.5.0...sandworm-utils-v1.6.0) (2022-09-29)


### Features

* update Sandworm to v1.3.2 ([a77c1a9](https://github.com/sandworm-hq/sandworm-utils/commit/a77c1a9b2ffc7c8958d41fdf62223624dfa2d0c1))

## [1.5.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.4.0...sandworm-utils-v1.5.0) (2022-09-29)


### Features

* forward events to Inspector ([1862309](https://github.com/sandworm-hq/sandworm-utils/commit/1862309f675214a9f2321ec1f2f4f5850c2bab87))


### Bug Fixes

* `loadSandworm` config option name ([de05544](https://github.com/sandworm-hq/sandworm-utils/commit/de05544792bb84865fc0e26c032d778b79d21a3f))

## [1.4.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.3.0...sandworm-utils-v1.4.0) (2022-09-29)


### Features

* update Sandworm to v1.3.1 ([63da401](https://github.com/sandworm-hq/sandworm-utils/commit/63da4015ccc5df02d543f1f35f0af732ca8707f8))

## [1.3.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.2.0...sandworm-utils-v1.3.0) (2022-09-29)


### Features

* add shared functionality ([6722e33](https://github.com/sandworm-hq/sandworm-utils/commit/6722e33f31930862a9b0ff8f67d4c52fb84df73b))

## [1.2.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.1.0...sandworm-utils-v1.2.0) (2022-09-28)


### Features

* make all methods support both promise&async ([4facc94](https://github.com/sandworm-hq/sandworm-utils/commit/4facc94e83e011b07aac6cda3e28c287828e1589))

## [1.1.0](https://github.com/sandworm-hq/sandworm-utils/compare/sandworm-utils-v1.0.0...sandworm-utils-v1.1.0) (2022-09-27)


### Features

* initial release ([84442e0](https://github.com/sandworm-hq/sandworm-utils/commit/84442e0da39e1ec1573b14663f3ec46151affa25))
