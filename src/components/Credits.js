/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const { credits, balance, updateAccountBalance } = props;
  // Create the list of Debit items
  let newBalance = 0;
  
  const roundToTwoDecimalPlaces = (value) => {
    return Math.round(value * 100) / 100;
  };

  const submissionCredit = (event) => {
    event.preventDefault()
    newBalance = roundToTwoDecimalPlaces((parseFloat(event.target.amount.value) + balance));

    const newCredit = {
      id: credits.length + 1,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value).toFixed(2),
      date: new Date().toISOString()
    }

    updateAccountBalance(newBalance);
    props.addCredit(newCredit);
    event.target.reset()
  }

  let creditsView = () => {
    return credits.map((credits) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credits.date.slice(0, 10);
      return <li key={credits.id}>{credits.amount} {credits.description} {date}</li>
    });
  }

  // const Credits = (props) => {
  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={balance} />
      {creditsView()}

      <form onSubmit={submissionCredit}>
        <input type="text" name="description" required/>
        <input type="number" step="any" name="amount" required/>
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;