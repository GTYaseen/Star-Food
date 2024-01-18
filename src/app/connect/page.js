import React from 'react'
import Navpar from '../components/header/Navpar';
import AppContainer from '../components/container/container';

function ConnectUs() {
  return (
    <div style={{ textAlign: "center" }}>
    <Navpar/>
    <AppContainer />
    <p className='text-3xl'>تواصل معنا</p>
  </div>
  )
}

export default ConnectUs;