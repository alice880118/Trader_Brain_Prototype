
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { CustomCursor } from "./app/components/custom-cursor.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <>
      <CustomCursor />
      <App />
    </>
  );
  