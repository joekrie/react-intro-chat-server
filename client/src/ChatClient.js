import React, {Component} from 'react';
import io from 'socket.io-client';
import qwest from 'qwest';

const baseUrl = 'http://localhost:8088';

class ChatClient extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            messages: []
        };
    }
    
    componentDidMount() {        
        this.socket = io.connect(baseUrl);
        
        this.socket.on('new-message', msg => {
            const newMessages = Object.create(this.state.messages);
            newMessages.push(msg);
            this.setState({messages: newMessages});
        });
        
        qwest.get(baseUrl + '/all-messages')
            .then((xhr, resp) => this.setState({messages: resp}));
    }
    
    render() {           
        const send = () => {
            if (this.messageInput.value) {
                const newMessage = {
                    timestamp: new Date(),
                    message: this.messageInput.value
                }
                        
                this.socket.emit('new-message', newMessage);
                this.messageInput.value = '';
            }
        };
        
        const messages = this.state.messages.map(
            msg => <li key={msg._id}>{msg.message}</li>);
                      
        return (
            <div>
                <ul>{messages}</ul>
                <div>
                    <input type='text' ref={ref => this.messageInput = ref} />
                    <button onClick={send}>Send</button>
                </div>
            </div>
        );
    }
}

export default ChatClient;