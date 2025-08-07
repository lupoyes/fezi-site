export type MenuItem = {
  id: number;
  image: string;
  name: string;
  description?: string;
  price: string;
  category: string;
  vegan: boolean;
  vegetarisch: boolean;
};

export type PaginatedMenuResponse = {
  results: MenuItem[];
  total_pages: number;
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
};

type Link = {
  name: string;
  url: string;
};

export type NavbarLink = {
  name: string;
  url: string;
  sub?: Link[];
};
