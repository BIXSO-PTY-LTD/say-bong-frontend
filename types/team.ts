
// ----------------------------------------------------------------------

export type ITeamTableFilterValue = string | string[];

export type ITeamTableFilters = {
  competition: string;
};

// ----------------------------------------------------------------------




export type ITeamItem = {
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

