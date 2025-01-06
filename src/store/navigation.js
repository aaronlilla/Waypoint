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
      state.navItems.forEach(item => item.items.forEach(subitem => (subitem.selected = false)));
      state.navItems[action.payload[0]].items[action.payload[1]].selected = true;
      state.activeUrl = state.navItems[action.payload[0]].items[action.payload[1]].url;
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
