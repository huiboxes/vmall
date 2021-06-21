import Vue from 'vue'
import { Button, Message,Breadcrumb,BreadcrumbItem,Link } from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Link)
// Vue.use(Message)

Vue.prototype.$message = Message
