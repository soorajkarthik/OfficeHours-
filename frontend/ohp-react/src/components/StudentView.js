import React from "react";

class StudentView extends React.Component {
    render() {
        const {className, id} = this.props;
        return (
            <div>
                <h3>{className}, as a Student</h3>
                <p>There are X people in the queue and Y mentors online.</p><br />
                <button>Join the queue</button>
            </div>
        )
    }
}

export default StudentView