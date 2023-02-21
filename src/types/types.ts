export interface TopSalesItem {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export interface CategoryItem {
  id: number;
  title: string;
};

export interface CatalogItem {
  id: number;
  title: string;
  price: number;
  images: string[];
};
export type CatalogItems = CatalogItem[];

export interface SizeItem {
  size: string,
  available: boolean
};

export type SizeItems = SizeItem[];

export interface ProductItem {
  id: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  price: number;
  sizes: SizeItems;
};

export interface CartItem {
  id: number;
  title: string;
  size: string;
  price: number;
  count: number;
};
export type CartItems = CartItem[] | null;

export interface Owner {
  phone: string;
  address: string;
};

export interface Order {
  owner: Owner;
  items: CartItems;
};

export type ProductID = number;
export type Size = string;

export interface Product {
  id: ProductID;
  count: number;
  price: number;
  title: string;
  size: Size;
};

export interface ProductSize {
  [key: Size]: Product;
};

export interface CartData {
  [key: ProductID]: ProductSize;
}

export interface CartState {
  data: CartData | null,
  owner: Owner
};

export interface DeleteFromCartPayload {
  id: ProductID,
  size: Size
};

export interface GetCatalogArgs {
  categoryId?: number,
  offset?: number,
  q?: string
};

export interface CatalogStateProps {
  data: CatalogItems | null,
  offset: number,
  activeCategoryID: number,
  searchText: string,
  searchParam: string,
  lastLoadedItemCount: number | null
};

export interface SetActiveCategoryPayload {
  activeCategoryID: number
};

export interface SetCatalogDataPayload {
  data: CatalogItems
};

export interface IncreaseCatalogOffsetPayload {
  loadMoreCount: number
};

export interface SearchCatalogPayload {
  search: string
};

export type FixMeLater = any;
