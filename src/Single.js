import React, { PureComponent } from "react";
import { verbs } from "./verbs";

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

class Single extends PureComponent {
  state = {
    isOptionsShown: true,
    currentVerb: null,
  };

  componentDidMount() {
    this.showVerb();
  }

  showVerb = () => {
    this.setState({
      currentVerb: this.getVerb(),
    });
  };

  getVerbType = (name) => {
    for (const type in verbs) {
      if (verbs[type].some((verb) => verb.name === name)) {
        return type;
      }
    }
    return null;
  };

  getVerb = () => {
    const verbsArr = [...verbs.gerund, ...verbs.to, ...verbs.empty];
    const num = Math.floor(Math.random(1) * verbsArr.length);
    const verb = [...verbs.gerund, ...verbs.to, ...verbs.empty][num];
    verb.type = this.getVerbType(verb.name);
    return verb;
  };

  choseVerb = (type) => {
    return () => {
      this.setState({
        result: type === this.state.currentVerb.type ? "success" : "danger",
        isOptionsShown: false,
      });
    };
  };

  next = () => {
    this.showVerb();
    this.setState({
      result: null,
      isOptionsShown: true,
    });
  };

  render() {
    return (
      <div className="flex-grow-1 d-flex flex-column p-3">
        <div className="d-flex mb-auto">
          <h2 className="h1">{this.state.currentVerb?.name}</h2>
          <span
            className={
              "badge align-self-center ms-2 text-bg-" + this.state.result
            }
          >
            {this.state.result ? this.state.currentVerb.type : ""}
          </span>
        </div>
        {this.state.result ? (
          <div className="example">
            {renderHTML(this.state.currentVerb?.example)}
          </div>
        ) : (
          ""
        )}
        <div className="mb-3 mt-auto">
          {this.state.isOptionsShown ? (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-lg btn-outline-primary"
                onClick={this.choseVerb("gerund")}
              >
                Gerund
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline-primary"
                onClick={this.choseVerb("to")}
              >
                To
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline-primary"
                onClick={this.choseVerb("empty")}
              >
                Empty
              </button>
            </div>
          ) : (
            <button className="btn btn-lg btn-primary" onClick={this.next}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Single;
