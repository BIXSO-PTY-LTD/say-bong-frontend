
// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  competition: string;
};

// ----------------------------------------------------------------------




export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  state: string;
  status: string[];
  competition: string;
  address: string;
  country: string;
  zipCode: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

