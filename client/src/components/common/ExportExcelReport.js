import React, { Component } from "react";
import { Button } from "reactstrap";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";

class ExportExcelReport extends Component {
  render() {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvData, fileName) => {
      const dateTime = moment().format("YYYYMMDDhhmmss");

      const ws = XLSX.utils.json_to_sheet([
        { A: 1, B: 2 },
        { A: 2, B: 3 },
        { A: 3, B: 4 }
      ]);
      XLSX.utils.sheet_add_json(ws, csvData, {
        skipHeader: false,
        origin: "A6"
      });
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + "_" + dateTime + fileExtension);
    };

    return (
      <Button
        color="primary"
        onClick={e => exportToCSV(this.props.csvData, this.props.fileName)}
      >
        Export
      </Button>
    );
  }
}

export default ExportExcelReport;
