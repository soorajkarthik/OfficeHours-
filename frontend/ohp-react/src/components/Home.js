import React from "react";
import ClassList from "./ClassList";
import JoinRooms from "./JoinRooms";

class Home extends React.Component {
    constructor(props) {
        super(props);
        // Props: {"studentClasses":[[id, name], [id, name], [id, name]], "mentorClasses":[[id, name], [id, name]]} 
        this.state = {"selectedClass":undefined};
        this.switchSelected = this.switchSelected.bind(this)
        this.isMentor = this.isMentor.bind(this)
        this.getClassName = this.getClassName.bind(this)
    }

    render() {
        const {studentClasses, mentorClasses} = this.props;
        return (<div>
            <div>
                Classes as Student:
                <ClassList 
                    selectedClassChange={this.switchSelected} 
                    classes={studentClasses} 
                    selectedClass={this.state.selectedClass}
                />
                Classes as Mentor:
                <ClassList 
                    selectedClassChange={this.switchSelected} 
                    classes={mentorClasses} 
                    selectedClass={this.state.selectedClass}
                />
            </div>
            <div>
                <JoinRooms 
                    mentor={this.isMentor()} 
                    id={this.state.selectedClass} 
                    className={this.getClassName(this.state.selectedClass)}
                />
            </div>
        </div>)
    }

    isMentor() {
        let mentorClasses = this.props.mentorClasses;
        for (let i = 0; i < mentorClasses.length; i++) {
            if (mentorClasses[i][0] == this.state.selectedClass) {
                console.log(mentorClasses[i])
                return true;
            }
        }
        return false;
    }

    switchSelected(id) {
        this.setState(() => {
            return {"selectedClass":id}
        });
    }

    getClassName(id) {
        let mentorClasses = this.props.mentorClasses;
        for (let i = 0; i < mentorClasses.length; i++) {
            if (mentorClasses[i][0] == id) {
                return mentorClasses[i][1];
            }
        }
        let studentClasses = this.props.studentClasses;
        for (let i = 0; i < studentClasses.length; i++) {
            if (studentClasses[i][0] == id) {
                return studentClasses[i][1];
            }
        }
        return undefined;
    }
}

export default Home;