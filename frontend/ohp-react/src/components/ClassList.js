import React from "react";
import ClassItem from './ClassItem'

class ClassList extends React.Component {

    render() {
        const {classes, selectedClass, selectedClassChange} = this.props;

        return (<div>
            {classes.map((classItem) => {
                return <ClassItem 
                    key={classItem[0]} 
                    selected={classItem[0] === selectedClass} 
                    id={classItem[0]}
                    name={classItem[1]} 
                    selectedClassChange={selectedClassChange}
                />
            })}
        </div>);
    }
}

export default ClassList;