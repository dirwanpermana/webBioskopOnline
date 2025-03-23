// File untuk manggil router
import { createBrowserRouter } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import customerRoutes from "./customerRoutes";

const router = createBrowserRouter([...adminRoutes, ...customerRoutes]); //panggil route adminRoutes dan customerRoutes

export default router;  