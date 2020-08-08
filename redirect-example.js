import { useEffect } from "react"
import Router from "next/router"

const Home = () => {
  useEffect(() => {
     const { pathname } = Router

     if(pathname === "/" ){


       /////// HERE IS THE EXAMPLE! ///////
         Router.push('/login')
       /////// HERE IS THE EXAMPLE! //////


     }
   })
}
