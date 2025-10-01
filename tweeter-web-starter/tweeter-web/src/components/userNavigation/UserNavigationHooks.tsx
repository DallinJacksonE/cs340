import { useNavigate } from "react-router-dom";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";

interface UserNavigationActions {
  navigateToUser: (event: React.MouseEvent) => Promise<void>,
  extractAlias: (value: string) => string,
  getUser: (authToken: AuthToken, alias: string) => Promise<User | null>
}

export const useUserNavigation = (): UserNavigationActions => {
  const navigate = useNavigate();
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();


  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());
      console.log(`Event:${event.target.toString()}`)
      const toUser = await getUser(authToken!, alias);
      const feature = extractFeature(event.target.toString());
      console.log(`Alias: ${alias} toUser: ${toUser} Feature:${feature}`)
      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`/${feature}/${alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
  };

  const extractFeature = (value: string): string => {
    console.log(`Extract Feature value:${value}`)
    const regex = /:\/\/[^/]+\/([^/]+)\/@[^/]+/;
    const matches = value.match(regex);
    console.log(matches);
    if (matches) {
      return matches[1];
    }
    console.log("No Feature found");
    return 'noFeat';
  }

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return {
    navigateToUser: (event: React.MouseEvent) => navigateToUser(event),
    extractAlias: (value: string) => extractAlias(value),
    getUser: (authToken: AuthToken, alias: string) => getUser(authToken, alias)
  }
}




