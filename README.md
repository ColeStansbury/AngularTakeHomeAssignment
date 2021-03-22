# Angular Take Home Assignment
### _Developed by Cole Stansbury_
[See Project Demo Here](https://onedrive.live.com/?authkey=%21ANnsc3DlE7ww0OQ&cid=492339F16259411D&id=492339F16259411D%21517635&parId=492339F16259411D%2194922&action=locate)

### Running locally

Run `npm install`, once complete, run `ng serve` then navigate to `http://localhost:4200/`

## Part 1: Style Input Form

### Part 1: Parent Component

- Initializes Text, Color and Font to as properties to be shared amongst the form, and the result
  component
- Uses syntax: `[()]` to 2 way bind each property with form component allowing the form to update
  part1's properties
- Uses syntax: `[]` to 1 way bind properties to the result component

### Part 1 Child: Form Component

- Takes properties from Part 1 as `@Input` and `@Outputs` changes to their value
- Uses `FormBuilder` combined with Angular Material components to take user input for each property
- Listens for `(keyup)` events from `mat-input`s to send output events of updated values to Part 1
  component

### Part 1 Child: Result Component

- Takes properties from Part1, updated by form as `@Input`
- Uses `mat-card` as a canvas for the forms output
- Uses `[NgStyle]` to bind style properties to input properties

## Part 2: Vaccine Allocations

### Part 2: State Management

#### Service

- Annotated as `@Injectable`
- Injects http client from `@angular/common/http` into constructor
- Exposes service method, `getAllVaccineData()`, which returns an observable of type `Vaccine[]`

#### Store

- Defines action types and actions for clients to invoke requests allowing effects to respond to such
  requests
- Effects invoke service asynchronously then update the state or catch an error
- Reducer subscribes to an action dispatched to the store and respond by managing the state

### Part 2 Parent Component

- Injects the module's store then dispatches an action to load the data
- Builds `mat-tab-group` with `mat-tab`s for the summary table and chart

### Part 2 Child: Summary Table

- Injects the modules store then subscribes to the `AppState` to collect the store's data
- Uses `mat-table` and `mat-pagination` to tabulate the data and handle filters, page changes, and
  page size changes

### Part 2 Child: Chart

- Injects the modules store then subscribes to the `AppState` to collect the store's data
- Uses `chart.js` and `ng2-charts` to scaffold a bar chart
- Transforms vaccine array into a map storing dose 1 and dose 2 allocations in an array keyed by
  distinct jurisdiction
- Sorts map by dose 1 descending, dose 2 descending then jurisdiction ascending
- **NOTE:** Data transformation is not optimized. For scope of the assignment, the transformation was
  intended to be implemented as terse as possible
- _In a scalable project, transformation could be refactored into a chart utility directory to transform
  and sort any dataset for bar charts in optimal time/space complexity_
