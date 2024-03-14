import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import Login from './components/LoginComponent.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    

    <App />
   
    
  </React.StrictMode>,
)
//token:
// eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtd3dleWlzbDV2eXFzZWI1cy5qcC5hdXRoMC5jb20vIn0..gHySPxgUpQmkLZ1W.pcJLTZ30IwwPn2OiVhfwCICRcAG2Tes2-Oo8tfth1lsMIguVlCVlnvM_9aiY0cGERHpZPg81bMRdwe3y1DDXCxhQNiKfFhU6DbWWn_3xNezqet_iX_8o3SeHSHFRyKmHfgrdhaFvgDmJ00tUFXSgK0uaTi5ItF4HHVOkmy2tvi3xcwobF4e2DYAdcWdhNhh19XoIjZQACMhcb-VlhgsmumsRn39I35hnhGa0ChG1O-ymS0I2lPJsj2FyZ-4V6TUmpBDO7u61jDqgW8jmY5kMmr1wmmUFr4B5O3KzFYbFWMXvOLnN8QFgJBeX2HUcRJdh7AB3qgD6B8a_ntDV2aGQSAmc.nNC1qxnFxxkhEhcrL4ZjjQ