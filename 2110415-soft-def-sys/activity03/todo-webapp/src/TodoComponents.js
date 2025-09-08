import React from 'react';

class TodoRow extends React.Component {
    render() {
        const todo = this.props.todo;
        const completed = todo.completed? <input type="checkbox" disabled="disabled" checked="checked" /> : <span>&nbsp;</span>;
        const duedate = new Date(todo.duedate);

        return (
            <tr>
                <td>{completed}</td>
                <td>
                    <b>{todo.title}</b><br />
                    {todo.detail}<br />
                    {duedate.toString()}
                </td>
            </tr>
        );
    }
}


export class TodoTable extends React.Component {
    render() {
        const rows = [];

        this.props.todos.forEach((todo) => {
            rows.push(
                <TodoRow
                    todo={todo}
                    key={todo.id} />
            );
        });

        return (
            <div>
                <hr/>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
