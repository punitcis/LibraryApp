import React from 'react'

function Footer() {
  return (
    <div className='footer'>
        <footer className="text-center text-lg-start">

  <div className="container p-4">

    <div className="row">
 
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Footer text</h5>

        <p>
         Software Developer
        </p>
      </div>

      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Footer text</h5>

        <p>
          Full Stack
        </p>
      </div>
 
    </div>

  </div>


  <div className="text-center p-3" style={{"background-color": "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>

</footer>
    </div>
  )
}

export default Footer