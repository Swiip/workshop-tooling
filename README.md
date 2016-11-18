# Workshop Tooling Web

La ligne directrice de ce workshop sera de créer un projet Web de 0 avec tout l'outillage moderne sans passer par un générateur ou un projet exemple.

Je ne conseille pas cette approche pour "un vrai projet". Cela coute trop chère pour atteindre le niveau de finesse proposés par les générateurs (ou projet seed, ou starter). Toutefois pour apprendre et savoir prendre en main les outils, cette démarche est intéressante.

L'approche globale sera la mise en place des outils les plus importants, dans Fountain, j'utilise et donc implicitement, je recommande l'utilisation de Gulp comme orchestrateur des tâches plutôt que les npm scripts. Pour simplifier le process, je ne le propose pas ici. Idéalement, cela représenterait une étape supplémentaire vers la fin.

## 1/ Installation des outils de base

> Documentation https://nodejs.org/

- Installation de Node & NPM

https://nodejs.org/en/download/

Sous Linux, privilégier l'installation par le package manager https://nodejs.org/en/download/package-manager/

Sous Windows, privilégier le `.msi`

Sous Mac, privilégier `homebrew`

Si vous avez déjà une version de Node installée, s'assurer que le numéro de version est `>= 4.0` (`node --version`), les versions `0.x` commencent à dater. S'assurer également de la version d'npm (`npm --version`), s'assurer d'avoir une version `3.x`. Si ce n'est pas le cas, mettre à jour avec la commande `npm install --global npm`.

- Installation de Git

Plusieurs outils et/ou package Node nécessitent Git.

Sous Windows, l'installation de Git apportera Git Bash, une console Windows plus agréable et fonctionnelle que la console par défaut, je vous la conseil donc.

## 2/ Initialiser le projet

> Documentation https://www.npmjs.com/

Le descripteur principal du projet sera le `package.json` d'npm.

La démarche la plus simple dans ce sens est l'utilisation de la commande `npm init`. Répondre simplement aux questions. On aura l'habitude de choisir un numéro de version `0.x` tant que le projet n'est pas terminé.

## 3/ Mettre en place un serveur de développement Web

> Documentation https://browsersync.io/

- Installer Browsersync. Nous allons l'installer à la fois au niveau du projet et en global. `npm install --save-dev browser-sync`, `npm install --global browser-sync`.

- Créer un fichier `src/index.html` de base.

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

- Initialiser un fichier de config Browsersync avec la commande `browser-sync init`. "Malheureusement" le script d'initialisation génère un fichier avec toutes les options et leur valeur par défaut. C'est assez volumineux mais nous n'auront à intervenir que sur un très petit nombre de paramètres.

- Editer le ficher `bs-config.js`. Pour commencer, la seule chose à faire est de positionner la propriété `server: "src"`. Dès maintenant, la commande `browsersync` devrait fonctionner.

- Enregistrer la commande de lancement de Browersync dans les scripts npm : `"browsersync": "browser-sync start --config 'bs-config.js'"`

- Lancer la commande `npm run browsersync`, le serveur devrait se lancer et un onglet du navigateur s'ouvrir sur la page.

## 4/ Mettre en place Webpack

> Documentation https://webpack.js.io/

- Installer Webpack. Nous allons encore une fois l'installer à la fois au niveau du projet et en global. On précise ici un numéro de version car la v2 beta apporte des fonctionnalités intéressante et est presque finalisée mais n'est pas encore la version par défaut. `npm install --save-dev webpack@2.1.0-beta.26`, `npm install --global webpack@2.1.0-beta.26`.

- Initialiser un fichier de configuration pour Webpack. Contrairement à Browsersync, il n'y a pas de commande pour en initialiser un. Le fichier s'appelle le plus souvent `webpack.config.js` et prend la forme suivante :

```javascript
module.exports = {
  context: __dirname + "/app",
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  }
};
```

- Context est le répertoire de référence pour le reste de la configuration. Entry le module d'entré (il pourra y en avoir plusieurs). Output le fichier de sortie (il peut y en avoir plusieurs également).

- Créer un fichier `index.js` avec un simple `console.log('Hello World');` pour commencer.

