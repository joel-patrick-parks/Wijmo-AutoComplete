import './App.css';

import { useEffect, useState } from 'react';

import * as wjCore from '@grapecity/wijmo';
import * as wjcInput from '@grapecity/wijmo.react.input';

function App() {
  const [cv, setCollectionView] = useState(new wjCore.CollectionView([], {}));
  useEffect(() => {
    fetch('https://mocki.io/v1/c8e84317-feaa-40ea-89cf-2af1fb611d49').then(response => response.json()).then(data => cv.sourceCollection = data);
  });
  function customItemFormatter(index, content) {
    let country = 'N/A';
      for(var i = 0; i < cv.sourceCollection.length; i++) {
        if(content === cv.sourceCollection[i].state) {
          country = cv.sourceCollection[i].country;
        }
      }
    content = '<span class="primary">' + content + ' </span><span class="secondary">' + country + '</span>';
    return content;
  }
  return (
    <div className='App'>
      <wjcInput.AutoComplete itemsSource={cv} displayMemberPath="state" headerPath="state" isContentHtml={true} itemFormatter={customItemFormatter.bind(this)}></wjcInput.AutoComplete>
    </div>
  );
}

export default App;