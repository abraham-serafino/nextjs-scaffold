import App from "next/app"
import { APP_NAME } from "Common/constants"
import Layout from 'App/Layout.component'
import Router from "next/router"
import storage from "Common/storage"

class _App extends App {
  componentDidMount() {
     const { pathname } = Router
     const { sessionToken } = storage(APP_NAME).get("session") || {}

     if (! sessionToken) {
       Router.push('/login')
     }

     else {
       // retrieve session data from server
     }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    )
  }
}

export default _App
