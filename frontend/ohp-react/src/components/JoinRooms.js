import React from "react";
import StudentView from "./StudentView";
import MentorView from "./MentorView";

class JoinRooms extends React.Component {
    render() {
        const {mentor, className, id} = this.props;
        if (id === undefined) {
            return null;
        }
        let view = <StudentView className={className} id={id}/>
        if (mentor) {
            view = <MentorView className={className} id={id}/>
        }
        return (
            view
        )
    }
}

export default JoinRooms;