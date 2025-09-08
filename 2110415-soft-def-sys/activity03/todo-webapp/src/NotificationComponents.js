import React from 'react';

class NotificationRow extends React.Component {
    render() {
        const notification = this.props.notification;

        return (
            <tr>
                <td>
                    <b>{notification.title}</b>
                </td>
            </tr>
        );
    }
}


export class NotificationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last_seen: 0,
            numNew: 0,
            notifications: []
        }
        this.notification_endpoint = 'http://localhost:8000/notification/';
    }

    refreshBadge() {
        // check Notification service using last_seen to update numNotificaitons
        const now = Math.round(Date.now() / 1000);
        const url = this.notification_endpoint + '?begin=' + (this.state.last_seen+1) + '&end=' + now;
        this.setState({last_seen: now});
        fetch(url, { mode: 'cors' })
            .then(res => res.json())
            .then((data) => {
                const numNew = this.state.numNew + data.length;
                //const notifications = this.state.notifications.concat(data);
                const notifications = data;
                this.setState( { numNew: numNew, notifications: notifications } );
            })
            .catch(console.log);

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.refreshBadge(),
            3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const rows = [];
        const n = this.state.notifications.length;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(this.state.last_seen);

        for(var i=0 ; i<n ; i++) {
            const notification = this.state.notifications[i];
            rows.push(
                <NotificationRow
                    notification={notification}
                    key={i} />
            );
        }

        return (
            <div>
                {this.state.numNew} ({d.toString()})
                <br />
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
