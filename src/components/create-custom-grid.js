import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { css } from "@emotion/css";

export class CreateGridComponent {
  constructor({
    columns,
    url,
    method = "POST",
    bodyRequest,
    callback,
    total = false,
    search = false,
  }) {
    this.columns = columns;
    this.url = url;
    this.method = method;
    this.bodyRequest = bodyRequest;
    this.callback = callback;
    this.total = total;
    this.search = search;
  }

  buildGrid() {
    return new Grid({
      search: this.search,
      pagination: {
        limit: 5,
        enabled: true,
        summary: false,
      },
      columns: this.columns,
      server: {
        method: this.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.bodyRequest),
        url: this.url,
        then: this.callback,
        total: this.total,
      },
      className: {
        container: css`
          * {
            font-family: "Tahoma";
          }
        `,
        table: css`
          width: 60%;
          tr:hover td {
            background-color: rgba(0, 0, 0, 0.1);
          }
        `,
        th: css`
          text-align: center;
          &:hover {
            background-color: #999;
            color: #fff;
          }
        `,
        td: css`
          color: #999;
          cursor: pointer;
          &:hover {
            color: #000;
          }
        `,
      },
    });
  }

  addEventRowSelection(grid, callback) {
    grid.on("rowClick", (...args) => {
      callback(args[1]._cells[0].data, args[1]._cells[1].data);
    });
  }

  render(grid, htmlElementID) {
    const parentElement = document.getElementById("main-container");
    const childDiv = document.getElementById(htmlElementID);

    if (childDiv) childDiv.parentNode.removeChild(childDiv);

    let divElement = document.createElement("div");
    divElement.id = htmlElementID;

    parentElement.appendChild(divElement);
    grid.render(divElement);
  }
}
