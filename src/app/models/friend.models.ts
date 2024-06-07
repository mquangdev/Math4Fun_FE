export interface FindFriend {
  user: User;
  isYourFriend: boolean;
}

export interface User {
  id: string;
  username: string;
  fullname: string;
  gender: any;
  dob: string;
  avatar: any;
  email: string;
  totalExp: any;
  totalGem: any;
  role: number;
  dateJoin: string;
  users_Courses: any;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friend: User;
  user: User;
  createAt: string;
}
export interface DetailFriend {
  user: User;
  isFollowing: boolean;
  isFollower: boolean;
}
