import { test } from '../api/Main';


export default function Dashboard() {

  const handleTest = () => {
    console.log('test');
    test();
  }


  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>Protected Route</p>
      <button onClick={handleTest}>TEST</button>
    </div>
  );
}