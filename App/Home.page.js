import bindModel from "Common/bindModel"
import { createContainer } from "Common/SimpleStore"
import { Fragment, useEffect, useState } from "react"
import Router from "next/router"

import { UserActions } from "Login/User.store"

const HomePage = ({ userState }) => {
  useEffect(() => {
     const { pathname } = Router

     if (pathname === "/" ) {
       Router.push('/login')
     }
   })

   return <div />
}

export default createContainer(HomePage, { ...UserActions })
