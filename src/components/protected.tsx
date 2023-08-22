import { Navigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

interface Props {
  children: React.ReactNode;
}
export const ProtectedRoute = (props: Props) => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};
