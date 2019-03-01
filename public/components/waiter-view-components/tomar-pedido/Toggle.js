import React from 'react';

export default class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.refToFirstCheck = React.createRef();
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        this.state = {chxLlevar:true,chxComerAca:false,chxExpress:false,chxLlamada:false,selectedValue:'llevar'};
    }

    componentDidMount(){
        this.refToFirstCheck.current.checked = true;
    }

    getSelectedValue(){
        return this.state.selectedValue;
    }

    onCheckBoxChange(event){
        let value = event.target.checked;
        switch(event.target.value){
            case "llevar":
                if(value){
                    this.setState({chxLlevar:true,chxComerAca:false,chxExpress:false,chxLlamada:false});
                }
                break;
            case "comer aca":
                if(value){
                    this.setState({chxLlevar:false,chxComerAca:true,chxExpress:false,chxLlamada:false,selectedValue:'comer aca'});
                }
                break;
            case "express":
                if(value){
                    this.setState({chxLlevar:false,chxComerAca:false,chxExpress:true,chxLlamada:false,selectedValue:'express'});
                }
                break;
            case "llamada":
                if(value){
                    this.setState({chxLlevar:false,chxComerAca:false,chxExpress:false,chxLlamada:true,selectedValue:'llamada'});
                }
                break;
        }
        
    }

    render(){
        return(
            <React.Fragment>
                <input checked={this.state.chxLlevar} id="chkbxll" type="checkbox" ref={this.refToFirstCheck} onChange={this.onCheckBoxChange} value="llevar"/>
                <label htmlFor="chkbxll">llevar</label>
                <br/>
                <input checked={this.state.chxComerAca} id="chkbxac" type="checkbox" ref={this.refToComerAcaCheck} onChange={this.onCheckBoxChange} value="comer aca"/>
                <label htmlFor="chkbxac">comer acá</label>
                <br/>
                <input checked={this.state.chxExpress} id="chkbxex" type="checkbox" ref={this.refToExpressCheck} onChange={this.onCheckBoxChange} value="express"/>
                <label htmlFor="chkbxex">express</label>
                <br/>
                <input checked={this.state.chxLlamada} id="chkbxte" type="checkbox" ref={this.refToLlamadaCheck} onChange={this.onCheckBoxChange} value="llamada"/>
                <label htmlFor="chkbxte">llamada</label>
            </React.Fragment>
        );
    }
}