import React from "react";

/*******IMPORT COMPONENTS********/
import Select from "react-select";
import Datetime from "react-datetime";
import ReactFlagsSelect from "react-flags-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Moment from "moment";
/*******IMPORT STYLES********/
import "./Input.css";
import "react-flags-select/css/react-flags-select.css";
import "./../Datepicker/Datepicker.css";

// HELPERS for Datepicker's customisation
var renderers = {
    renderDay: function(props, currentDate, selectedDate) {
        return <td {...props}>{currentDate.date()}</td>;
    },
    renderMonth: function(props, month, year, selectedDate) {
        return (
            <td {...props} className="Datepicker__month">
                {Moment(month + 1, "MM").format("MMM")}
            </td>
        );
    },
    renderYear: function(props, year, selectedDate) {
        return (
            <td {...props} className="Datepicker__year">
                {year}
            </td>
        );
    }
};

export const Input = props => {
    let className = typeof props.className !== "undefined" ? props.className : "";
    if (props.visited) {
        className += props.error !== "" ? " incorrect" : " correct";
    }

    if (props.type !== "select" && props.type !== "date" && props.type !== "country" && props.type !== "phone") {
        return (
            <div className={"Input " + className}>
                <label className="Input__label">{props.label}</label>
                <input
                    onBlur={e => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(props.fieldName + ".value", e.target.value);
                    }}
                    onChange={e => props.updateField(props.fieldName + ".value", e.target.value)}
                    className="Input__field"
                    type={props.type}
                    placeholder={props.placeholder}
                />
                <div className="Input__error">{props.visited ? props.error : ""}</div>
            </div>
        );
    } else if (props.type === "select") {
        return (
            <div className={"Input Select " + className}>
                <label className="Input__label">{props.label}</label>
                <Select
                    className="Input__field"
                    value={props.value}
                    placeholder="Please select"
                    onChange={selectedOption => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(props.fieldName + ".value", selectedOption);
                    }}
                    onBlur={e => props.updateField(props.fieldName + ".visited", true)}
                    options={props.options}
                />
                <div className="Input__error">{props.visited ? props.error : ""}</div>
            </div>
        );
    } else if (props.type === "date") {
        var yesterday = Datetime.moment().subtract(1, "day");
        return (
            <div className={"Input " + className}>
                <label className="Input__label">{props.label}</label>
                <Datetime
                    isValidDate={ props.dateValidator }
                    onChange={date => props.updateField(props.fieldName + ".value", date)}
                    onBlur={date => props.updateField(props.fieldName + ".visited", true)}
                    input={true}
                    closeOnSelect={true}
                    renderDay={renderers.renderDay}
                    renderMonth={renderers.renderMonth}
                    renderYear={renderers.renderYear}
                    timeFormat={false}
                    dateFormat="DD MMM YYYY"
                    viewMode="years"
                    className="Datepicker"
                    value={props.value}
                />
                <div className="Input__error">{props.visited ? props.error : ""}</div>
            </div>
        );
    } else if (props.type === "country") {
        return (
            <div className={"Input Select_country " + className} onClick={() => props.updateField(props.fieldName + ".visited", true)}>
                <label className="Input__label">{props.label}</label>
                <ReactFlagsSelect
                    className=""
                    showSelectedLabel={true}
                    showOptionLabel={true}
                    selectedSize={14}
                    placeholder="Please select"
                    searchPlaceholder="please type"
                    searchable={true}
                    onSelect={selectedOption => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(props.fieldName + ".value", selectedOption);
                    }}
                />
                <div className="Input__error">{props.visited ? props.error : ""}</div>
            </div>
        );
    } else if (props.type === "phone") {
        return (
            <div className={"Input Select_country " + className}>
                <label className="Input__label">{props.label}</label>
                <PhoneInput
                    placeholder="Enter phone number"
                    onChange={phone => props.updateField(props.fieldName + ".value", phone)}
                    onBlur={e => props.updateField(props.fieldName + ".visited", true)}
                />
                <div className="Input__error">{props.visited ? props.error : ""}</div>
            </div>
        );
    }
};
