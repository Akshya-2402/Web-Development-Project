#include <iostream>
#include <vector>
#include <string>
using namespace std;
class User {
protected:
string username;
string name;
public:
User(const string& userUsername, const string& userName)
: username(userUsername), name(userName) {}
virtual void displayProfile() const {
cout << "User Profile:" << endl;
cout << "Username: " << username << endl;
cout << "Name: " << name << endl;
}
};
class Blogger : public User {
protected:
vector<string> posts;
public:
Blogger(const string& userUsername, const string& userName)
: User(userUsername, userName) {}
void createPost(const string& postContent) {
posts.push_back(postContent);
}
void displayProfile() const override {
User::displayProfile();
if (!posts.empty()) {
cout << "Posts:" << endl;
for (const auto& post : posts) {
cout << post << endl;
}
}

}
};
class Influencer : public Blogger {
private:
int followerCount;
public:
Influencer(const string& userUsername, const string& userName, int followers
= 0)
: Blogger(userUsername, userName), followerCount(followers) {}
void manageFollowers(int newCount) {
followerCount = newCount;
}
void displayProfile() const override {
Blogger::displayProfile();
cout << "Follower Count: " << followerCount << endl;
}
};
int main() {
string username, name;
int numPosts, followerCount;
// Read influencer details
getline(cin, username);
getline(cin, name);
cin >> numPosts;
cin.ignore(); // Clear the newline character
// Create influencer object
Influencer influencer(username, name);
// Read posts
for (int i = 0; i < numPosts; ++i) {
string post;
getline(cin, post);
influencer.createPost(post);
}
// Read follower count
cin >> followerCount;
influencer.manageFollowers(followerCount);
// Display profile
influencer.displayProfile();
return 0;
}