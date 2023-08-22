import Layout from "@/components/ui/header/layout";
import Editor from "./components/ui/editor/Editor";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Layout>
      <Editor />
      <Toaster />
    </Layout>
  );
}

export default App;
