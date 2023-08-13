import chalk from "chalk"
import chackTable from "chalk-table"

import TableComponent from "../../shared/base/table-component.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data)
    const options = {
      leftPad: 2,
      columns
    }

    const table = chackTable(options, data)
    console.log(table)
  }

  prepareData(data) {
    const [ firstItem ] = data
    const headers = Object.keys(firstItem)

    const formatHeader = (data, index) => index % 2 === 0 
      ? chalk.yellow(data)
      : chalk.green(data)

    const columns = headers.map((item, index) => ({
      field: item,
      name: formatHeader(item, index)
    }))

    return columns
  }
}