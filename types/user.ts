
// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
};


export type IUserItem = {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  avatarUrl: string;
  phoneNumber: string;
};

export type IUserAccount = {
  id: string;
  fullName: string;
  userName: string;
  phone: string;
  email: string;
};