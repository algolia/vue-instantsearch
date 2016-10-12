import {Store, instance} from '../store'
import formatNumber from '../filters/format-number'

export default {
  props: {
    store: {
      type: Store,
      default: function () {
        return instance
      }
    }
  },
  filters: {
    formatNumber
  }
}

