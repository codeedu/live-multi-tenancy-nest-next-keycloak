import { useKeycloak } from "@react-keycloak/ssr";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { initialized, keycloak } = useKeycloak();
  
  const router = useRouter();
  console.log(router);
  if (
    typeof window !== "undefined" &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace("/login");
    return null;
  }

  return keycloak?.authenticated ? <div>Hello World</div> : null;
};

export default Home;
