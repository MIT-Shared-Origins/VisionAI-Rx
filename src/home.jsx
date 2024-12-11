import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import HeroSection from './components/HeroSection'
import EventForm from './components/Event'
function Home() {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/* Hero */}
      {/* <Hero/> */}
      {/* <HeroSection/> */}
      <EventForm/>
    </div>
  )
}

export default Home
