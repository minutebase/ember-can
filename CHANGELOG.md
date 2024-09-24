






## v7.0.0 (2024-09-24)

#### :boom: Breaking Change
* [#186](https://github.com/minutebase/ember-can/pull/186) Switch from an initializer to manual `extendResolver` usage ([@mkszepp](https://github.com/mkszepp))

#### :house: Internal
* [#187](https://github.com/minutebase/ember-can/pull/187) pnpm 9 ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 2
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v6.0.0 (2024-08-06)

#### :boom: Breaking Change
* [#183](https://github.com/minutebase/ember-can/pull/183) Allow `@ember/string` v4 and move `ember-inflector` to peerDependencies ([@mkszepp](https://github.com/mkszepp))

#### :bug: Bug Fix
* [#180](https://github.com/minutebase/ember-can/pull/180) Addon v2 should always use relative paths for own files ([@mkszepp](https://github.com/mkszepp))

#### Committers: 1
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))

## v5.0.4 (2024-07-02)

#### :bug: Bug Fix
* [#179](https://github.com/minutebase/ember-can/pull/179) Make model type unknown ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v5.0.3 (2024-07-02)

#### :house: Internal
* [#178](https://github.com/minutebase/ember-can/pull/178) Tweak TS paths ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v5.0.2 (2024-07-02)

#### :bug: Bug Fix
* [#174](https://github.com/minutebase/ember-can/pull/174) fix: make helpers lowercase in template registry ([@charlesfries](https://github.com/charlesfries))
* [#176](https://github.com/minutebase/ember-can/pull/176) Fix looking up abilities ([@mkszepp](https://github.com/mkszepp))

#### Committers: 2
- Charles Fries ([@charlesfries](https://github.com/charlesfries))
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))

## v5.0.1 (2024-07-01)

#### :bug: Bug Fix
* [#173](https://github.com/minutebase/ember-can/pull/173) Make helper types more explicit ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v5.0.0 (2024-06-06)

#### :boom: Breaking Change
* [#170](https://github.com/minutebase/ember-can/pull/170) Fix peerDependency from `ember-source` ([@mkszepp](https://github.com/mkszepp))
* [#168](https://github.com/minutebase/ember-can/pull/168) Remove deprecated code ([@mkszepp](https://github.com/mkszepp))
* [#169](https://github.com/minutebase/ember-can/pull/169) Drop ember versions < 3.28 ([@mkszepp](https://github.com/mkszepp))
* [#167](https://github.com/minutebase/ember-can/pull/167) Drop old test styles in blueprint (`ember-cli-mocha` & `ember-cli-qunit`) ([@mkszepp](https://github.com/mkszepp))

#### :rocket: Enhancement
* [#166](https://github.com/minutebase/ember-can/pull/166) Convert to V2 addon ([@mkszepp](https://github.com/mkszepp))
* [#165](https://github.com/minutebase/ember-can/pull/165) feat: install TypeScript & update dependencies ([@mkszepp](https://github.com/mkszepp))

#### :bug: Bug Fix
* [#171](https://github.com/minutebase/ember-can/pull/171) Don't export private `normalize.ts` function & refactor tests ([@mkszepp](https://github.com/mkszepp))

#### Committers: 3
- Charles Fries ([@charlesfries](https://github.com/charlesfries))
- Markus Sanin ([@mkszepp](https://github.com/mkszepp))
- Miguel Andrade ([@miguelcobain](https://github.com/miguelcobain))


## v4.2.0 (2022-03-29)

#### :rocket: Enhancement
* [#154](https://github.com/minutebase/ember-can/pull/154) Support methods in abilities ([@Exelord](https://github.com/Exelord))
* [#153](https://github.com/minutebase/ember-can/pull/153) Restructure and improve tests ([@Exelord](https://github.com/Exelord))

#### Committers: 1
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))


## v4.1.0 (2021-11-29)

#### :rocket: Enhancement
* [#152](https://github.com/minutebase/ember-can/pull/152) Deprecate CanService in favor of AbilitiesService ([@Exelord](https://github.com/Exelord))

#### Committers: 1
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))


## v3.2.0 (2021-11-26)

#### :boom: Breaking Change
* [#142](https://github.com/minutebase/ember-can/pull/142) Upgrade dependencies and drop support for Ember 3.8, 3.12, 3.16 and Node 10 ([@Exelord](https://github.com/Exelord))

#### Committers: 2
- Francesco Novy ([@mydea](https://github.com/mydea))
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))


## v3.1.0 (2021-05-27)

#### :rocket: Enhancement
* [#137](https://github.com/minutebase/ember-can/pull/137) feat: update docs about testing ember-can ([@Gorzas](https://github.com/Gorzas))
* [#99](https://github.com/minutebase/ember-can/pull/99) Migrate blueprint to ES6 class ([@Gorzas](https://github.com/Gorzas))

#### :bug: Bug Fix
* [#140](https://github.com/minutebase/ember-can/pull/140) fix: update ember-cli-babel to 7.19 ([@Gorzas](https://github.com/Gorzas))
* [#141](https://github.com/minutebase/ember-can/pull/141) use `get` from `@ember/object` to look up `propertyName` on `ability`… ([@MiniHeyd](https://github.com/MiniHeyd))
* [#129](https://github.com/minutebase/ember-can/pull/129) Do not use global ember `get` ([@esbanarango](https://github.com/esbanarango))

#### Committers: 3
- Esteban ([@esbanarango](https://github.com/esbanarango))
- José David Cano Pérez ([@Gorzas](https://github.com/Gorzas))
- Steve Heydweiller ([@MiniHeyd](https://github.com/MiniHeyd))


## v3.0.0 (2020-01-16)

#### :boom: Breaking Change
* [#114](https://github.com/minutebase/ember-can/pull/114) Drop support for node 8 ([@Exelord](https://github.com/Exelord))

#### :rocket: Enhancement
* [#113](https://github.com/minutebase/ember-can/pull/113) Clean ability helper state ([@Exelord](https://github.com/Exelord))
* [#112](https://github.com/minutebase/ember-can/pull/112) Update dependencies ([@Exelord](https://github.com/Exelord))
* [#102](https://github.com/minutebase/ember-can/pull/102) Add "as" as stop word ([@Exelord](https://github.com/Exelord))

#### :bug: Bug Fix
* [#110](https://github.com/minutebase/ember-can/pull/110) fix: don't wrap destroying abilities in a runloop ([@makepanic](https://github.com/makepanic))
* [#111](https://github.com/minutebase/ember-can/pull/111) Fix dependency version range ([@ondrejsevcik](https://github.com/ondrejsevcik))

#### Committers: 3
- Christian ([@makepanic](https://github.com/makepanic))
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))
- Ondrej Sevcik ([@ondrejsevcik](https://github.com/ondrejsevcik))


## v2.1.0 (2019-12-16)

#### :rocket: Enhancement
* [#107](https://github.com/minutebase/ember-can/pull/107) Update dependencies ([@Exelord](https://github.com/Exelord))

#### Committers: 1
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))


## v2.0.0 (2019-08-12)

#### :boom: Breaking Change
* [#94](https://github.com/minutebase/ember-can/pull/94) Ember can v2 ([@Exelord](https://github.com/Exelord))

#### :rocket: Enhancement
* [#94](https://github.com/minutebase/ember-can/pull/94) Ember can v2 ([@Exelord](https://github.com/Exelord))
* [#98](https://github.com/minutebase/ember-can/pull/98) Updated qunit test blueprint to new style ([@zachgarwood](https://github.com/zachgarwood))

#### Committers: 4
- Logan Rosen ([@loganrosen](https://github.com/loganrosen))
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))
- Milo Lee ([@oo6](https://github.com/oo6))
- Zach Garwood ([@zachgarwood](https://github.com/zachgarwood))


## v1.1.0 (2018-05-01)

#### :rocket: Enhancement
* [#79](https://github.com/minutebase/ember-can/pull/79) Deprecate old API ([@Exelord](https://github.com/Exelord))
* [#78](https://github.com/minutebase/ember-can/pull/78) Improve tests ([@Exelord](https://github.com/Exelord))
* [#77](https://github.com/minutebase/ember-can/pull/77) Feature setup release flow ([@Exelord](https://github.com/Exelord))
* [#76](https://github.com/minutebase/ember-can/pull/76) Fix editorconfig ([@Exelord](https://github.com/Exelord))

#### Committers: 2
- Esteban ([@esbanarango](https://github.com/esbanarango))
- Maciej Kwaśniak ([@Exelord](https://github.com/Exelord))

