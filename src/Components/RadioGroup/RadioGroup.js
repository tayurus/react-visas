import React from "react";
import "./RadioGroup.css";

import newId from './../../utils/newid.js';


export class RadioGroup extends React.Component{
    constructor(props){
        super(props);
    }


    componentWillMount(){
        this.id = [];
        this.props.options.forEach((item,index)=>{
            this.id.push(newId())
        })
    }

    render(){
        let className = typeof this.props.className !== "undefined" ? this.props.className : "";
        return (
            <div className={"RadioGroup " + className}>
              <div className="RadioGroup__title" dangerouslySetInnerHTML={{ __html: this.props.title }}></div>
              <div className="RadioGroup__wrapper justify-content-center justify-content-md-start">
                {this.props.options.map((item, index) => {
                  return (
                    <div className="RadioGroup__item">
                      <input
                        className="RadioGroup__item-field"
                        type="radio"
                        checked={item.value === this.props.value}
                        name={this.props.name}
                        value={item.value}
                        id={this.id[index]}
                        onClick={(e) => this.props.updateField(this.props.fieldName + ".value",e.target.value)}
                      />
                      <label
                        className="RadioGroup__item-label"
                        htmlFor={this.id[index]}
                      >
                        {item.text}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="RadioGroup__error">{this.props.error}</div>
            </div>
        )
    }
}

{/*export const RadioGroup = props => {
  let className = typeof props.className !== "undefined" ? props.className : "";
  return (
    <div className={"RadioGroup " + className}>
      <div className="RadioGroup__title" dangerouslySetInnerHTML={{ __html: props.title }}></div>
      <div className="RadioGroup__wrapper">
        {props.options.map(item => {
          return (
            <div className="RadioGroup__item">
              <input
                className="RadioGroup__item-field"
                type="radio"
                name={props.name}
                value={item.value}
                id={generateIdForNewRadio()}
                onClick={(e) => props.updateField(props.fieldName + ".value",e.target.value)}
              />
              <label
                className="RadioGroup__item-label"
                htmlFor={"r" + radioElementsCount}
              >
                {item.text}
              </label>
            </div>
          );
        })}
      </div>
      <div className="RadioGroup__error">{props.error}</div>
    </div>
  );
};
*/}
