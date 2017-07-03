import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import journals from '../../assets/data/journal.json';
import { natSort } from '../../helpers/sort';
import { Button } from 'reactstrap';

const YearBlock = ({ year, children }) =>
    <div>
        <div style={{ color: 'red' }}>
            {year}
        </div>
        {children}
    </div>;

const IssueItem = ({ name, id, index }) => {
    return (
        <div className="date-block">
            <span className="inspections-item-date">
                {name}
            </span>
            <span> - {id}</span>
            <span style={{ color: 'green' }}> - {index}</span>
        </div>
    );
};

class Sorting extends Component {
    render() {
        const tasks = groupBy(journals, 'year');
        const keysTasks = tasks && Object.keys(tasks).sort((a, b) => b - a);
        return (
            <div>
                <Button color="success">success</Button>{' '}
                {keysTasks.map(year => {
                    const tasksInDate = tasks[
                        year
                    ].sort(({ name: a }, { name: b }) => natSort(a, b));
                    return (
                        <YearBlock year={year} key={year + '-key'}>
                            {tasksInDate &&
                                tasksInDate.map((task, i) =>
                                    <IssueItem
                                        index={i + 1}
                                        key={i + '-task'}
                                        {...task}
                                    />,
                                )}
                        </YearBlock>
                    );
                })}
            </div>
        );
    }
}

const mapProps = ({ twitch }) => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Sorting);
