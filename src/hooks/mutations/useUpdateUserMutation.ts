import { gql, useMutation } from "@apollo/client";
import { User } from "../../types";

const UPDATE_USER = gql`
  mutation UpdateUser($name: NonEmptyString!, $email: EmailAddress!) {
    updateUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const useUpdateUserMutation = () => {
  const [mutate, { loading, error }] = useMutation(UPDATE_USER);

  const updateUser = (
    { name, email }: { name: string; email: string },
    onCompleted: (user: User) => void,
  ) => {
    mutate({
      variables: { name, email },
      onCompleted: ({ updateUser: updatedUser }) => {
        onCompleted(updatedUser);
      },
    });
  };

  return {
    updateUser,
    loading,
    error,
  };
};

export default useUpdateUserMutation;
