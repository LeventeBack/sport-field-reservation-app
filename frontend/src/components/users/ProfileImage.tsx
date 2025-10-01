import Gravatar from "react-gravatar";

type Props = {
  email: string;
  size?: number;
};

const ProfileImage = ({ email, size = 40 }: Props) => {
  return (
    <Gravatar
      email={email}
      size={size}
      className="mx-2 rounded-circle"
      default="mp"
    />
  );
};

export default ProfileImage;
