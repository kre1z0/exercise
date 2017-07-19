import React from 'react';

const getColor = percent => {
    if (percent > 0) return 'green';
    else if (percent === 0) return 'gray';
    else return 'red';
};

const FilterPanelItem = ({
    isActive,
    onTouchTap,
    selected,
    percent,
    id,
    label,
}) => {
    return (
        <li
            style={{
                backgroundColor: isActive ? getColor(percent) : 'transparent',
            }}
            onTouchTap={() => onTouchTap(id)}
            className={selected}
        >
            {label}
            <span
                style={{
                    color: isActive ? '#fff' : getColor(percent),
                }}
            >
                {percent}
            </span>
        </li>
    );
};

export default FilterPanelItem;
