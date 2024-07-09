import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import KontrakPage from "./components/pages/KontrakPage";
import JabatanPage from "./components/pages/JabatanPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/jabatan",
    element: <KontrakPage />,
  },
  {
    path: "/kontrak",
    element: <JabatanPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
