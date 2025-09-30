import { AuthToken, FakeData, User } from "tweeter-shared";
import UserItemScroller from "./UserItemScroller";

export const PAGE_SIZE = 10;


const FollowersScroller = () => {
  const loadMoreFollowers = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastFollower: User | null
  ): Promise<[User[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastFollower, pageSize, userAlias);
  };

  return (
    <UserItemScroller pageType="followers" getData={loadMoreFollowers} />
  )
};

export default FollowersScroller;
