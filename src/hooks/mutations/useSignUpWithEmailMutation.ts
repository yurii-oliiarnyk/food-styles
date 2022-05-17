import { gql, useMutation } from "@apollo/client";
import { User } from "../../types";

const SIGN_UP_WITH_EMAIL = gql`
  mutation SignUpWithEmail(
    $name: NonEmptyString!
    $email: EmailAddress!
    $password: Password!
  ) {
    signUpWithEmail(name: $name, email: $email, password: $password) {
      user {
        id
        email
        name
      }
      accessToken
      refreshToken
    }
  }
`;

const useSignUpWithEmailMutation = () => {
  const [mutate, { loading, error }] = useMutation(SIGN_UP_WITH_EMAIL);

  const signUpWithEmail = (
    {
      email,
      name,
      password,
    }: { email: string; name: string; password: string },
    onCompleted: (data: {
      accessToken: string;
      refreshToken: string;
      user: User;
    }) => void,
  ) => {
    mutate({
      variables: { email, name, password },
      onCompleted: ({
        signUpWithEmail: { accessToken, refreshToken, user },
      }) => {
        onCompleted({ user, accessToken, refreshToken });
      },
    });
  };

  return {
    loading,
    error,
    signUpWithEmail,
  };
};

export default useSignUpWithEmailMutation;
