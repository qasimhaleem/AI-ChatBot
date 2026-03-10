import React from 'react'
import Form from './Form'
import Footer from './Footer'
const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <main className="flex-1 overflow-hidden flex flex-col">
                <Form />
            </main>
            <Footer />
        </div>
    )
}
export default App