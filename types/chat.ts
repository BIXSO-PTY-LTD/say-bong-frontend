// ----------------------------------------------------------------------

export type IAuthor = {
  id: string;
  userName: string;
  fullName: string;
  profileImage: string
};

export type ICommentItem = {
  id: string;
  title: number;
  content: string;
  postId: string;
  author: IAuthor[];
  createdAt: Date;
  updatedAt: Date;
};

export type ICommentUser = {
  content: string;
  postId: string;
  userId: string
};