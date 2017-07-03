import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import journals from '../../assets/data/journal.json';
import { natSort } from '../../helpers/sort';

const DateBlock = ({ date, children }) =>
    <div className="date-block">
        <div style={{ color: 'red' }} className="inspections-item-date">
            {date}
        </div>
        {children}
    </div>;

const TaskItem = ({ name, id }) => {
    return (
        <div className="date-block">
            <span className="inspections-item-date">
                {name}
            </span>
            <span> - {id}</span>
        </div>
    );
};

class Home extends Component {
    componentDidMount() {
        console.log('!!!!!');
    }

    render() {
        const tasks = groupBy(journals, 'year');
        const nope = groupBy(journals, 'name');
        const keysTasks = tasks && Object.keys(tasks).sort((a, b) => b - a);
        console.log('keysTasks', keysTasks);
        const xuy = nope && Object.keys(nope);
        console.log('xuy', xuy);
        return (
            <div>
                {keysTasks.map(date => {
                    const tasksInDate = tasks[
                        date
                    ].sort(({ name: a }, { name: b }) => natSort(a, b));
                    console.log('tasksInDate', tasksInDate);
                    return (
                        <DateBlock date={date} key={date + '-key'}>
                            {' '}
                            {tasksInDate &&
                                tasksInDate.map((task, i) =>
                                    <TaskItem key={i + '-task'} {...task} />,
                                )}
                        </DateBlock>
                    );
                })}
            </div>
        );
    }
}

const mapProps = ({ twitch }) => ({
    twitch,
});

const mapActions = {};

export default connect(mapProps, mapActions)(Home);
