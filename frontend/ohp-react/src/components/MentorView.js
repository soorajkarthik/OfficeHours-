import React from "react";

function getRoomName() {
    return "abc"
}

class MentorView extends React.Component {
    render() {
        const {className, id} = this.props;
        return (
            <div>
                <h3>{className}, as a Mentor</h3>
                <p>There are X people in the queue and Y mentors online.</p><br />
                <button onClick={this.getRedirect()}>Call the next student</button>
            </div> 
        )
    }

    getRedirect() {
        return function(){window.location.href="/call/" + getRoomName()}
    }
}

export default MentorView