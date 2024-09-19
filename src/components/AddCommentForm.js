import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const addComment = async () => {
        axios.post(`/api/articles/${articleName}/comment`, { postedBy: name, text })
        .then(response => {
            setArticleInfo(response.data);
            setName('');
            setText('');
        })
    };

    return (
        <div id="add-comment-form">
            <h3>Add a comment</h3>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            </label>
            <label>
                Comment:
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Comment" />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm; 