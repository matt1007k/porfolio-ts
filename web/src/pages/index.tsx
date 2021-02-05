import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrlClient } from "../utils/createUrlClient";
import { useProjectsQuery } from "../generated/graphql";

function Home() {
  const [{ data }] = useProjectsQuery();
  return (
    <>
      <NavBar />
      <h3>Projects</h3>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.projects.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
}

export default withUrqlClient(createUrlClient, { ssr: true })(Home);
