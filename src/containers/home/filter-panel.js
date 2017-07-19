import React from 'react';
import cn from 'classnames';

import FilterPanelItem from './filter-panel-item';

import styles from './filter-panel.scss';

const FilterPanel = ({ items, onTouchTap, activePanelId }) => {
    return (
        <ul className={styles.filterPanel}>
            {items.map(({ label, percent, id }) => {
                const isActive = id === activePanelId;
                const selected = cn('panel-item', { selected: isActive });
                return (
                    <FilterPanelItem
                        key={id}
                        id={id}
                        onTouchTap={onTouchTap}
                        selected={selected}
                        isActive={isActive}
                        percent={percent}
                    />
                );
            })}
        </ul>
    );
};

export default FilterPanel;
