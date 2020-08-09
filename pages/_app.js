import App from 'next/app'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';

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
