import React from 'react';
import { Rnd } from 'react-rnd';
//const screen = require('electron');
//const {remote, desktopCapturer} = window.require('electron');
//const electron = require('electron');
//const {screen} = window.require('electron').remote;
const {screen} = window.require('electron').remote;
//import { screen } from 'electron';
//const { app, screen } = electron
//const {screenSize} = screen.getPrimaryDisplay().size;

/*app.on('ready', () => {
    const screenSize = screen.getPrimaryDisplay().size;    
  })*/

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    /*border: 'solid 2px #3a38d2',*/
    border: 'solid 2px #ff0000',
    margin: '5px'
};

class Cropper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: '500px',
            height: '500px',
            x: (screen.getPrimaryDisplay().size.width/2) - 250,
            y: (screen.getPrimaryDisplay().size.height/2) - 250
        };
    }

    

    render(){
        return(
            <Rnd
                style={style}
                size={{ width: this.state.width, height: this.state.height}}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => {
                    this.setState({ x: d.x, y: d.y})
                }}
                onResize={(e, direction, ref, delta, position) =>{
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        x : position.x,
                        y : position.y
                    });
                }}
                bounds={'parent'}
                >
                    <div className="rnd-controls">
                        <button
                            className="btn btn-primary"
                            onClick={this.props.snip.bind(this, this.state)}>
                            Capture
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.props.destroySnipView.bind(this)}>
                            Cancel
                        </button>
                    </div>
                </Rnd>
        )
    }
}

export default Cropper;