import React from 'react'

function Home() {
    return (
        <div>
            Home

            <button onClick={()=>localStorage.removeItem()}>Logout</button>
        </div>
    )
}

export default Home
