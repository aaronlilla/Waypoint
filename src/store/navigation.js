import { createSlice } from '@reduxjs/toolkit';
import { navMap } from '../components/Navigation/navmap';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    navItems: navMap,
    filteredNavItems: navMap,
    activeUrl: null,
    searchTerm: '',
  },
  reducers: {
    expandNavItem: (state, action) => {
      state.navItems[action.payload].expanded = !state.navItems[action.payload].expanded;
      state.filteredNavItems[action.payload].expanded = state.navItems[action.payload].expanded;
    },
    selectNavItem: (state, action) => {
      const updatedNavItems = state.navItems.map((item, parentIndex) => ({
        ...item,
        items: item.items.map((subItem, subIndex) => ({
          ...subItem,
          selected:
            parentIndex === action.payload[0] && subIndex === action.payload[1],
        })),
      }));
    
      state.navItems = updatedNavItems;
    
      state.filteredNavItems = updatedNavItems;
      state.activeUrl =
        state.navItems[action.payload[0]].items[action.payload[1]].url;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;

      if (action.payload === '') {
        state.filteredNavItems = state.navItems;
        return;
      }

      state.filteredNavItems = state.navItems
        .map(parent => {
          const matchesParent = parent.name.toLowerCase().includes(action.payload.toLowerCase());
          const subItems = parent.items.filter(subItem =>
            subItem.name.toLowerCase().includes(action.payload.toLowerCase())
          );

          if (matchesParent || subItems.length > 0) {
            return {
              ...parent,
              expanded: true,
              items: matchesParent ? parent.items : subItems,
            };
          }

          return null;
        })
        .filter(Boolean);
    },
  },
});

export const { expandNavItem, selectNavItem, setSearchTerm } = navigationSlice.actions;

export default navigationSlice.reducer;
