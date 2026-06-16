import { useState } from 'react'
import theDoLogo from './assets/images/logo.svg'
import './App.css'
import CreateListPopup from './components/CreateListPopup';
import type {List} from './types/List';


function App() {
  const[lists,setLists] = useState<List[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const handleCreateList = (newList: List) => {
    setLists((prev) => [...prev, newList]);
  };
  const handleUpdateList = (updatedList : List) => {
    setLists((prev) => prev.map((l) => (l.id === updatedList.id ? updatedList : l)))
  };
  const handleDeleteList = (id: number) => {
    setLists((prev) => prev.filter((l) => l.id !== id))
  };
  const closePopup = () => {
    setIsOpen(false);
    setSelectedList(null);
  }
  return (
    <>
     <header className='main-padding'>
      <a href="/"><img src={theDoLogo} alt="logo" /></a>
     </header>

     <main className='main main-padding'>
      {lists.length === 0 ? (
        <>
          <p className='no-list'>No lists yet. Create your first one.</p>
          <button className='btn primary-btn' onClick={() => setIsOpen(true)}><span>Create List</span></button>
          
        </>

      ):(
        <section className='lists'>
          {lists.map((list) => (
            <div key={list.id} className='list' onClick={() => setSelectedList(list)}><h3>{list.name}</h3>
            <button className='btn hyper-btn'><span>Preview List</span></button>
            </div>  
          ))}
          <button className='btn primary-btn new-list' onClick={() => setIsOpen(true)}><span>+ New List</span></button>

        </section>
      )}
      {(isOpen || selectedList) && (
        <CreateListPopup 
        onClose={closePopup}
        onCreate={handleCreateList}
        onUpdate={handleUpdateList}
        onDelete={handleDeleteList}
        existingList={selectedList}
        />
      )}


     </main>
    </>
  )
}

export default App
