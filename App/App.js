import { createSimpleStore } from "Common/SimpleStore"
import { createWrapper } from "next-redux-wrapper"
import Layout from 'App/Layout.component'
import { userState } from "Login/User.store"

const store = createWrapper(
  (context) => createSimpleStore(userState),
  { debug: true }
  )

const App = ({ Component, pageProps }) =>
  <Layout>
    <Component {...pageProps}></Component>
  </Layout>

export default store.withRedux(App)
