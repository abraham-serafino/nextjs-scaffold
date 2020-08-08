import { Fragment } from "react"
import Header from "components/Header"
import Footer from "components/Footer"

const Layout = ({ title, children }) =>
  <Fragment>
  <head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
      />
  </head>

  <Header />
  {children}
  <Footer />

  </Fragment>

export default Layout
