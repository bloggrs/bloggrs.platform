// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  auth: any;
  users: any;
  blogs: any;
  'createBlog.blogCategories': any;
  'createBlog.blogThemes': any;
  'blogOverviewCard.blog': any;
  'latestPostsCard.posts': any;
  'postsListing.posts': any;
  'commentsListing.comments': any;
  'homePage.blogs': any;
  'selectBlog.blogs': any;
  'platform.postCategories': any;
  'platform.categories': any;
  'platform.createPost.categories': any;
  'platform.createPost.tags': any;
  'platform.posts': any;
  'platform.addTeamMember.users': any;
  'platform.tags': any;
}
