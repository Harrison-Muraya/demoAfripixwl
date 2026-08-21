export type IndustryRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  blurb: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DemoRow = {
  id: string;
  slug: string;
  name: string;
  industry_slug: string;
  description: string;
  demo_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};
