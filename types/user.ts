
// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
};
export type IUser = {
  items: IUserItem[];
  paginate: {
    count: number;
    current_page: number;
    firstItem: number;
    lastItem: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};


export type IUserItem = {
  id: string;
  fullName: string;
  userName: string;
  createdAt: Date;
  phone: string;
  email: string;
  role: string;
  profileImage: string;
};

export type IUserAccount = {
  id: string;
  fullName: string;
  userName: string;
  phone: string;
  email: string;
};