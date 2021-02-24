import React from 'react';
import Todos from '@pages/Todos';
import Footer from '@pages/Footer';
import AddTodo from '@pages/AddTodo';

function App() {
    return (
        <div className="view">
            <AddTodo />
            <Todos />
            <Footer />
        </div>
    );
}

export default App;
