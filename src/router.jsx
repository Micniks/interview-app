
import { createBrowserRouter } from 'react-router-dom'
import FacilityDashboard from './routes/FacilityDashboard.jsx'
import FacilityCreateEdit from './routes/FacilityCreateEdit.jsx'
import NotFound from './routes/NotFound.jsx'

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
    path: "/facility/:facilityId", 
    element: <FacilityCreateEdit />
  },
  {
    path: ":path", 
    element: <NotFound />
  }
])