- Configurer le point d'entré de Webpack sur le nouveau `index.js`. Attention, il faut le plus souvent repasser par un chemin absolue (`__dirname`). Configurer la sortie dans un répertoire `.tmp` un fichier nommé `bundle.js`. Avec la commande `webpack --config 'webpack.config.js'`, le bundle devrait déja être créé correctement.

- Dans le fichier `index.html`, ajouter au bas du `body` une balise `script` qui pointe sur `bundle.js`.

> Le plus souvent, on automatiserait encore l'insertion de la balise script dans l'index.html par Webpack avec le plugin avec [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). Mais on saute cette étape ici pour aller plus vite.

- Configurer Browsersync pour servir à la fois les répertoire `src` et `.tmp` en paramétrant `server: ["src", ".tmp"]`

- Enregistrer la commande de lancement de Webpack dans les scripts npm : `"webpack": "webpack --config 'webpack.config.js'"`

- Lancer la commande `npm run webpack`, Webpack devrait créer le bundle. Puis lancer le serveur avec `npm run serve` pour lancer le serveur, le bundle devrait être chargé et Hello World s'afficher dans la console du navigateur

- Je vous invite à ouvrir le bundle pour voir à quoi ça ressemble. C'est un des rares cas dans lequel il est assez petit pour être lisible.

- Pour faire fonctionner la mise à jour automatique, ajouter un script npm avec Webpack en mode watch : `"watch": "webpack --watch --config 'webpack.config.js'"`. Configurer Browsersync pour qu'il surveille la mise à jour des fichiers `"files": ["src", ".tmp"]`. Enfin, ajouter un script mettant en oeuvre à la fois Browsersync et Webpack : `"serve": "npm run watch & npm run browsersync"`

- On va maintenant mettre en évidence que le bundling fonctionne. Créer un fichier `src/hello.js` qui contient.

```javascript
export const hello = 'Hello World';
```

- Modifier le fichier `src/index.js` pour utiliser ce module

```javascript
import {hello} from './hello'

console.log(hello);
```

- Si tout se passe bien, Webpack a du refaire le bundling à chaud, mettre à jour le bundle, Browsersync détecter la modification du fichier et rechargé automatiquement le navigateur.

## 5/ Mise en place TypeScript

> Documentation https://www.typescriptlang.org/

- Installer TypeScript. `npm install --save-dev typescript`, `npm install --global typescript`.

- Initialiser un fichier de configuration `tsconfig.json` avec la commande `tsc init`.

- De nombreux éditeurs essayent de compiler eux même le TypeScript ce qui est rarement ce que l'on souhaite, il est alors possible de rajouter l'option `"compileOnSave": false` au même niveau que `compilerOptions` pour empêcher ça.

- Changer les fichiers `index.js` et `hello.js` en fichiers TypeScript (`.ts`). On peut par exemple typer la variable hello à string pour utiliser une syntaxe valide uniquement avec TypeScript.

- Il est alors possible de tester le compilateur même si la cible est de passer par Webpack. En utilisant la commande `tsc src/index`. Attention à supprimer les fichier js alors créé, la cible n'est pas d'avoir les fichiers compilés à côté des fichiers sources.

- Nous allons maintenant brancher TypeScript sous forme de "loader" Webpack. Pour cela, il faut commencer par installer le package `npm install --save-dev ts-loader`.

- Pour la configuration Webpack, il faut commencer par apprendre à Webpack que les fichiers `.ts` peuvent être considérés comme des modules : `resolve: ['.js', '.ts']`. Il faut ensuite configurer le loader TypeScript. Comme dans la plupart des cas, on précise de l'utiliser pour les fichiers avec une extension `.ts` mais on exclue le répertoire `node_modules` dans lequel on ne veut jamais que le compilateur s'active

```javascript
module: {
  loaders: [
    {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'},
  ]
}
```

- Si vous avez laissé les noms par défaut pour les fichiers de configuration cela devrait suffire. Relancer la commande `npm run serve`. Le code TypeScript, est compilé, puis "bundlé" et mis à jour automatiquement dans le navigateur

## 6/ Bootstrap Angular 2

> Documentation https://angular.io/

- Installation des dépendances d'Angular. Même en version minimale, il y a pas mal de package à installer. `npm install --save @angular/common @angular/compiler @angular/core @angular/platform-browser @angular/platform-browser-dynamic core-js rxjs zone.js`

