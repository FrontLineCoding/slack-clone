import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createNewMessage } from "../../store/messages";
import './Messages.css';

const CreateMessage = () => {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const [messageContent, setMessageContent] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (messageContent.replaceAll(" ", "").length == 0) {
            setErrors(["Channel name cannot be empty"]);
            return;
          }

        const newMessage = {
            content: messageContent,
        }
        await dispatch(createNewMessage(newMessage, channelId)).then((res) => {
            if(res?.error) {
                let errors = [res?.errors];
                setErrors(errors);
                return;
            }else {
                setMessageContent("");
                setErrors([]);
            }
        })
    }

    return (
        <div className="create-messages-div">
            <form className="create-message-form" onSubmit={handleSubmit}>
                <input
                className="message-content"
                type="text"
                value={messageContent}
                onChange={(e) => {setMessageContent(e.target.value)}}
                placeholder="Type Away"
                required
                />
                <button className="create-message-button hide" type="submit">
                </button>
            </form>
        </div>
    )
}

export default CreateMessage;
