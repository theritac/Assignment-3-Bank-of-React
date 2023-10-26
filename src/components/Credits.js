/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  // Create the list of Debit items
    const submissionCredit = (event) => {
      event.preventDefault()

      const newCredit = {
        description: event.target.description.value,
        amount: parseFloat(event.target.amount.value).toFixed(2),
        date: new Date().toISOString()
      }

      props.addCredit(newCredit);
      event.target.reset()
    }
  
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credits) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credits.date.slice(0,10);
      return <li key={credits.id}>{credits.amount} {credits.description} {date}</li>
    });
  }
// const Credits = (props) => {
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={submissionCredit}>
        <input type="text" name="description" />
        <input type="number" step="any" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;