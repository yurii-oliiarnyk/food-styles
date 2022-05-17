import { gql, useMutation } from "@apollo/client";
import { User } from "../../types";

const LOGIN_WITH_EMAIL = gql`
  mutation LoginWithEmail($email: EmailAddress!, $password: NonEmptyString!) {
    loginWithEmail(email: $email, password: $password) {
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

const useLoginWithEmailMutation = () => {
  const [mutate, { loading, error }] = useMutation(LOGIN_WITH_EMAIL);

  const loginWithEmail = (
    { email, password }: { email: string; password: string },
    onCompleted: (data: {
      accessToken: string;
      refreshToken: string;
      user: User;
    }) => void,
    onError?: () => void,
  ) => {
    mutate({
      variables: { email, password },

      onCompleted: ({
        loginWithEmail: { accessToken, refreshToken, user },
      }) => {
        onCompleted({
          accessToken,
          refreshToken,
          user,
        });
      },
      onError,
    });
  };

  return {
    loginWithEmail,
    error,
    loading,
  };
};

export default useLoginWithEmailMutation;
