import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";

const Profile = () => {
  const result = useQuery(ME);
  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log("profile:", result.data)
  return (
    <div>
      <h2>{`Hello, ${result.data.me.username}`}</h2>
      <h4>{`Favourite Genre: ${result.data.me.favoriteGenre}`}</h4>
    </div>
  );
};

export default Profile;
