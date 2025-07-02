import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Pipeline from '@/components/pages/Pipeline'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-body">
        <Layout>
          <Routes>
            <Route path="/" element={<Pipeline />} />
            <Route path="/pipeline" element={<Pipeline />} />
          </Routes>
        </Layout>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="toast-custom"
        />
      </div>
    </Router>
  )
}

export default App