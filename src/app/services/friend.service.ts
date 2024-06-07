import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../const/url';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  URL = `${API_URL}/Friend`;
  constructor(private http: HttpClient) {}
  searchFriend(keyword: string) {
    return this.http.get(`${this.URL}/FindFriend?keyword=${keyword}`);
  }
  followUser(friendId: string) {
    return this.http.post(`${this.URL}/AddFriend?friendId=${friendId}`, {});
  }
  getFriendsFollowing(anotherUserId?: string) {
    let url = `${this.URL}/GetFriendsFollowing`;
    if (anotherUserId) url += `?anotherUserId=${anotherUserId}`;
    return this.http.get(url);
  }
  getAllFollowers(anotherUserId?: string) {
    let url = `${this.URL}/GetFollowers`;
    if (anotherUserId) url += `?anotherUserId=${anotherUserId}`;
    return this.http.get(url);
  }
  getDetailUser(friendId: string) {
    return this.http.get(`${this.URL}/GetUserDetail?friendId=${friendId}`);
  }
  unFollowUser(friendId: string) {
    return this.http.get(`${this.URL}/UnFollowingUser?friendId=${friendId}`);
  }
  removeFollower(friendId: string) {
    return this.http.get(`${this.URL}/RemoveFollower?friendId=${friendId}`);
  }
  unfollowFromBoth(friendId: string) {
    return this.http.get(`${this.URL}/UnfollowFromBoth?friendId=${friendId}`);
  }
}
