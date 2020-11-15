import React, {useEffect, useState, useRef}  from 'react'
import ReactModal from 'react-modal'

function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className="App2">
            <button onClick={() => setIsOpen(!isOpen)}>Directions</button>
            <ReactModal
                isOpen={isOpen}
            >
                
                <p>Locations are graded based on crime, air quality, and disasters. </p>
                <p> Based on inner calculations, an overal grade is given and a breakdown is listed underneath. </p>
                <p> You are able to search a location or zoom and pin locations on the map </p>
                <p> Your 4 most recent searches are saved for direct comparison</p>
                <button onClick={() => setIsOpen(!isOpen)}>Close</button>
            </ReactModal>
     

        </div>
    );
}

export default Modal