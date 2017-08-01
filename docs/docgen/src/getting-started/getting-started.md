---
title: Getting started
mainTitle: Essentials
layout: main.pug
category: Getting started
withHeadings: true
navWeight: 1
editable: true
githubSource: docs/docgen/src/getting-started/getting-started.md
---

## Welcome to Vue InstantSearch

**WARNING:** This project is currently in BETA.

Vue InstantSearch is the ultimate toolbox for creating instant-search
experiences using [Vue.js](https://vuejs.org/) and [Algolia](https://www.algolia.com/).

## Setup a new Vue project

We will use the official [vue-cli](https://vuejs.org/v2/guide/installation.html#CLI) to bootstrap a new Vue project, along with the [webpack-simple template](https://github.com/vuejs/vue-cli#official-templates).

```shell
$ npm install --global vue-cli
$ vue init webpack-simple vue-instantsearch-getting-started
```

**info:** Default settings are enough, hit `Enter ⏎` at every question

Then install the dependencies of your new project:

```shell
$ cd vue-instantsearch-getting-started
$ npm install
```

## Install `vue-instantsearch`

Add Vue InstantSearch as a dependency, it's published on [npm](https://www.npmjs.com):

```shell
$ npm install --save vue-instantsearch
```

## Run the development environment

When `vue-cli` bootstrapped the project, it added some [npm scripts](https://docs.npmjs.com/misc/scripts) to your project, like a `dev` one. Let's use it:

```shell
$ npm run dev
```

This should open a new tab in your browser with this inside:

![Screenshot showing the new tab preview when npm run dev starts](images/getting-started-npm-run-dev.png).

Leave the `dev` script running, we will update the code and it will reload your browser
automatically.

## Use the InstantSearch plugin

Now we need to tell Vue to use the Vue InstantSearch plugin so that all search
components are available in our templates.

Open the `src/main.js` entry point and replace the existing content with the following:

```javascript
import Vue from 'vue';
import App from './App.vue'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

From now on, you can use all [Vue InstantSearch components](getting-started/using-components.html) in your templates throughout the whole application.

## Create your first search experience

Let's bootstrap a small search interface.

Open the `src/App.vue` component. Then replace the whole beginning of the file, between the `<template></template>` tags, with the following:

```html
<template>
  <ais-index
    app-id="latency"
    api-key="3d9875e51fbd20c7754e65422f7ce5e1"
    index-name="bestbuy"
  >
    <ais-search-box></ais-search-box>
    <ais-results>
      <template scope="{ result }">
        <h2>
          <ais-highlight :result="result" attribute-name="name"></ais-highlight>
        </h2>
      </template>
    </ais-results>
  </ais-index>
</template>
```

Save, see the result in browser and play with it:

![Animated screenshot showing a first search experience](images/first-search-experience.gif).

## How it works

In this section you will learn a bit more about what you just implemented.

### The Index component

All search components needs to be wrapped in an Index component.

```html
<ais-index
  app-id="latency"
  api-key="3d9875e51fbd20c7754e65422f7ce5e1"
  index-name="bestbuy"
>
  <!-- Search components go here -->
</ais-index>
```

You should configure the Index component with the application ID and API search only key.

The job of the Index component is to hold the state of the search, and to provide it to child components.

**Info:** Alternatively you can [manually inject a search store](getting-started/search-store.html), for example to support server-side rendering.

### Algolia demo credentials

For the purpose of the demo, we provided you with some default Algolia credentials:

 - `app-id`: `latency`
 - `search-key`: `3d9875e51fbd20c7754e65422f7ce5e1`
 - `index-name`: `bestbuy`

When you will be ready to go further, you can [create your own Algolia account](https://www.algolia.com/users/sign_up) and [find your credentials](https://www.algolia.com/api-keys) in the Algolia dashboard.

### The Search Box component

The [Search Box component](components/search-box.html) renders a text input.

The text input value is bound to the query of the current search.

Every time the query changes, the search store will contact Algolia to get the new results for the new query.

**Info:** The Search Box component is wrapped into a `<form>` element and provides a reset and submit button by default. These [good search practices are explained here](https://blog.algolia.com/mobile-search-ux-tips/).

### The Results component

The [Results component](components/results.html) will loop over all results returned
by the Algolia response, and display them.

The component has a [default slot](https://vuejs.org/v2/guide/components.html#Single-Slot) so that you can easily define your custom template for the rendering of every single result.

**Info:** By default, if no slot is provided, the component will display the `objectID` of every result.

The slot provided by the Results components is a [scoped slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

A scoped slot means that the template can access data passed to the slot.

This is illustrated by this snippet:

```html
<template scope="parameters">
  <h1>{{ parameters.result.name }}</h1>
</template>
```

or with an ES6 syntax:

```html
<template scope="{ result }">
  <h1>{{ result.name }}</h1>
</template>
```

Now that `result` is available, we can customize the html inside the template.

In the example we provided, we display the highlighted version of the name of the result.
