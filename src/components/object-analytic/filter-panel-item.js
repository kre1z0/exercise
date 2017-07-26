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
    item: { percent, id, label, value },
}) => {
    return (
        <li
            style={{
                backgroundColor: isActive ? getColor(percent) : 'transparent',
            }}
            onTouchTap={() => onTouchTap(id)}
            className={selected}
        >
            <span className="label">{label}:</span>
            <span className="value">{value}</span>
            <span
                className="percent"
                style={{
                    color: isActive ? '#fff' : getColor(percent),
                }}
            >
                ({percent}%)
            </span>
        </li>
    );
};

export default FilterPanelItem;
