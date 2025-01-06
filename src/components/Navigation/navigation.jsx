import { useSelector } from 'react-redux';
import { expandNavItem, selectNavItem, setSearchTerm } from '../../store/navigation';
import { useDispatch } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import Input from 'rc-input';
import './nav.scss';

const Navigation = () => {
  const filteredNavItems = useSelector(state => state.navigation.filteredNavItems);
  const searchTerm = useSelector(state => state.navigation.searchTerm);
  const dispatch = useDispatch();

  return (
    <div className="navigation">
      <Input
        placeholder="Filter Navigation"
        value={searchTerm}
        prefix={<CiSearch />}
        onChange={e => dispatch(setSearchTerm(e.target.value))}
      />
      {filteredNavItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item ${item.expanded ? 'nav-item-expanded' : ''}`}
          onClick={() => dispatch(expandNavItem(index))}
        >
          <div className="nav-item-main" style={item.expanded ? { marginBottom: '12px' } : {}}>
            {item.icon && <item.icon />} {String(item.name).toUpperCase()}
          </div>
          {item.expanded &&
            item.items.map((subItem, subIndex) => (
              <div
                key={subIndex}
                className={`nav-item-sub ${subItem.selected ? 'nav-item-sub-selected' : ''}`}
                onClick={e => {
                  e.stopPropagation();
                  dispatch(selectNavItem([index, subIndex]));
                }}
              >
                <div>
                  {subItem.icon && <img src={subItem.icon} alt={subItem.name} />}{' '}
                  {String(subItem.name).toUpperCase()}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Navigation;