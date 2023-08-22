import Layout from "@/components/ui/header/layout";
import Editor from "@/components/ui/editor/Editor";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/protected";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UI />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

const UI = () => {
  return (
    <>
      <Layout>
        <Editor />
        <Toaster />
      </Layout>
    </>
  );
};
