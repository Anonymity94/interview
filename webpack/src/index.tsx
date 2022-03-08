import { render } from 'react-dom';
import styles from './index.less';
import data from './data.json';
import { sayHello } from './hello';

console.log(sayHello('Hello'));

function App() {
  return (
    <>
      <h1 className={styles.title}>Title</h1>
      <ul>
        {data.map((el: any) => (
          <li key={el.name}>{el.name}</li>
        ))}
      </ul>
    </>
  );
}
render(<App />, document.getElementById('root'));
