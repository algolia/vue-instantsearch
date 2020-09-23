import Vue from 'vue';
import { version } from './package.json';

Vue.config.productionTip = false;

process.env.VUE_IS_VERSION = version;
