import React, { PureComponent } from "react";
import { verbs } from "./verbs";

const renderHTML = (rawHTML) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

class List extends PureComponent {
  state = {
    filter: "",
    currentVerb: null,
  };

  getTheBiggestVerbType = () => {
    let largestKey = null;
    let largestLength = -1;

    for (const key in verbs) {
      if (Array.isArray(verbs[key]) && verbs[key].length > largestLength) {
        largestKey = key;
        largestLength = verbs[key].length;
      }
    }

    return largestKey;
  };

  filteredVerbs = {}

  getFilteredVerbs = () => {
    const filteredVerbs = {};

    for (const category in verbs) {
      const categoryVerbs = verbs[category].filter((verb) =>
        verb.name.includes(this.state.filter)
      );

      if (categoryVerbs.length > 0) {
        filteredVerbs[category] = categoryVerbs;
      } else {
        filteredVerbs[category] = [];
      }
    }

    return filteredVerbs;
  };

  getTable = (filteredVerbs) => {
    return filteredVerbs[this.getTheBiggestVerbType()].map((g, index) => (
      <tr key={index}>
        {Object.keys(filteredVerbs).map((verbType, typeIndex) => (
          <td key={typeIndex}>
            {filteredVerbs[verbType][index] ? (
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary btn-sm m-auto"
                  onClick={this.clickVerb(filteredVerbs[verbType][index])}
                >
                  {filteredVerbs[verbType][index]?.name}
                </button>
              </div>
            ) : (
              ""
            )}
          </td>
        ))}
      </tr>
    ));
  }

  render() {
    return (
      <div className="list-wrapper d-flex flex-column">
        <div className="p-1 bg-body">
          <form className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter"
              onInput={this.setFilter}
            />
            <button
              className="btn btn-outline-primary"
              type="reset"
              onClick={this.reset}
            >
              Clear
            </button>
          </form>
        </div>
        <div className="flex-grow-1 d-flex flex-column overflow-auto mb-2">
          <table className="table list-table">
            <thead className="table-light list-table__head">
              <tr>
                {Object.keys(verbs).map((verbType, typeIndex) => (
                  <th scope="col" key={typeIndex} className="text-center">
                    {verbType}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{this.getTable(this.getFilteredVerbs())}</tbody>
          </table>
        </div>
        {this.state.currentVerb && (
          <div className="pb-2">
            <div className="card text-bg-primary">
              <div className="card-body py-2">
                {renderHTML(this.state.currentVerb?.example)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  clickVerb = (verb) => {
    return () => {
      this.setState({
        currentVerb: verb,
      });
    };
  };

  setFilter = (e) => {
    this.setState({
      filter: e.target.value.toLowerCase(),
    });
  };

  reset = () => {
    this.setState({
      filter: ""
    });
  }
}

export default List;
