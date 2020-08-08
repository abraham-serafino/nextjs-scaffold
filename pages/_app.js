import React from 'react'
import App from 'next/app'
import Layout from 'components/Layout'

class _App extends App {
  render() {
    const { Component, pageProps } = this.props
    console.log("hello")

    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
      )
  }
}

export default _App
