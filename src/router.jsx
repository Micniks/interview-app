
import { createBrowserRouter } from 'react-router-dom'
import FacilityDashboard from './pages/facility-dashboard/FacilityDashboard.jsx'
import FacilityCreateEdit from './pages/facility-create-edit/FacilityCreateEdit.jsx'
import NotFound from './pages/not-found/NotFound.jsx'

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <FacilityDashboard />
  },
  {
    path: "/facilities", 
    element: <FacilityDashboard />
  },
  {
    path: "/facility", 
    element: <FacilityCreateEdit />
  },
  {
    path: "/*", 
    element: <NotFound />
  }
])