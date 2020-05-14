import React, { useState} from 'react'
import NavBar from '../components/NavBar/NavBar'
import Catalog from '../components/Catalog/Catalog'
import ToUpButton from '../components/ToUpButton/ToUpButton'


const HomePage = () => {
  const containerRef = React.createRef()
  const [showScrollTo, setShowScrollTo] = useState(false)

  const handleScroll = () => {
    if (containerRef.current.scrollTop > 400) {
      setShowScrollTo(true)
    } else {
      setShowScrollTo(false)
    }
  }
  return  (
    <div ref={containerRef} className="scroll-container" onScroll={handleScroll}>
      <NavBar />
      <Catalog />
      <ToUpButton show={showScrollTo} containerRef={containerRef} />
    </div>
  )
}


export default HomePage