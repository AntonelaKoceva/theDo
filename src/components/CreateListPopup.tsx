import { useState } from "react";
import type {List, Item} from '../types/List';


type Props = {
    onClose: () => void;
    onCreate: (list: List) => void;
    onUpdate? : (list: List) => void;
    onDelete?: (id: number) => void;
    existingList?: List | null;
};

function CreateListPopup({onClose, onCreate, onUpdate, onDelete, existingList}: Props){
    const [listName, setListName] = useState(existingList?.name || "");
    const [items, setItems] = useState<Item[]>(existingList?.items || []);
    const [newItem, setNewItem] = useState("");
    const handleAddItem = () => {
        if(!newItem.trim()) return;
        setItems((prev) => [
            ...prev,
            { text: newItem, done: false }
        ]);
        setNewItem("");
    }
    const toggleItem = (index: number) => {
        setItems((prev) => 
            prev.map((item,i) => 
                i === index ? {...item,done: !item.done} : item
            )
        );
    }
    const handleSave = () => {
        if(!listName.trim()) return;

        const list: List = {
            id: existingList? existingList.id: Date.now(),
            name: listName,
            items,
        };
        if(existingList && onUpdate){
            onUpdate(list);
        }else{ 
            onCreate(list);
        }
        onClose();
    }
    const handleDelete=() => {
        if(existingList && onDelete){
            onDelete(existingList.id);
            onClose();
        }
    };
    return(
        <div className="popup-overlay">
            <div className="popup">
                <h2>{existingList? "Edit List" : "Create New List"}</h2>
                <input type="text" placeholder="List name" value={listName} onChange={(e) => setListName(e.target.value)}/>
                <div className="items-preview">
                    {items.map((item, index) => (
                        <div key={index} className={item.done? "item done" : "item"} onClick={() => toggleItem(index)}>
                            <span className="status"></span>
                            <span className="text">{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className="items-input">
                    <input type="text" placeholder="Add item" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                    <button className="btn hyper-btn" onClick={handleAddItem}><span>Add</span></button>
                </div>
                <div className="actions">
                    <button className="btn primary-btn" onClick={handleSave}><span>{existingList ? "Update" : "Create"}</span></button>
                    {existingList && (<button onClick={handleDelete} className="btn danger-btn"><span>Delete</span></button>)}
                    <button onClick={onClose} className="btn secondary-btn"><span>Cancel</span></button>
                </div>
            </div>
        </div>
    )
}
export default CreateListPopup;