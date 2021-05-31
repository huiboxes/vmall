import Vue from 'vue'
import { Button, Message,Breadcrumb,BreadcrumbItem } from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// Vue.use(Message)

Vue.prototype.$message = Message
