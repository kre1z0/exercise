import React from 'react';
import cn from 'classnames';

import FilterPanelItem from './filter-panel-item';

import styles from './filter-panel.scss';

const FilterPanel = ({ items, onTouchTap, activePanelId }) => {
    return (
        <div className={styles.filterPanel}>
            {items.map(item => {
                const id = item.id;
                const isActive = id === activePanelId;
                const selected = cn('panel-item', { selected: isActive });
                return (
                    <FilterPanelItem
                        key={id}
                        id={id}
                        item={item}
                        onTouchTap={onTouchTap}
                        selected={selected}
                        isActive={isActive}
                    />
                );
            })}
        </div>
    );
};

export default FilterPanel;
