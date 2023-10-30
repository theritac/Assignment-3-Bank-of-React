/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const { debits, balance, updateAccountBalance } = props;
  // Create the list of Debit items
  let newBalance = 0;

  const submissionDebit = (event) => {
    event.preventDefault()
    newBalance = (balance - parseFloat(event.target.amount.value)).toFixed(2);
    const newDebit = {
      id: debits.length + 1,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value).toFixed(2),
      date: new Date().toISOString()
    }

    updateAccountBalance(newBalance);
    props.addDebit(newDebit);
    event.target.reset()
  }

  let debitsView = () => {
    return debits.map((debits) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debits.date.slice(0, 10);
      return <li key={debits.id}>{debits.amount} {debits.description} {date}</li>
    });
  }

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>
      <AccountBalance accountBalance={balance} />
      {debitsView()}

      <form onSubmit={submissionDebit}>
        <input type="text" name="description" />
        <input type="number" step="any" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;