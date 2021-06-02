import { isVue3, Vue2, version } from 'vue-demi';

export function getVueVersion() {
  if (isVue3) {
    return version;
  } else {
    return Vue2.version;
  }
}
