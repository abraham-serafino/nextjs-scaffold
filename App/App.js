import App from "next/app"
import Layout from 'App/Layout.component'

class _App extends App {
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
