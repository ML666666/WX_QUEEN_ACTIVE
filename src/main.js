// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import $ from 'zepto'
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

import { Icon } from 'vant';
Vue.use(Icon);
import { Loading } from 'vant';
Vue.use(Loading);
import { Popup } from 'vant';
Vue.use(Popup);
import { Picker } from 'vant';
Vue.use(Picker);
import { Button } from 'vant';
Vue.use(Button);
import gob from './gob';
Vue.prototype.$gob = gob;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
