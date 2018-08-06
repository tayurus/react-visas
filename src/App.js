import React, { Component } from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

/********* IMPORT COMPONENTS ********/
import { Header } from "./Components/Header/Header";
import { RadioGroup } from "./Components/RadioGroup/RadioGroup";
import { ToggleTab } from "./Components/ToggleTab/ToggleTab";
import { Input } from "./Components/Input/Input";
import { Button } from "./Components/Button/Button";
import { Step } from "./Components/Step/Step";

//For Validation
let Validator = require("validatorjs");
const plugins = {
    dvr: Validator
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            price: 15.4,
            currency: { value: "gbp", label: "£ - GBP" },
            currencies: [{ value: "gbp", label: "£ - GBP" }, { value: "usd", label: "$ - USD" }, { value: "eur", label: "€ - EUR" }],
            //this data for StepsNavigation Component
            steps: [
                {
                    stepName: "service details",
                    visited: true,
                    correct: true
                },
                {
                    stepName: "personal details",
                    visited: false
                },
                {
                    stepName: "your visit",
                    visited: false
                },
                {
                    stepName: "payment",
                    visited: false
                }
            ],

            /*************USER'S INPUT STEP 1************/

            groupSize: {
                value: "",
                error: "",
                visited: false
            },
            numberOfEntries: {
                value: "",
                error: "",
                visited: false
            },
            purpose: {
                value: "",
                error: "",
                visited: false
            },
            registration: {
                value: "",
                error: "",
                visited: false
            },
            countryApplyIn: {
                value: "",
                error: "",
                visited: false
            },
            registration: {
                value: "",
                error: "",
                visited: false
            },
            delivery: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 2************/
            visitors: [
                {
                    firstName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    middleName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    surName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    sex: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    birthDate: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    citizenship: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportNumber: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportIssued: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportExpired: {
                        value: "",
                        error: "",
                        visited: false
                    }
                }
            ],
            email: {
                value: "",
                error: "",
                visited: false
            },
            phone: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 3************/

            arrivalDate1: {
                value: "",
                error: "",
                visited: false
            },
            arrivalDate2: {
                value: "",
                error: "",
                visited: false
            },
            departureDate1: {
                value: "",
                error: "",
                visited: false
            },
            departureDate2: {
                value: "",
                error: "",
                visited: false
            },
            locations: [
                {
                    city: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    hotel: {
                        value: "",
                        error: "",
                        visited: false
                    }
                }
            ],
            userNeedsNewsletter: {
                value: "",
                error: "",
                visited: false
            },
            userNeedsJoinMailingList: {
                value: "",
                error: "",
                visited: false
            },
            userReadTerms: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 4************/

            userCompleteForm: {
                value: "",
                error: "",
                visited: false
            },

            /*******DATA FROM SERVER**********/
            OptionsgroupSize: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }]
        };

        /******BINDING*****/
        this.updateField = this.updateField.bind(this);
        this.updateError = this.updateError.bind(this);
        this.validate = this.validate.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    // METHODS

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value) {
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });
        let state = this.state;
        eval("state" + code + "=value");
        this.setState(state);
        this.validate();
    }


    updateError(fieldName, value) {
        let updatedField = this.state[fieldName];
        updatedField.error = value;

        let newState = this.state;
        newState[fieldName] = updatedField;

        this.setState(newState);
    }

    validate() {
        let data = {
            groupSize: this.state.groupSize.value.value
        };

        let rules = {
            groupSize: "required"
        };

        let validation = new Validator(data, rules);

        validation.fails(); // true
        validation.passes(); // false

        // Error messages
        // Object.keys()
        if (validation.errors.first("groupSize")) this.updateError("groupSize", validation.errors.first("groupSize"));
        else this.updateError("groupSize", "");
    }

    render() {
        let state = this.state;
        return (
            <div className="App text-center text-md-left">
                <Header
                    updateField={this.updateField}
                    steps={state.steps}
                    currentStep={state.currentStep}
                    currencies={state.currencies}
                    currency={state.currency}
                    price={state.price}
                />

                <div className="App__container container">
                    <div className="container px-0 mr-auto ml-0">
                        <div className="row py-3">
                            <div className="d-flex flex-wrap col-md-6">
                                <Button label="retrieve saved application" className="mr-3" text="CONTINUE a saved existing application" />
                                <Button label="save progress" text="SAVE your current progress" />
                            </div>
                            <div className="ml-auto col-md-3">
                                <Button
                                    label="I am returning client"
                                    className="Button_red-border"
                                    text="RECOVER your personal details quickly to pre-fill your application"
                                />
                            </div>
                        </div>
                        <Step number={1} hidden={false}>
                            <Input
                                type="select"
                                updateField={this.updateField}
                                fieldName="groupSize"
                                visited={state.groupSize.visited}
                                label="Group Size"
                                error={state.groupSize.error}
                                options={state.OptionsgroupSize}
                            />
                        </Step>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-sm-6">
                            <Button label="Save progress" />
                        </div>
                        <div className=" col-sm-6">
                            <Button className="Button_red" label="Next step >" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
//
// {/*RadioGroup GROUP EXAMPLE*/}
// {/*<RadioGroup
//     handleChange={this.handleSexChange}
//     error={this.state.sex.error}
//     title="Gender"
//     options={[{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]}
//     name="gender"
// />*/}
//
// {/*ToggleTab example*/}
// <ToggleTab label="Вкладка">
//     {/*INPUT example*/}
//     <Input
//         type="date"
//         updateVisited={this.updateVisited}
//         updateField={this.updateField}
//         fieldName="email"
//         value={state.email.value}
//         visited={state.email.visited}
//         label="Email"
//         placeholder="Enter email"
//         error={state.email.error}
//     />
//     <Input
//         type="select"
//         updateVisited={this.updateVisited}
//         updateField={this.updateField}
//         fieldName="email"
//         value={state.email.value}
//         visited={state.email.visited}
//         label="Email"
//         error={state.email.error}
//     />
// </ToggleTab>
//
// {/*Button example*/}
// <Button label="next step" className="Button_red-border" text="Save your current progress" />
