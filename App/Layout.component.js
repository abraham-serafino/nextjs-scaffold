import { Col, Row } from "reactstrap"
import Footer from "App/Footer.component"
import { Fragment } from "react"
import Header from "App/Header.component"

const Layout = ({ title, children }) =>

  <Row className="d-flex justify-content-center">
    <Col xs={11} md={5}>
      <Header />
      {children}
      <Footer />
    </Col>
  </Row>

export default Layout
