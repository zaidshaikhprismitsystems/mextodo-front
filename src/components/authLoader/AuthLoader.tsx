import { useEffect } from "react";
import { fetchUserDetails } from "../../services/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks/hooks";
import { LoaderWithLogo } from "../loader";

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
    
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails() as any);
  }, [dispatch]);

  const { isLoading } = useAppSelector((state: any) => state.user);

  if (isLoading) return <LoaderWithLogo />;

  return children;
};

export default AuthLoader;