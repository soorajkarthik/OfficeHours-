import React from "react";
import '../styles/ClassItem.css'

class ClassItem extends React.Component {
    render() {
        const {name, id, selected} = this.props;
        return (<div>
            <button 
                onClick={() => {this.switchSelected(id)}}
                className={selected ? "selectedClass" : ""}>
                    {name}
            </button>
        </div>)
    }

    switchSelected(id) {
        this.props.selectedClassChange(id)
    }
}

export default ClassItem;