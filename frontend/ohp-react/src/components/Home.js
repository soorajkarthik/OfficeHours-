import React from "react";
import ClassList from "./ClassList";

class Home extends React.Component {
    constructor(props) {
        super(props);
        // Props: {"studentClasses":[[id, name], [id, name], [id, name]], "mentorClasses":[[id, name], [id, name]]} 
        this.state = {"selectedClass":undefined};
        this.switchSelected = this.switchSelected.bind(this)
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
            
        </div>)
    }

    switchSelected(id) {
        this.setState(() => {
            return {"selectedClass":id}
        });
    }
}

export default Home;