- Gestion des polyfill pour Angular 2. Angular 2 a été développé sur un ensemble de normes qui ne sont pas toutes implémentés dans les navigateurs. On ajoute ce qu'on appel des polyfill pour détecter et enrichir au besoin l'API du navigateur avant de lancer Angular. Concrètement, cela consiste à charger des librairies avant de commencer le code. En haut du fichier index.ts, ajouter les imports suivant.

```typescript
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import '@angular/common';
import 'rxjs';
```

- Création du composant de base. Toujours dans `index.ts`, créer un composant Angular 2 qui affiche la valeur d'`hello`.

```typescript
import {Component} from '@angular/core';
import {hello} from './hello'

@Component({
  selector: 'app',
  template: `<h1>{{hello}}</h1>`
})
export class MainComponent {
  public hello: string = hello;
}
```

- Création du module de base

```typescript
// Module
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  declarations: [MainComponent],
  bootstrap: [MainComponent]
})
export class AppModule {}
```

- Bootstrap de l'application Angular 2. Nous allons ajouter maintenant de quoi démarrer le composant racine d'une application Angular 2

```typescript
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
```

- Ajouter les options TypeScript de compilation activant les décorateurs, nécessaire pour Angular 2 : `"emitDecoratorMetadata": true, "experimentalDecorators": true`

- Enfin, il faut ajouter du typage pour TypeScript `npm install --save-dev @types/core-js @types/chai`. (les types de chai, une librairie de tests, ne devraient pas être nécessaires mais malheureusement si, avec la dernière version de rxjs).

- Dans `src/index.html`, remplacer le titre statique par l'appel du composant `<app>Loading...</app>`

- Lancer `npm run serve` et le fameux `Hello World` devrait s'afficher !

## 7/ TSLint

> Documentation https://palantir.github.io/tslint/

Bonus, activer le linter dans l'application. Il existe un loader Webpack qui peut être utile dans un processus d'intégration continue. Mais le plus utile, c'est dans un plugin de l'IDE. Ci dessous, les liens vers les plugins Atom et Visual Studio Code.

- Installer le package. `npm install --save-dev tslint`, `npm install --global tslint`.

- Initialiser le fichier de configuration `tslint --init`.

- Installer le plugin pour votre éditeur de code. Atom : `https://atom.io/packages/linter-tslint`, Visual Studio Code: `https://marketplace.visualstudio.com/items?itemName=eg2.tslint`.

## 8/ Karma

Pour avoir une infrastructure de test, il faut installer Karma qui va piloter un navigateur pour jouer nos tests. Créer un scripts d'initialisation des tests Angular 2 et enfin créer un premier test.

- Installer les dépendances `npm install --save-dev karma karma-chrome-launcher karma-jasmine karma-webpack jasmine-core`, `npm install --global karma-cli`.

- Initialiser le fichier de configuration `karma init`.

- Modifier `karma.conf.js` pour ajouter les éléments suivants.

```javascript
plugins: [
  require('karma-jasmine'),
  require('karma-chrome-launcher'),
  require('karma-webpack')
],

files: [
  'src/index.spec.js'
],

preprocessors: {
  'src/index.spec.js': ['webpack']
},

webpack: {
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'},
    ]
  }
}
```

- Ajouter un point d'entré pour les tests : `src/index.spec.js`. Il prend en charge les polyfills, initialise l'environnement Angular 2 pour les tests et charge tous les modules de l'application (dans `/app`).

```javascript
Error.stackTraceLimit = Infinity;

require('core-js/client/shim');

require('@angular/common');
require('rxjs');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);
const testing = require('@angular/core/testing');
const testingBrowser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
```

- Extraire le composant `MainComponent` dans un fichier `src/app/main.ts`.

- Créer le test de `MainComponent` dans un fichier `src/app/main.spec.ts`.

```typescript
import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {MainComponent} from './main';

describe('Main Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent]
    });
    TestBed.compileComponents();
  }));

  it('should render the header, title, techs and footer', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const main = fixture.nativeElement;
    expect(main.querySelector('h1').textContent).toBe('Hello World');
  });
});
```

- Tester avec la commande `karma start`.

- Configurer dans les scripts npm `"test": "karma start --single-run"`.
