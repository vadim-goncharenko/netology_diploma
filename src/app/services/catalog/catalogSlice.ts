import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogItems, CatalogStateProps, CategoryItem, FixMeLater, IncreaseCatalogOffsetPayload,
  SearchCatalogPayload, SetActiveCategoryPayload, SetCatalogDataPayload } from '../../../types/types';

const mergeData = (a: CatalogItems, b: CatalogItems) => {
  const ids = new Set(a.map(x => x.id));
  const n = b.filter(x => !ids.has(x.id));
  return a.concat(n);
};

export const categoryAllOption: CategoryItem = {
  id: 0,
  title: "Все"
};

const initialState: CatalogStateProps = {
  data: null,
  offset: 0,
  lastLoadedItemCount: null,
  activeCategoryID: categoryAllOption.id,
  searchText: '', // for displaying
  searchParam: '' // for API
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<SetActiveCategoryPayload>) => {
      console.log('actionSetActiveCategory', action.payload);
      state.activeCategoryID = action.payload.activeCategoryID;
      state.data = [];
      state.offset = 0;
    },
    setCatalogData: (state, action: PayloadAction<SetCatalogDataPayload>) => {
      console.log('setCatalogData', action.payload);
      state.data = action.payload.data;
      state.lastLoadedItemCount = action.payload.data?.length;
    },
    addCatalogData: (state, action: PayloadAction<SetCatalogDataPayload>) => {
      console.log('setCatalogData', action.payload);
      state.data = mergeData(state.data || [], action.payload.data);
      state.lastLoadedItemCount = action.payload.data?.length;
    },
    increaseCatalogOffset: (state, action: PayloadAction<IncreaseCatalogOffsetPayload>) => {
      console.log('increaseCatalogOffset', action.payload);
      state.offset += action.payload.loadMoreCount;
    },
    setCatalogSearchText:  (state, action: PayloadAction<SearchCatalogPayload>) => {
      //console.log('setSearchCatalog', action.payload);
      if (state.searchText !== '' && action.payload.search ==='') { // cleared search
        state.data = [];
        state.searchParam = '';
        state.offset = 0;
      };
      state.searchText = action.payload.search;
    },
    searchCatalog: (state) => {
      if (state.searchParam !== state.searchText) { // search changed
        state.data = [];
        state.searchParam = state.searchText;
      };
    },
  }
});

export const { setActiveCategory, setCatalogData, increaseCatalogOffset, addCatalogData, setCatalogSearchText, searchCatalog } = catalogSlice.actions;
export const selectActiveCategoryID = (state: FixMeLater) => state.catalog.activeCategoryID;
export const selectCatalogOffset = (state: FixMeLater) => state.catalog.offset;
export const selectCatalogData = (state: FixMeLater) => state.catalog.data;
export const selectCatalog = (state: FixMeLater) => state.catalog;
export const selectCatalogSearchText = (state: FixMeLater) => state.catalog.searchText;
export const selectCatalogSearchParam = (state: FixMeLater) => state.catalog.searchParam;
export default catalogSlice.reducer;
