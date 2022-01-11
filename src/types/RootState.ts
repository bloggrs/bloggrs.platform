// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  auth: any;
  users: any;
  'createBlog.blogCategories': any;
  'blogOverviewCard.blog': any;
  'latestPostsCard.posts': any;
  'postsListing.posts': any;
  'commentsListing.comments': any;
}
