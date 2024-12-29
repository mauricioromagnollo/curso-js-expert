import TableComponent from "../../shared/base/table-component.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(database) {
    const template = this.prepareData(database)
    document.body.insertAdjacentHTML('afterBegin', template)
  }

  prepareData(data) {
    const [firstItem] = data
    const tHeaders = Object.keys(firstItem)
      .map(text => `<th scope=col>${text}</th>`)

    const joinLists = (list) => list.join('')

    const tBodyValues = data
      .map(item => Object.values(item))
      .map(values => values.map(value => `<td>${value}</td>`))
      .map(tds => `<tr>${tds.join('')}</tr>`)

    const template = `
      <table class="table">
        <thead>
          <tr>${joinLists(tHeaders)}</tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}
        </tbody>
      </table>
    `

    return template
  }
}